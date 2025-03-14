<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\BaseRepositoryInterface;
use App\Repositories\BaseRepository;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\Services\UserService;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\UserController;
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

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(
                $app->make(UserService::class), 
                $app->make(StatusCodeMatcher::class)
            );
        });

        $this->app->bind(UserService::class, function ($app) {
            return new UserService(
                $app->make(UserRepositoryInterface::class), 
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
