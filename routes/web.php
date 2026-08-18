<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstallmentController;
use App\Http\Controllers\MessageTemplateController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::resource('customers', CustomerController::class);
    Route::resource('contracts', ContractController::class);

    Route::get('installments', [InstallmentController::class, 'index'])->name('installments.index');
    Route::get('installments/{installment}', [InstallmentController::class, 'show'])->name('installments.show');
    Route::put('installments/{installment}', [InstallmentController::class, 'update'])->name('installments.update');

    Route::delete('payments/{payment}', [PaymentController::class, 'destroy'])->name('payments.destroy');

    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');

    Route::resource('salaries', SalaryController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');

    Route::resource('message-templates', MessageTemplateController::class)->except(['create', 'show', 'edit']);
    Route::post('message-templates/preview', [MessageTemplateController::class, 'preview'])->name('message-templates.preview');
    Route::get('message-templates/list', [MessageTemplateController::class, 'list'])->name('message-templates.list');
});

require __DIR__.'/auth.php';
