<?php


namespace App\Repositories;


use App\Models\Movie;
use App\Models\Schedule;
use Carbon\Carbon;

class ScheduleRepository extends Repository
{
    public function getModel()
    {
        return new Schedule;
    }

    public function attachToMovie(Movie $movie, array $data)
    {
        $movie_id = $movie->id;
        $duration = Carbon::createFromFormat('H:i:s', $movie->duration);
        $start_at = Carbon::createFromFormat('Y-m-d H:i:s', $data['start_at']);
        $finish_at = $start_at->clone()->addHours($duration->hour)->addMinutes($duration->minute)->addSeconds($duration->second);
        return parent::create(array_merge($data, compact('movie_id', 'start_at', 'finish_at')));
    }

    public function finByMovieId(int $movieId, int $scheduleId)
    {
        return $this->getModel()->where('movie_id', $movieId)->where('id', $scheduleId)->first();
    }
}
