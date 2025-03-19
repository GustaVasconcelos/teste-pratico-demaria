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

        if (isset($filters['deleted_at']) && $filters['deleted_at'] === 'not_null') {
            $query->withTrashed(); 
            $query->whereNotNull('deleted_at'); 
        } else {
            $query->withoutTrashed();
        }

        foreach ($filters as $key => $value) {
            if ($key !== 'deleted_at') { 
                $query->where($key, $value);
            }
        }

        return $query->get();
    }
}
