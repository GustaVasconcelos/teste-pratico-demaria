<?php

namespace App\Interfaces;

interface TaskRepositoryInterface extends BaseRepositoryInterface
{
    public function getTasksByUserId(array $data, int $userId);
}
