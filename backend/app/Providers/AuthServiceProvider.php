<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Task;
use App\Policies\UserPolicy;
use App\Policies\TaskPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Task::class => TaskPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Gate::define('manage-task', [TaskPolicy::class, 'manage']);
        Gate::define('view-tasks-by-user', [TaskPolicy::class, 'viewAny']);
        Gate::define('view-task', [TaskPolicy::class, 'view']);
        Gate::define('create-task', [TaskPolicy::class, 'create']);
        Gate::define('update-task', [TaskPolicy::class, 'update']);
        Gate::define('delete-task', [TaskPolicy::class, 'delete']);
        Gate::define('restore-task', [TaskPolicy::class, 'restore']);
    }
}
