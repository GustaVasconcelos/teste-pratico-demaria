<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasFilters
{
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        foreach ($filters as $key => $value) {
            if ($key === 'deleted_at') {
                if ($value === 'not_null') {
                    $query->withTrashed()->whereNotNull('deleted_at');
                } else {
                    $query->withoutTrashed();
                }
            } elseif (is_array($value)) {
                $query->whereIn($key, $value);
            } else {
                $query->where($key, $value);
            }
        }

        return $query;
    }

    public function scopeSort(Builder $query, array $sort): Builder
    {
        foreach ($sort as $sortField) {
            list($field, $direction) = explode(':', $sortField);
            $query->orderBy($field, $direction);
        }

        return $query;
    }
}
