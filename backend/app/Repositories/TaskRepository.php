<?php

namespace App\Repositories;

use App\Models\Task;
use App\Interfaces\TaskRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskRepository extends BaseRepository implements TaskRepositoryInterface
{
    public function __construct(Task $task)
    {
        parent::__construct($task);
    }

    public function getTasksByUserId(array $filters = [], array $sort = [], ?int $perPage = 15, ?int $page = 1): LengthAwarePaginator
    {
        return $this->model->filter($filters)->sort($sort)->paginate($perPage, ['*'], 'page', $page);
    }
}
