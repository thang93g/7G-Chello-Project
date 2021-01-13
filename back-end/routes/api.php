<?php

use App\Http\Controllers\Account\UserController;
use App\Http\Controllers\Account\ChangePassword;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TaskController;
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


Route::get('columns/{board_id}',[ColumnController::class,'index']);
Route::get('columns/show/{id}',[ColumnController::class,'show']);
Route::post('columns/create',[ColumnController::class,'create']);
Route::put('columns/update/{id}',[ColumnController::class,'update']);
Route::get('columns/swap/{id}/{index}',[ColumnController::class,'swap']);
Route::post('columns/comment', [CommentController::class,'commentOnTask']);


Route::get('tasks',[TaskController::class,'index']);
Route::post('tasks/create',[TaskController::class,'create']);
Route::put('tasks/update/{id}',[TaskController::class,'update']);
Route::delete('tasks/{id}',[TaskController::class,'delete']);
Route::get('tasks/swap/{id}/{orders}',[TaskController::class,'swap']);
Route::get('tasks/drop/{id}/{column_id}',[TaskController::class,'drop']);

Route::get('boards',[BoardController::class,'index']);
Route::delete('boards/{id}',[BoardController::class,'destroy']);
Route::post('boards/{id}',[BoardController::class,'create']);
Route::get('boards/detail/{id}',[BoardController::class,'getBoardById']);

Route::get('users',[UserController::class,'index']);
Route::post('login',[UserController::class,'authenticate']);
Route::post('register',[UserController::class,'register']);


Route::put('/users/{id}',[UserController::class,'update']);
Route::get('/users/{id}',[UserController::class,'show']);
Route::put('changePassword/{id}', [ChangePassword::class,'changePassword']);

Route::get('/groups/{id}',[GroupController::class,'index']);
Route::get('/groups/detail/{id}',[GroupController::class,'show']);
Route::get('/groups/member/{id}',[GroupController::class,'getUser']);
Route::delete('/groups/member/{id}/{user_id}',[GroupController::class,'deleteUser']);
Route::post('/groups/{id}',[GroupController::class,'addUser']);
Route::put('/groups/{id}',[GroupController::class,'update']);
Route::delete('/groups/{id}',[GroupController::class,'destroy']);
Route::post('/groups',[GroupController::class,'store']);


