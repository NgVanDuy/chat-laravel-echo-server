<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['name'];

    public function messages() {
        return $this->hasMany(Message::class);
    }
}
