<?php

namespace App\Services;

use App\Interfaces\TaskRepositoryInterface;
use App\Helpers\ResponseFormatter;

class TaskService
{
    protected $taskRepository;
    protected $responseFormatter;

    public function __construct(TaskRepositoryInterface $taskRepository, ResponseFormatter $responseFormatter)
    {
        $this->taskRepository = $taskRepository;
        $this->responseFormatter = $responseFormatter;
    }

    public function create(array $data, int $userId)
    {
        $data['user_id'] = $userId;
        $task = $this->taskRepository->create($data);
        
        return $this->responseFormatter->format('success', 'Tarefa criada com sucesso', $task);
    }

    public function update(int $id, array $data)
    {
        $task = $this->taskRepository->show($id);

        $updatedTask = $this->taskRepository->update($id, $data);
        
        return $this->responseFormatter->format('success', 'Tarefa atualizada com sucesso', $updatedTask);
    }

    public function delete(int $id)
    {
        $task = $this->taskRepository->show($id);

        $this->taskRepository->delete($id);

        return $this->responseFormatter->format('success', 'Tarefa deletada com sucesso');
    }

    public function restore(int $id)
    {
        $task = $this->taskRepository->show($id);
        $restoredTask = $this->taskRepository->restore($id);

        return $this->responseFormatter->format('success', 'Tarefa restaurada com sucesso', $restoredTask);
    }

    public function getById(int $id)
    {
        $task = $this->taskRepository->show($id);

        return $this->responseFormatter->format('success', 'Tarefa recuperada com sucesso', $task);
    }

    public function getAll(array $data)
    {
        $perPage = $data['perPage'] ?? null;
        $page = $data['page'] ?? null;
        $filters = $data['filters'] ?? [];
        $sort = $data['sort'] ?? [];

        $tasks = $this->taskRepository->all($filters, $sort, $perPage, $page);

        return $this->responseFormatter->format('success', 'Tarefas recuperadas com sucesso', $tasks);
    }

    public function getTasksByUser(array $data, int $userId)
    {
        $perPage = $data['perPage'] ?? null;
        $page = $data['page'] ?? null;
        $filters = $data['filters'] ?? [];
        $sort = $data['sort'] ?? [];

        $tasks = $this->taskRepository->getTasksByUserId($filters, $sort, $perPage, $page, $userId);

        return $this->responseFormatter->format('success', 'Tarefas recuperadas com sucesso', $tasks);
    }
}
