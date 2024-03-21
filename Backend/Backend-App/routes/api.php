<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/test', function () {
    return ['message' => 'Hello World! This is a test route.'];
});

// ROUTAS DE CLIENTES/USUARIOS
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/auth', [UserController::class, 'auth']);

// ROUTAS DE ADMINISTRADORES
Route::get('/admins', [UserController::class, 'getAllAdmins']);
Route::delete('/admins/{id}', [UserController::class, 'deleteAdmin']);
Route::put('/admins', [UserController::class, 'update']);
Route::put('/admins/image', [UserController::class, 'updateImg']);

