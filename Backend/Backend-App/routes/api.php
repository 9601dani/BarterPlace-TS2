<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\RequestSellerController;
use App\Http\Controllers\CategoryController;

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
Route::get('/bank/{username}', [BankController::class, 'show']);

// ROUTAS DE ADMINISTRADORES
Route::get('/admins', [UserController::class, 'getAllAdmins']);
Route::delete('/admins/{id}', [UserController::class, 'deleteAdmin']);
Route::put('/admins', [UserController::class, 'update']);
Route::put('/admins/image', [UserController::class, 'updateImg']);
Route::get('/request/sellers', [RequestSellerController::class, 'index']);
Route::post('/request/sellers', [RequestSellerController::class, 'store']);
Route::get('/request/sellers/{username}', [RequestSellerController::class, 'show']);
Route::put('/request/sellers/{username}', [RequestSellerController::class, 'update']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{name}', [CategoryController::class, 'show']);

