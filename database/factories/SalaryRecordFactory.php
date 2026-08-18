<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalaryRecordFactory extends Factory
{
    public function definition(): array
    {
        $statuses = ['pending', 'received', 'overdue'];
        $categories = ['Salário', 'Comissão', 'Bonificação', 'Pró-labore', 'Bônus'];

        return [
            'user_id' => User::factory(),
            'title' => fake()->words(3, true),
            'person_name' => fake()->name(),
            'amount' => fake()->randomFloat(2, 500, 20000),
            'due_date' => fake()->dateTimeBetween('-60 days', '+60 days'),
            'received_at' => null,
            'status' => $statuses[array_rand($statuses)],
            'category' => $categories[array_rand($categories)],
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }
}
