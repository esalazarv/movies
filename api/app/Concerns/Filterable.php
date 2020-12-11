<?php

namespace App\Concerns;

use App\Contracts\QueryableContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait Filterable
{
    public function scopeFilter(Builder $query, QueryableContract $filters): Builder
    {
        return $filters->applyFilters($query);
    }

    public function applyIncludes(QueryableContract $filters): Model
    {
        return $filters->applyIncludes($this);
    }
}
