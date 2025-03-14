<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface BaseRepositoryInterface
{
    public function all(array $filters = [], array $sort = [], int $perPage = 15, int $page = 1): LengthAwarePaginator;

    public function create(array $data): Model;

    public function createMany(int $id, string $relationship, array $data): Collection;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;

    public function show(int $id): ?Model;
}
