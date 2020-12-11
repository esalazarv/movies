<?php

namespace App\Contracts;


use Illuminate\Database\Eloquent\Builder;

interface FilterableContract
{
    public function scopeFilter(Builder $query, QueryableContract $filters): Builder;
}
