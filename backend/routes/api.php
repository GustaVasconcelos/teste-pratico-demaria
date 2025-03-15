<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('jwt.auth');
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('jwt.auth');
    Route::get('me', [AuthController::class, 'me'])->middleware('jwt.auth');
});

Route::post('users', [UserController::class, 'store']);

Route::middleware('auth:api')->prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user}', [UserController::class, 'show'])->middleware('can:view,user');
    Route::put('/{user}', [UserController::class, 'update'])->middleware('can:update,user');
    Route::delete('/{user}', [UserController::class, 'destroy'])->middleware('can:delete,user');
    Route::post('/{user}/restore', [UserController::class, 'restore'])->middleware('can:restore,user');

    Route::prefix('/{user}/tasks')->group(function () {
        Route::get('/', [TaskController::class, 'getTasksByUser'])->middleware('can:view-tasks-by-user,user');
        Route::get('/{task}', [TaskController::class, 'show'])->middleware('can:manage-task,task,user');
        Route::post('/', [TaskController::class, 'store'])->middleware('can:create-task,task,user');
        Route::put('/{task}', [TaskController::class, 'update'])->middleware('can:update-task,task,user');
        Route::delete('/{task}', [TaskController::class, 'destroy'])->middleware('can:delete-task,task,user');
        Route::post('/{task}/restore', [TaskController::class, 'restore'])->middleware('can:restore-task,task,user'); 
    });
});

