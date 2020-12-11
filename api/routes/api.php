<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\ApiController;
use \App\Http\Controllers\MovieController;
use \App\Http\Controllers\ScheduleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', [ApiController::class, 'redirect']);
Route::group(['prefix' =>'v1'], function () {
    Route::get('/', [ApiController::class, 'index'])->name('api:info');

    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::group(['middleware' => 'auth:sanctum'], function () {
        // Get Auth user data
        Route::get('me', [AuthController::class, 'me'])->name('login');

        // Movie CRUD routes
        Route::apiResource('movies', MovieController::class);

        // Schedule CRUD routes
        Route::apiResource('schedules', ScheduleController::class);
    });
});
