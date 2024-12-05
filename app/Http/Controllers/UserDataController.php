<?php

namespace App\Http\Controllers;

use App\Models\UserData;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class UserDataController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'nationality' => 'nullable|string|max:255',
            'residence' => 'nullable|string|max:255',
            'age' => 'nullable|integer|min:1',
            'linkedin' => 'nullable|url|max:255',
            'occupation' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'experience' => 'nullable|string|max:255',
            'income' => 'nullable|string|max:255',
            'financial_goals' => 'nullable|string', // Comma-separated string
            'specify_financial_goals' => 'nullable|string', // Comma-separated string
            'skills' => 'nullable|string', // Comma-separated string
            'net_worth' => 'nullable|string|max:255',
            'retire_years' => 'nullable|integer|min:1',
        ]);
    
        $userData = UserData::create($validatedData);
        
        return response()->json([
            'message' => 'Form submitted successfully!',
            'data' => $userData,
        ], 201);
    }        
    
}