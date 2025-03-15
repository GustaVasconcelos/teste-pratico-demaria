<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use App\Helpers\StatusCodeMatcher;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    protected $authService;
    protected $statusCodeMatcher;

    public function __construct(AuthService $authService, StatusCodeMatcher $statusCodeMatcher)
    {
        $this->authService = $authService;
        $this->statusCodeMatcher = $statusCodeMatcher;
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $response = $this->authService->login($request->validated());
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error during login: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer login. Verifique suas credenciais.'
            ], 500);
        }
    }

    public function logout(): JsonResponse
    {
        try {
            $response = $this->authService->logout();
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error during logout: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer logout. Tente novamente.'
            ], 500);
        }
    }

    public function refresh(): JsonResponse
    {
        try {
            $response = $this->authService->refresh();
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error refreshing token: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar o token. Tente novamente.'
            ], 500);
        }
    }

    public function me(): JsonResponse
    {
        try {
            $response = $this->authService->me();
            $statusCode = $this->statusCodeMatcher->getStatusCode($response['status']);
            
            return response()->json($response, $statusCode);
        } catch (\Exception $e) {
            Log::error("Error fetching user data: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao recuperar dados do usuário.'
            ], 500);
        }
    }
}
