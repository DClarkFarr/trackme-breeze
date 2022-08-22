<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['web', 'auth'])->group(function () {
    Route::prefix('/user')->group(function () {
        Route::get('/', function (Request $request) {
            return $request->user();
        });

        Route::post("/account/{id}/invite", [UserController::class, 'inviteAdmin'])->name('user.invite-admin');
        Route::get('/account', [UserController::class, 'getAccounts']);
    });
});

Route::any('/', function () {
    return response()->json(['message' => 'Route not found'], 404);
});
