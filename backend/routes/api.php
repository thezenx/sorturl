<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\tableUrlController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/getUrls', [tableUrlController::class, 'getUrls']);
Route::get('/updateUrl/{id}', [tableUrlController::class, 'updateUrl']);
Route::post('/shorten', [tableUrlController::class, 'shorten']);



