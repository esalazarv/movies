<?php

namespace App\Http\Controllers;

use App\Http\Filters\MovieFilters;
use App\Http\Requests\CreateMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\MovieResource;
use App\Repositories\MovieRepository;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{

    /**
     * @var MovieRepository
     */
    protected $movieRepository;

    public function __construct(MovieRepository $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param MovieFilters $filters
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(MovieFilters $filters)
    {
        return MovieResource::collection($this->movieRepository->search($filters));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateMovieRequest $request
     * @return MovieResource|\Illuminate\Http\JsonResponse
     */
    public function store(CreateMovieRequest $request)
    {
        try {
            DB::beginTransaction();
            $movie = $this->movieRepository->create($request->all());
            DB::commit();
            return new MovieResource($movie);
        } catch (\Throwable $exception) {
            DB::rollBack();
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return MovieResource
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function show(int $id)
    {
        $movie = $this->movieRepository->findOrFail($id);
        return new MovieResource($movie);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateMovieRequest $request
     * @param int $id
     * @return MovieResource|\Illuminate\Http\JsonResponse
     */
    public function update(UpdateMovieRequest $request, int $id)
    {
        try {
            DB::beginTransaction();
            $movie = $this->movieRepository->update($id, $request->all());
            DB::commit();
            return new MovieResource($movie);
        } catch (\Throwable $exception) {
            DB::rollBack();
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $this->movieRepository->delete($id);
            DB::commit();
            return response()->noContent();
        } catch (\Throwable $exception) {
            DB::rollBack();
            return response()->json(['message' => $exception->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
