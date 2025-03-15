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
        $query = $this->model->where('user_id', $userId);
    
        if (!empty($filters)) {
            if (isset($filters['status'])) {
                $query->where('status', $filters['status']);
            }
    
        }
    
        return $query->get();
    }
}
