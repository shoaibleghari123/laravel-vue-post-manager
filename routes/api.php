<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum', 'check.permissions'])->group(function () {

Route::apiResource('/posts', PostController::class);
Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('abilities', function (Request $request) {
    return $request->user()->roles()->with('permissions')
        ->get()
        ->pluck('permissions')
        ->flatten()
        ->pluck('name')
        ->unique()
        ->values()
        ->toArray();
    });
});
