<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\BaseRepositoryInterface;
use App\Repositories\BaseRepository;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\Interfaces\TaskRepositoryInterface;
use App\Repositories\TaskRepository;
use App\Services\UserService;
use App\Services\AuthService;  
use App\Services\TaskService;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController; 
use App\Http\Controllers\AuthController;  
use App\Helpers\StatusCodeMatcher;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(BaseRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(
                $app->make(UserService::class), 
                $app->make(StatusCodeMatcher::class)
            );
        });

        $this->app->bind(TaskController::class, function ($app) {  
            return new TaskController(
                $app->make(TaskService::class), 
                $app->make(StatusCodeMatcher::class)
            );
        });

        $this->app->bind(AuthController::class, function ($app) {
            return new AuthController(
                $app->make(AuthService::class),
                $app->make(StatusCodeMatcher::class) 
            );
        });

        $this->app->bind(UserService::class, function ($app) {
            return new UserService(
                $app->make(UserRepositoryInterface::class), 
                $app->make(ResponseFormatter::class)
            );
        });

        $this->app->bind(TaskService::class, function ($app) {  
            return new TaskService(
                $app->make(TaskRepositoryInterface::class), 
                $app->make(ResponseFormatter::class)
            );
        });

        $this->app->bind(AuthService::class, function ($app) {
            return new AuthService(
                $app->make(ResponseFormatter::class)
            );
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
