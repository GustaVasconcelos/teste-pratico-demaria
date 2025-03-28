<?php

namespace App\Services;

use App\Interfaces\UserRepositoryInterface;
use App\Helpers\ResponseFormatter;

class UserService
{
    protected $userRepository;
    protected $responseFormatter;

    public function __construct(UserRepositoryInterface $userRepository, ResponseFormatter $responseFormatter)
    {
        $this->userRepository = $userRepository;
        $this->responseFormatter = $responseFormatter;
    }

    public function create(array $data)
    {
        $user = $this->userRepository->create($data);
        
        return $this->responseFormatter->format('success', 'Usuário criado com sucesso', $user);
    }

    public function update(int $id, array $data)
    {
        $user = $this->userRepository->show($id);

        if (!$user) {
            return $this->responseFormatter->format('not found', 'Usuário não encontrado', null);
        }

        $updatedUser = $this->userRepository->update($id, $data);
        
        return $this->responseFormatter->format('success', 'Usuário atualizado com sucesso', $updatedUser);
    }

    public function delete(int $id)
    {
        $user = $this->userRepository->show($id);

        if (!$user) {
            return $this->responseFormatter->format('not found', 'Usuário não encontrado', null);
        }

        $this->userRepository->delete($id);

        return $this->responseFormatter->format('success', 'Usuário deletado com sucesso');
    }

    public function restore(int $id)
    {
        $user = $this->userRepository->restore($id);

        if (!$user) {
            return $this->responseFormatter->format('not found', 'Usuário não encontrado ou não pode ser restaurado', null);
        }

        return $this->responseFormatter->format('success', 'Usuário restaurado com sucesso', $user);
    }

    public function getById(int $id)
    {
        $user = $this->userRepository->show($id);

        if (!$user) {
            return $this->responseFormatter->format('not found', 'Usuário não encontrado', null);
        }

        return $this->responseFormatter->format('success', 'Usuário recuperado com sucesso', $user);
    }

    public function getAll(array $data)
    {
        $perPage = $data['perPage'] ?? null;
        $page = $data['page'] ?? null;
        $filters = $data['filters'] ?? [];
        $sort = $data['sort'] ?? [];

        $users = $this->userRepository->all($filters, $sort, $perPage, $page);

        return $this->responseFormatter->format('success', 'Usuários recuperados com sucesso', $users);
    }
}
