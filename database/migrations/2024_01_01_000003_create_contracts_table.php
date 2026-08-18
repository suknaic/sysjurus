<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique();
            $table->string('description')->nullable();
            $table->decimal('amount', 12, 2);
            $table->decimal('interest_rate', 5, 2)->default(0);
            $table->decimal('fine_amount', 12, 2)->default(0);
            $table->string('payment_frequency', 30);
            $table->date('first_payment_date');
            $table->unsignedInteger('total_installments')->default(1);
            $table->string('status', 30)->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
