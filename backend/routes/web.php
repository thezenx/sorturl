<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\tableUrlController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{shortCode}', [tableUrlController::class, 'redirectToUrl']);
