<?php

namespace App\Http\Filters;


use App\Contracts\QueryableContract;
use App\Exceptions\InvalidQueryRelationException;
use App\Exceptions\InvalidQueryRelationHandlerException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

abstract class QueryFilters implements QueryableContract
{
    const PAGE_SIZE = 15;
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var Collection
     */
    protected $filters;

    /**
     * @var array
     */
    protected $relationHandlers = [];

    public function __construct(Request $request = null)
    {
        if ($request) {
            $this->request = $request;
            $this->set($request->all());
        } else {
            $this->set([]);
        }
    }

    public function set(array $filters) {
        $this->filters = collect($filters);
    }

    public function all()
    {
        return $this->filters->all();
    }

    public function get(string $key)
    {
        return $this->filters->get($key);
    }

    public function put(string $key, $value) {
        $this->filters->put($key, $value);
    }

    public function remove(string $key) {
        $this->filters->forget($key);
    }

    public function applyFilters(Builder $builder): Builder
    {
        $filters = $this->all();
        array_walk($filters, function($value, $name) use(&$builder) {
            $method = Str::camel("{$name}_filter");
            if (method_exists($this, $method)) {
                call_user_func_array([$this, $method], [$builder, $value]);
            }
        });
        $this->includeRelations($this->get('$include'), $builder);
        return $builder;
    }

    /**
     * @param string|string[] $relations
     * @param Model|Builder $target
     * @return Model|Builder
     */
    protected function includeRelations($relations, &$target)
    {
        $requestedRelations = is_array($relations) ? $relations : explode(',', trim($relations, ','));
        $filtered = array_filter($requestedRelations); //remove empty strings
        foreach ($filtered as $signature) {
            $split = explode(':', trim($signature),2);
            $relation = trim($split[0]);
            $params = [];
            if (isset($split[1])) {
                parse_str($split[1], $params);
            }

            if (!array_key_exists($relation, $this->relationHandlers)) {
                throw (new InvalidQueryRelationException())->setRelation($relation);
            }

            $handlerName = $this->relationHandlers[$relation];
            $handlerExists = method_exists($this, $handlerName);

            if (!is_null($handlerName) && !$handlerExists) {
                throw (new InvalidQueryRelationHandlerException())->setInfo($this, $handlerName);
            }

            if ($handlerExists) {
                $callback = function ($builder) use ($handlerName, $target, $params) {
                    return call_user_func_array([$this, $handlerName], [$builder, collect($params)]);
                };
                $relation = [$relation => $callback];
            }

            if ($target instanceof Builder) {
                $target->with($relation);
            } else {
                $target->load($relation);
            }
        }
        return $target;
    }

    public function applyIncludes(Model &$model): Model
    {
        $this->includeRelations($this->get('$include'), $model);
        return $model;
    }

    public function pageSize() {
        return (int) $this->filters->get('per_page', self::PAGE_SIZE);
    }
}
