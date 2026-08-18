<?php

namespace Database\Factories;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

class InstallmentFactory extends Factory
{
    public function definition(): array
    {
        $statuses = ['pending', 'overdue', 'paid', 'partial'];
        $status = $statuses[array_rand($statuses)];
        $amount = fake()->randomFloat(2, 50, 5000);

        return [
            'contract_id' => Contract::factory(),
            'installment_number' => fake()->numberBetween(1, 60),
            'due_date' => fake()->dateTimeBetween('-90 days', '+90 days'),
            'amount_due' => $amount,
            'amount_paid' => $status === 'paid' ? $amount : ($status === 'partial' ? $amount * fake()->randomFloat(2, 0.1, 0.9) : 0),
            'paid_at' => $status === 'paid' ? fake()->dateTimeBetween('-30 days', 'now') : null,
            'status' => $status,
            'days_overdue' => $status === 'overdue' ? fake()->numberBetween(1, 90) : 0,
        ];
    }
}
