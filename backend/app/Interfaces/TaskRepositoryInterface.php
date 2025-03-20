<?php

namespace App\Interfaces;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface TaskRepositoryInterface extends BaseRepositoryInterface
{
    public function getTasksByUserId(array $filters = [], array $sort = [], ?int $perPage = 15, ?int $page = 1): LengthAwarePaginator;
}
