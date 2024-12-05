<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;

    protected $table = 'subscription';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'nationality',
        'residence',
        'age',
        'linkedin',
        'occupation',
        'industry',
        'experience',
        'income',
        'financial_goals',
        'specify_financial_goals',
        'net_worth',
        'skills',
        'retire_years',
    ];
}
