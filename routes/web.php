<?php

use Illuminate\Support\Facades\Route;

// CMS Routes
Route::get('/op-admin/{path?}', function () {
    return view('operations'); // Your cms React view file
})->where('path', '.*');

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');
