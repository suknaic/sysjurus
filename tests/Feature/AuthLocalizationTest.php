<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthLocalizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_with_invalid_credentials_shows_portuguese_error(): void
    {
        $response = $this->post('/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors(['email']);
        $errors = session('errors')->getBag('default')->get('email');
        $this->assertNotEmpty($errors);
        $this->assertStringContainsString('não correspondem', $errors[0]);
    }

    public function test_forgot_password_with_invalid_email_shows_portuguese_error(): void
    {
        $response = $this->post('/forgot-password', [
            'email' => 'nonexistent@example.com',
        ]);

        $response->assertSessionHasErrors(['email']);
        $errors = session('errors')->getBag('default')->get('email');
        $this->assertNotEmpty($errors);
        $this->assertStringContainsString('não encontramos', strtolower($errors[0]));
    }

    public function test_register_with_missing_fields_shows_portuguese_errors(): void
    {
        $response = $this->post('/register', [
            'name' => '',
            'email' => '',
            'password' => '',
            'password_confirmation' => '',
        ]);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
        $nameErrors = session('errors')->getBag('default')->get('name');
        $this->assertNotEmpty($nameErrors);
        $this->assertStringContainsString('obrigatório', $nameErrors[0]);
    }

    public function test_password_mismatch_shows_portuguese_error(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different',
        ]);

        $response->assertSessionHasErrors(['password']);
        $errors = session('errors')->getBag('default')->get('password');
        $this->assertNotEmpty($errors);
        $this->assertStringContainsString('confirmação', $errors[0]);
    }

    public function test_invalid_email_format_shows_portuguese_error(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'not-an-email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertSessionHasErrors(['email']);
        $errors = session('errors')->getBag('default')->get('email');
        $this->assertNotEmpty($errors);
        $this->assertStringContainsString('e-mail', $errors[0]);
    }
}
