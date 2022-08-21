<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
        'name',
        'deleted_at',
    ];

    protected $casts = [
        'deleted_at' => 'datetime',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    /**
     * Relationships
     */

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            "accounts_users_rel",
            "id_account",
            "id_user",
            "id",
            "id"
        )->withPivot([
            'role',
            'status',
            'status_at',
            'created_at',
            'updated_at',
            'active'
        ]);
    }

    /**
     * Methods
     */
}
