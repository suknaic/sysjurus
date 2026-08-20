<?php

namespace Tests\Feature;

use App\Models\MessageTemplate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MessageTemplateTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_user_can_list_templates(): void
    {
        MessageTemplate::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)->get('/message-templates');

        $response->assertStatus(200);
    }

    public function test_user_can_create_custom_template(): void
    {
        $response = $this->actingAs($this->user)->post('/message-templates', [
            'name' => 'Teste Template',
            'category' => 'custom',
            'message' => 'Olá {{nome_cliente}}, sua parcela vence em {{data_vencimento}}.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('message_templates', [
            'name' => 'Teste Template',
            'category' => 'custom',
            'user_id' => $this->user->id,
        ]);
    }

    public function test_user_can_edit_template(): void
    {
        $template = MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'name' => 'Original Name',
        ]);

        $response = $this->actingAs($this->user)->put("/message-templates/{$template->id}", [
            'name' => 'Updated Name',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('message_templates', [
            'id' => $template->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_user_can_toggle_active(): void
    {
        $template = MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'is_active' => true,
        ]);

        $response = $this->actingAs($this->user)->put("/message-templates/{$template->id}", [
            'is_active' => false,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('message_templates', [
            'id' => $template->id,
            'is_active' => false,
        ]);
    }

    public function test_user_can_delete_custom_template(): void
    {
        $template = MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'category' => 'custom',
        ]);

        $response = $this->actingAs($this->user)->delete("/message-templates/{$template->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('message_templates', ['id' => $template->id]);
    }

    public function test_cannot_delete_non_custom_template(): void
    {
        $template = MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'category' => 'cobranca',
        ]);

        $response = $this->actingAs($this->user)->delete("/message-templates/{$template->id}");

        $response->assertRedirect();
        $this->assertDatabaseHas('message_templates', ['id' => $template->id]);
    }

    public function test_cannot_delete_lembrete_template(): void
    {
        $template = MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'category' => 'lembrete',
        ]);

        $response = $this->actingAs($this->user)->delete("/message-templates/{$template->id}");

        $response->assertRedirect();
        $this->assertDatabaseHas('message_templates', ['id' => $template->id]);
    }

    public function test_cannot_delete_aviso_final_template(): void
    {
        $template = MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'category' => 'aviso_final',
        ]);

        $response = $this->actingAs($this->user)->delete("/message-templates/{$template->id}");

        $response->assertRedirect();
        $this->assertDatabaseHas('message_templates', ['id' => $template->id]);
    }

    public function test_cannot_delete_another_users_template(): void
    {
        $otherUser = User::factory()->create();
        $template = MessageTemplate::factory()->create([
            'user_id' => $otherUser->id,
            'category' => 'custom',
        ]);

        $response = $this->actingAs($this->user)->delete("/message-templates/{$template->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('message_templates', ['id' => $template->id]);
    }

    public function test_cannot_edit_another_users_template(): void
    {
        $otherUser = User::factory()->create();
        $template = MessageTemplate::factory()->create([
            'user_id' => $otherUser->id,
            'name' => 'Original',
        ]);

        $response = $this->actingAs($this->user)->put("/message-templates/{$template->id}", [
            'name' => 'Hacked',
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseHas('message_templates', [
            'id' => $template->id,
            'name' => 'Original',
        ]);
    }

    public function test_list_endpoint_returns_only_active_templates(): void
    {
        MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'is_active' => true,
        ]);
        MessageTemplate::factory()->create([
            'user_id' => $this->user->id,
            'is_active' => false,
        ]);

        $response = $this->actingAs($this->user)->get('/message-templates/list');

        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
    }
}
