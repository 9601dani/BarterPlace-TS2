<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\RequestSellerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PublicationTypeController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\PackMoneyController;
use App\Http\Controllers\TarjetController;
use App\Http\Controllers\AccountBankController;
use App\Http\Controllers\RecordRechargeController;
use App\Http\Controllers\RecordBuyPackController;
use App\Http\Controllers\PublicationCopyController;
use App\Http\Controllers\ReportPublicationController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\TransferController;


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
Route::post('/tarjet', [TarjetController::class, 'store']);
Route::get('/tarjet/{username}', [TarjetController::class, 'index']);
Route::put('/tarjet/{id}', [TarjetController::class, 'update']);
Route::delete('/tarjet/{id}', [TarjetController::class, 'destroy']);
Route::post('/account_bank', [AccountBankController::class, 'store']);
Route::get('/account_bank/{username}', [AccountBankController::class, 'index']);
Route::put('/account_bank/{username}', [AccountBankController::class, 'update']);
Route::delete('/account_bank/{id}', [AccountBankController::class, 'destroy']);
Route::post('/record_recharge', [RecordRechargeController::class, 'store']);
Route::get('/record_recharge/{username}', [RecordRechargeController::class, 'index']);
Route::post('/record_buy_pack', [RecordBuyPackController::class, 'store']);
Route::get('/record_buy_pack/{username}', [RecordBuyPackController::class, 'index']);


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
Route::get('/publicationsNotUser/{username}', [PublicationController::class, 'getPublicationsMain']);
Route::get('/publicationsUser/{username}', [PublicationController::class, 'comprobarNumeroPublicaciones']);
Route::post('/reportPublication', [ReportPublicationController::class, 'store']);
Route::get('/reportPublication', [ReportPublicationController::class, 'index']);
Route::put('/reportPublicationUpdate/{id}', [ReportPublicationController::class, 'changeStatus']);
Route::put('/publicationsBlock/{id}', [ReportPublicationController::class, 'bloquearPublication']);
Route::get('/publicationsInfoBlock/{id}', [ReportPublicationController::class, 'infoBloqueoPublication']);
//ESTA ES PARA VISTA MAIN GUEST POR ESO LIMIT DE 25
Route::get('/puByCate/{category}', [PublicationController::class, 'publicationsByCategory']);

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
Route::get('/packmoney', [PackMoneyController::class, 'index']);
Route::post('/packmoney', [PackMoneyController::class, 'store']);
Route::put('/packmoney/{id}', [PackMoneyController::class, 'update']);
Route::delete('/packmoney/{id}', [PackMoneyController::class, 'destroy']);

//RUTAS PARA LA VENTA DE PRODUCTOS
Route::post('/sellPublication',[PublicationCopyController::class, 'store']);
Route::get('/publicationsBuyed/{username_buyer}',[PublicationCopyController::class, 'index']);
Route::post('/volunter/{id}',[PublicationCopyController::class, 'verificarParticipacionAnt']);
Route::get('/chats/{username}', [ChatsController::class, 'show']);
Route::post('/chatsS', [ChatsController::class, 'verExistenciaChat']);
Route::post('/chats', [ChatsController::class, 'store']);
Route::get('/messages/{chat_id}', [MessagesController::class, 'show']);
Route::post('/messages', [MessagesController::class, 'store']);

//RUTAS PARA TRANSFERENCIAS
Route::post('/transfer', [TransferController::class, 'store']);
Route::get('/transfer/{username}', [TransferController::class, 'show']);
Route::get('/transferS/{username}', [TransferController::class, 'index']);
