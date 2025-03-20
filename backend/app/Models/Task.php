<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use App\Traits\HasFilters;

class Task extends Model
{
    use HasFactory, SoftDeletes, HasFilters;

    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $dates = [
        'deleted_at', 
    ];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('withTrashed', function (Builder $builder) {
            $builder->withTrashed();
        });
    }
}

