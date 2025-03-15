<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\StatusCodeMatcher; 

class UserController extends Controller
{
    protected $userService;
    protected $statusCodeMatcher;

    public function __construct(UserService $userService, StatusCodeMatcher $statusCodeMatcher)
    {
        $this->userService = $userService;
        $this->statusCodeMatcher = $statusCodeMatcher;  
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $response = $this->userService->getAll($request->all());
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);  
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error fetching users: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao listar os usuários. Por favor, tente novamente.'
            ], 500);
        }
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        try {
            $response = $this->userService->create($request->validated());
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error creating user: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar usuário. Por favor, tente novamente.'
            ], 500);
        }
    }

    public function show(User $user): JsonResponse
    {
        try {
            $response = $this->userService->getById($user->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error fetching user with ID {$user->id}: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar usuário. Por favor, tente novamente.'
            ], 500);
        }
    }

    public function update(User $user, UpdateUserRequest $request): JsonResponse
    {
        try {
            $response = $this->userService->update($user->id, $request->validated());
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error updating user with ID {$user->id}: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar usuário. Por favor, tente novamente.'
            ], 500);
        }
    }

    public function destroy(User $user): JsonResponse
    {
        try {
            $response = $this->userService->delete($user->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error deleting user with ID {$user->id}: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao excluir usuário. Por favor, tente novamente.'
            ], 500);
        }
    }

    public function restore(User $user): JsonResponse
    {
        try {
            $response = $this->userService->restore($user->id);
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error restoring user with ID {$user->id}: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao restaurar usuário. Por favor, tente novamente.'
            ], 500);
        }
    }
}
