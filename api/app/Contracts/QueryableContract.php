<?php

namespace App\Contracts;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

interface QueryableContract
{
    public function set(array $filters);

    public function all();

    public function get(string $key);

    public function put(string $key, $value);

    public function remove(string $key);

    public function applyFilters(Builder $builder): Builder;

    public function applyIncludes(Model &$model): Model;

    public function pageSize();
}
