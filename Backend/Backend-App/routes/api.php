<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\RequestSellerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PublicationTypeController;
use App\Http\Controllers\PublicationController;

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
Route::put('/bankApliCurrency/{username}', [BankController::class, 'updateAplicationCurrency']);

// ROUTAS DE PUBLICACIONES
Route::get('/publications/types', [PublicationTypeController::class, 'index']);
Route::post('/publications', [PublicationController::class, 'store']);
Route::get('/publications', [PublicationController::class, 'index']);
Route::put('/publications/{id}', [PublicationController::class, 'update']);
Route::get('/publications/{id}', [PublicationController::class, 'show']);
Route::get('/publicationsP', [PublicationController::class, 'publicationsP']);
Route::put('/publicationsS/{id}', [PublicationController::class, 'updateStatus']);
Route::put('/publicationsReSend/{id}', [PublicationController::class, 'reenviarPublication']);
Route::put('/publicationsInactive/{id}', [PublicationController::class, 'inactivePublication']);


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

