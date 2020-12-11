<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class ScheduleFilters extends QueryFilters
{
    public function movieIdFilter(Builder $builder, $value)
    {
        return $builder->where('movie_id', $value);
    }
}
