<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Task;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    public function manage(User $user, Task $task)
    {
        return $user->id === $task->user_id; 
    }

    public function viewAny(User $user, User $userFromParam)
    {
        return $user->id === $userFromParam->id;
    }

    public function view(User $user, Task $task)
    {
        return $user->id === auth()->id() && $user->id === $task->user_id;
    }

    public function create(User $user)
    {
        return $user->id === auth()->id();
    }

    public function update(User $user, Task $task)
    {
        return $user->id === auth()->id() && $user->id === $task->user_id;
    }

    public function delete(User $user, Task $task)
    {
        return $user->id === auth()->id() && $user->id === $task->user_id;
    }

    public function restore(User $user, Task $task)
    {
        return $user->id === auth()->id() && $user->id === $task->user_id;
    }
}
