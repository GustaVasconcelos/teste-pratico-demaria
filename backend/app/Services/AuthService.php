<?php

namespace App\Services;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Helpers\ResponseFormatter;

class AuthService
{
    protected $responseFormatter;

    public function __construct(ResponseFormatter $responseFormatter) {
        $this->responseFormatter = $responseFormatter;
    }

    public function login(array $credentials): array
    {
        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->responseFormatter->format(
                'bad request',
                'Usuário ou senha inválidos.'
            );
        }

        return $this->responseFormatter->format(
            'success',
            'Login bem sucedido',
            $token
        );
    }

    public function logout(): array
    {
        if (!JWTAuth::invalidate(JWTAuth::getToken())) {
            return $this->responseFormatter->format(
                'error',
                'Error ao realizar logout.'
            );
        }

        return $this->responseFormatter->format(
            'success',
            'Logout bem sucedido',
        );
    }

    public function refresh(): array
    {
        if (!$refreshedToken = JWTAuth::refresh(JWTAuth::getToken())) {
            return $this->responseFormatter->format(
                'error',
                'Token não pode ser atualizado.'
            );
        }

        return $this->responseFormatter->format(
            'success',
            'Token atualizado com sucesso.',
            $refreshedToken
        );
    }

    public function me(): array
    {
        if (!$user = JWTAuth::user()) {
            return $this->responseFormatter->format(
                'error',
                'Usuário não encontrado.'
            );
        }

        return $this->responseFormatter->format(
            'success',
            'Usuário encontrado com sucesso.',
            $user
        );
    }
}