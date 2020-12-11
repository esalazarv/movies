<?php

namespace App\Exceptions;



use App\Filters\QueryFilters;

class InvalidQueryRelationHandlerException extends \Exception
{
    public function setInfo(QueryFilters $instance, string $handler)
    {
        $class = get_class($instance);
        $this->message = "Handler '{$handler}' is not defined in {$class}";
        return $this;
    }
}
