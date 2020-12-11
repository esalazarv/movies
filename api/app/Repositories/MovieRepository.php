<?php


namespace App\Repositories;


use App\Models\Movie;

class MovieRepository extends Repository
{
    public function getModel()
    {
        return new Movie;
    }
}
