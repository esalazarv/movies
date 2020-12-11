<?php

namespace App\Repositories;

use App\Contracts\QueryableContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

abstract class Repository
{
    protected $model;

    /**
     * @return Model
     */
    abstract public function getModel();


    public function filter(QueryableContract $filters): Builder
    {
        return $this->getModel()->filter($filters);
    }

    /**
     * @param QueryableContract $filters
     * @return LengthAwarePaginator | Collection
     */
    public function search(QueryableContract $filters)
    {
        return $this->filter($filters)->paginate($filters->pageSize());
    }

    /**
     * @param QueryableContract $filters
     * @return Collection
     */
    public function all(QueryableContract $filters): Collection
    {
        return $this->filter($filters)->get();
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return $this->getModel()->create($data);
    }

    /**
     * @param $id
     * @return boolean
     */
    public function exists($id)
    {
        return $this->getModel()->where('id', $id)->exists();
    }

    /**
     * @param $id
     * @param bool $withTrashed
     * @return mixed
     */
    public function find($id, $withTrashed = false)
    {
        $query = $this->getModel();
        if ($withTrashed) {
            $query->withTrashed();
        }
        return $query->find($id);
    }

    /**
     * @param $id
     * @param bool $withTrashed
     * @return mixed
     * @throws ModelNotFoundException
     */
    public function findOrFail($id, $withTrashed = false)
    {
        $query = $this->getModel();
        if ($withTrashed) {
            $query->withTrashed();
        }
        return $query->findOrFail($id);
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function update($id, $data)
    {
        $entity = $this->find($id);
        if ($entity) {
            $entity->update($data);
        }
        return $entity;
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     * @throws ModelNotFoundException
     */
    public function updateOrFail($id, $data)
    {
        $entity = $this->findOrFail($id);
        $entity->update($data);
        return $entity;
    }

    /**
     * Update record of create if not exists
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateOrCreate($id, $data)
    {
        $entity = $this->find($id);
        $collectedData = collect($data);
        if ($entity) {
            $idFieldName = $entity->getKeyName();
            $entity->update($collectedData->except([$idFieldName])->toArray());
            return $entity;
        }
        return $this->create($collectedData->toArray());
    }

    /**
     * @param $id
     * @return bool|null
     */
    public function delete($id)
    {
        $model = $this->find($id);
        return $model ? $model->delete() : null;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function forceDelete($id)
    {
        $model = $this->find($id, true);
        return $model ? $model->forceDelete() : null;
    }

    /**
     * @param $id
     * @return bool
     * @throws ModelNotFoundException
     * @throws \Exception
     */
    public function deleteOrFail($id): bool
    {
        return $this->findOrFail($id)->delete();
    }

    /**
     * @param $id
     * @return bool
     */
    public function restore($id): bool
    {
        $model = $this->find($id, true);
        if ($model->trashed()) {
            return $model->restore();
        }
        return false;
    }

    /**
     * @param $id
     * @return bool
     * @throws ModelNotFoundException
     */
    public function restoreOrFail($id): bool
    {
        $model = $this->findOrFail($id, true);

        if ($model->trashed()) {
            return $model->restore();
        }

        return false;
    }
}
