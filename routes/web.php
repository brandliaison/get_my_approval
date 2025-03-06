<?php

use Illuminate\Support\Facades\Route;

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');
