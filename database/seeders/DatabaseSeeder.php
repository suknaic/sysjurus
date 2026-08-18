<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Customer;
use App\Models\Installment;
use App\Models\SalaryRecord;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@sysjuros.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        $customers = Customer::factory()->count(8)->create(['user_id' => $user->id]);

        foreach ($customers as $customer) {
            $contract = Contract::factory()->create([
                'user_id' => $user->id,
                'customer_id' => $customer->id,
            ]);

            $installmentsCount = fake()->numberBetween(3, 12);
            $amountPerInstallment = $contract->amount / $installmentsCount;
            $date = $contract->first_payment_date->copy();

            for ($i = 1; $i <= $installmentsCount; $i++) {
                $status = match (true) {
                    $date->isPast() && fake()->boolean(30) => 'paid',
                    $date->isPast() => 'overdue',
                    default => 'pending',
                };

                Installment::create([
                    'contract_id' => $contract->id,
                    'installment_number' => $i,
                    'due_date' => $date->copy(),
                    'amount_due' => $amountPerInstallment,
                    'amount_paid' => $status === 'paid' ? $amountPerInstallment : 0,
                    'paid_at' => $status === 'paid' ? $date->copy()->addDay() : null,
                    'status' => $status,
                    'days_overdue' => $status === 'overdue' ? today()->diffInDays($date) : 0,
                ]);

                $date->addMonthNoOverflow();
            }
        }

        SalaryRecord::factory()->count(10)->create(['user_id' => $user->id]);

        $this->call(MessageTemplateSeeder::class);
    }
}
