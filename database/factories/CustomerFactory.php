<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    public function definition(): array
    {
        $uf = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

        return [
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->optional(0.7)->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'phone_is_international' => false,
            'birth_date' => fake()->dateTimeBetween('-80 years', '-18 years'),
            'document_type' => fake()->randomElement(['cpf', 'cnpj']),
            'document_number' => fake()->numerify('###.###.###-##'),
            'rg' => fake()->numerify('##.###.###-#'),
            'zip_code' => fake()->numerify('#####-###'),
            'address' => fake()->streetName(),
            'number' => fake()->buildingNumber(),
            'complement' => fake()->optional(0.5)->word(),
            'district' => fake()->citySuffix(),
            'city' => fake()->city(),
            'state' => $uf[array_rand($uf)],
        ];
    }
}
