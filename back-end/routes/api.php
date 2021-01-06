<?php

use App\Http\Controllers\Account\UserController;
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

Route::middleware('auth:api')->get('/users', function (Request $request) {
    return $request->user();
});
Route::get('users',[UserController::class,'index']);
Route::post('login',[UserController::class,'authenticate']);
Route::post('register',[UserController::class,'register']);


