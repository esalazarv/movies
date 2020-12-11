<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class MovieFilters extends QueryFilters
{
    public function nameFilter(Builder $builder, $value)
    {
        return $builder->where('name', 'like', "%{$value}%");
    }

    public function publishDateFilter(Builder $builder, $value)
    {
        return $builder->where('publish_date', 'like', "%{$value}%");
    }
}
