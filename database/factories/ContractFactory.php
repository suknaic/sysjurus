<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContractFactory extends Factory
{
    public function definition(): array
    {
        $frequencies = ['weekly', 'biweekly', 'monthly', 'quarterly', 'semiannually', 'annually'];
        $frequency = $frequencies[array_rand($frequencies)];

        return [
            'user_id' => User::factory(),
            'customer_id' => Customer::factory(),
            'code' => 'CTR-' . fake()->numerify('#####'),
            'description' => fake()->sentence(4),
            'amount' => fake()->randomFloat(2, 100, 50000),
            'interest_rate' => fake()->randomFloat(2, 0, 5),
            'fine_amount' => fake()->randomFloat(2, 0, 500),
            'payment_frequency' => $frequency,
            'first_payment_date' => fake()->dateTimeBetween('now', '+30 days'),
            'total_installments' => fake()->numberBetween(1, 60),
            'status' => 'active',
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }
}
