<?php

namespace App\Http\Controllers;

use App\Http\Filters\ScheduleFilters;
use App\Http\Requests\CreateScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use App\Repositories\MovieRepository;
use App\Repositories\ScheduleRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    /**
     * @var MovieRepository
     */
    protected $movieRepository;

    /**
     * @var ScheduleRepository
     */
    protected $scheduleRepository;

    public function __construct(MovieRepository $movieRepository, ScheduleRepository $scheduleRepository)
    {
        $this->movieRepository = $movieRepository;
        $this->scheduleRepository = $scheduleRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param ScheduleFilters $filters
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(ScheduleFilters $filters)
    {
        return ScheduleResource::collection($this->scheduleRepository->search($filters));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateScheduleRequest $request
     * @param int $movieId
     * @return ScheduleResource|\Illuminate\Http\JsonResponse
     */
    public function store(CreateScheduleRequest $request)
    {
        try {
            DB::beginTransaction();
            $movie = $this->movieRepository->findOrFail($request->get('movie_id'));
            $schedule = $this->scheduleRepository->attachToMovie($movie, $request->all());
            DB::commit();
            return new ScheduleResource($schedule);
        } catch (Throwable $exception) {
            DB::rollBack();
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return ScheduleResource
     */
    public function show(int $id)
    {
        $schedule = $this->scheduleRepository->find($id);
        return new ScheduleResource($schedule);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateScheduleRequest $request
     * @param int $id
     * @return ScheduleResource|\Illuminate\Http\JsonResponse
     */
    public function update(UpdateScheduleRequest $request, int $id)
    {
        try {
            DB::beginTransaction();
            $schedule = $this->scheduleRepository->update($id, $request->all());
            DB::commit();
            return new ScheduleResource($schedule);
        } catch (\Throwable $exception) {
            DB::rollBack();
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function destroy(int $id)
    {
        try {
            DB::beginTransaction();
            $this->scheduleRepository->delete($id);
            DB::commit();
            return response()->noContent();
        } catch (\Throwable $exception) {
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
