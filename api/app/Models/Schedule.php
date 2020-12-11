<?php

namespace App\Models;

use App\Concerns\Filterable;
use App\Contracts\FilterableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model implements FilterableContract
{
    use Filterable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'movie_id',
        'active',
        'start_at',
        'finish_at',
    ];

    /**
     * The attributes that must be casted to date
     *
     * @var string[]
     */
    protected $dates = [
        'start_at',
        'finish_at',
    ];

    /**
     * The type of specific attributes
     *
     * @var mixed[]
     */
    protected $casts = [
        'active' => 'boolean',
    ];
}
