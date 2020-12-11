<?php

namespace App\Exceptions;


class InvalidQueryRelationException extends \Exception
{
    public function setRelation(string $relation) {
        $this->message = "Requested '{$relation}' relationship is not available";
        return $this;
    }
}
