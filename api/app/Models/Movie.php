<?php

namespace App\Models;

use App\Concerns\Filterable;
use App\Contracts\FilterableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model implements FilterableContract
{
    use Filterable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'publish_date',
    ];

    /**
     * The attributes that must be casted to date
     *
     * @var string[]
     */
    protected $dates = [
        'publish_date'
    ];
}
