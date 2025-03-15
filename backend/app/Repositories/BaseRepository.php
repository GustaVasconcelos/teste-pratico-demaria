<?php

namespace App\Repositories;

use App\Interfaces\BaseRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all(array $filters = [], array $sort = [], ?int $perPage = 15, ?int $page = 1): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        foreach ($filters as $key => $value) {
            if (is_array($value)) {
                $query->whereIn($key, $value);
            } else {
                $query->where($key, $value);
            }
        }

        foreach ($sort as $sortField) {
            list($field, $direction) = explode(':', $sortField);
            $query->orderBy($field, $direction);
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    public function createMany(int $id, string $relationship, array $data): Collection
    {
        $parentModel = $this->model->findOrFail($id);
        return $parentModel->$relationship()->createMany($data);
    }

    public function update(int $id, array $data): bool
    {
        $model = $this->model->findOrFail($id);
        return $model->update($data);
    }

    public function delete(int $id): bool
    {
        $model = $this->model->findOrFail($id);
        return $model->delete();
    }

    public function restore(int $id): bool
    {
        $model = $this->model->onlyTrashed()->find($id);
        if ($model) {
            return $model->restore(); 
        }
        return false;
    }

    public function show(int $id): ?Model
    {
        return $this->model->find($id);
    }
}
