<?php

namespace App\Repositories;

use App\Models\Task;
use App\Interfaces\TaskRepositoryInterface;

class TaskRepository extends BaseRepository implements TaskRepositoryInterface
{
    public function __construct(Task $task)
    {
        parent::__construct($task);
    }

    public function getTasksByUserId(array $filters, int $userId)
    {
        $page = $filters['page'] ?? 1; 
        $perPage = $filters['perPage'] ?? 10; 

        $query = $this->model->where('user_id', $userId);

        if (isset($filters['deleted_at']) && $filters['deleted_at'] === 'not_null') {
            $query->withTrashed(); 
            $query->whereNotNull('deleted_at'); 
        } else {
            $query->withoutTrashed();
        }

        foreach ($filters as $key => $value) {
            if ($key !== 'deleted_at' && $key !== 'page' && $key !== 'perPage') { 
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

}
