<?php

use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

\Illuminate\Support\Facades\Broadcast::routes();

Route::get('/', function () {
    return view('welcome');
});

Route::post('/message', [MessageController::class, 'newMessage']);

Route::get('/messages', [MessageController::class, 'getAllMessage']);

Route::post('/clear', [MessageController::class, 'clearAllMessage']);
