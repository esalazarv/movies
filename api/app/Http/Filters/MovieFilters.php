<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class MovieFilters extends QueryFilters
{
    public function queryFilter(Builder $builder, $value)
    {
        return $builder->where(function ($query) use ($value) {
            $query->orWhere(function ($query) use ($value) {
                $this->nameFilter($query, $value);
            });
        });
    }

    public function nameFilter(Builder $builder, $value)
    {
        return $builder->where('name', 'like', "%{$value}%");
    }

    public function publishDateFilter(Builder $builder, $value)
    {
        return $builder->where('publish_date', 'like', "%{$value}%");
    }
}
