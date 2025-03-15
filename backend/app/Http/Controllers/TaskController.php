<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Helpers\StatusCodeMatcher;
use App\Models\User;

class TaskController extends Controller
{
    protected $taskService;
    protected $statusCodeMatcher;

    public function __construct(TaskService $taskService, StatusCodeMatcher $statusCodeMatcher)
    {
        $this->taskService = $taskService;
        $this->statusCodeMatcher = $statusCodeMatcher;
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $response = $this->taskService->getAll($request->all());
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error fetching tasks: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao listar as tarefas.'], 500);
        }
    }

    public function store(CreateTaskRequest $request, User $user): JsonResponse
    {
        try {
            $response = $this->taskService->create($request->validated(), $user->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error creating task: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao criar tarefa.'], 500);
        }
    }

    public function show(User $user, Task $task): JsonResponse
    {
        try {
            $response = $this->taskService->getById($task->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error fetching task: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao buscar tarefa.'], 500);
        }
    }

    public function update(User $user, Task $task, UpdateTaskRequest $request): JsonResponse
    {
        try {
            $response = $this->taskService->update($task->id, $request->validated(), $user);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error updating task: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao atualizar tarefa.'], 500);
        }
    }

    public function destroy(User $user, Task $task): JsonResponse
    {
        try {
            $response = $this->taskService->delete($task->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error deleting task: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao excluir tarefa.'], 500);
        }
    }

    public function restore(User $user, Task $task): JsonResponse
    {
        try {
            $response = $this->taskService->restore($task->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error restoring task: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao restaurar tarefa.'], 500);
        }
    }

    public function getTasksByUser(User $user, Request $request): JsonResponse
    {
        try {
            $response = $this->taskService->getTasksByUser($request->all(), $user->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error fetching user tasks: {$e->getMessage()}");
            return response()->json(['status' => 'error', 'message' => 'Erro ao buscar tarefas.'], 500);
        }
    }
}
