<?php

namespace Tests\Feature;

use App\Models\Contract;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportFilterTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_reports_page_loads(): void
    {
        $response = $this->actingAs($this->user)->get('/reports');

        $response->assertStatus(200);
    }

    public function test_filter_by_date_range_returns_matching_contracts(): void
    {
        $customer = Customer::factory()->create(['user_id' => $this->user->id]);

        $contractInRange = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'first_payment_date' => '2026-08-15',
        ]);

        $contractOutOfRange = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'first_payment_date' => '2026-09-15',
        ]);

        $response = $this->actingAs($this->user)->get('/reports?date_from=2026-08-01&date_to=2026-08-31');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 1)
            ->where('contracts.0.id', $contractInRange->id)
        );
    }

    public function test_filter_by_date_range_is_inclusive_on_end_date(): void
    {
        $customer = Customer::factory()->create(['user_id' => $this->user->id]);

        $contract = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'first_payment_date' => '2026-08-31',
        ]);

        $response = $this->actingAs($this->user)->get('/reports?date_from=2026-08-01&date_to=2026-08-31');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 1)
            ->where('contracts.0.id', $contract->id)
        );
    }

    public function test_filter_by_single_date(): void
    {
        $customer = Customer::factory()->create(['user_id' => $this->user->id]);

        $contract = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'first_payment_date' => '2026-08-15',
        ]);

        $response = $this->actingAs($this->user)->get('/reports?date_from=2026-08-15&date_to=2026-08-15');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 1)
            ->where('contracts.0.id', $contract->id)
        );
    }

    public function test_filter_by_customer(): void
    {
        $customer1 = Customer::factory()->create(['user_id' => $this->user->id]);
        $customer2 = Customer::factory()->create(['user_id' => $this->user->id]);

        $contract1 = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer1->id,
        ]);

        Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer2->id,
        ]);

        $response = $this->actingAs($this->user)->get("/reports?customer_id={$customer1->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 1)
            ->where('contracts.0.id', $contract1->id)
        );
    }

    public function test_filter_by_status(): void
    {
        $customer = Customer::factory()->create(['user_id' => $this->user->id]);

        $activeContract = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'status' => 'active',
        ]);

        Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'status' => 'completed',
        ]);

        $response = $this->actingAs($this->user)->get('/reports?status=active');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 1)
            ->where('contracts.0.id', $activeContract->id)
        );
    }

    public function test_combined_filters(): void
    {
        $customer1 = Customer::factory()->create(['user_id' => $this->user->id]);
        $customer2 = Customer::factory()->create(['user_id' => $this->user->id]);

        $matchingContract = Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer1->id,
            'status' => 'active',
            'first_payment_date' => '2026-08-15',
        ]);

        Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer2->id,
            'status' => 'active',
            'first_payment_date' => '2026-08-15',
        ]);

        Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer1->id,
            'status' => 'completed',
            'first_payment_date' => '2026-08-15',
        ]);

        Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer1->id,
            'status' => 'active',
            'first_payment_date' => '2026-09-15',
        ]);

        $response = $this->actingAs($this->user)->get("/reports?customer_id={$customer1->id}&status=active&date_from=2026-08-01&date_to=2026-08-31");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 1)
            ->where('contracts.0.id', $matchingContract->id)
        );
    }

    public function test_empty_range_returns_nothing(): void
    {
        $customer = Customer::factory()->create(['user_id' => $this->user->id]);

        Contract::factory()->create([
            'user_id' => $this->user->id,
            'customer_id' => $customer->id,
            'first_payment_date' => '2026-08-15',
        ]);

        $response = $this->actingAs($this->user)->get('/reports?date_from=2026-06-01&date_to=2026-06-30');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 0)
        );
    }

    public function test_other_user_contracts_not_visible(): void
    {
        $otherUser = User::factory()->create();
        $customer = Customer::factory()->create(['user_id' => $otherUser->id]);

        Contract::factory()->create([
            'user_id' => $otherUser->id,
            'customer_id' => $customer->id,
            'first_payment_date' => '2026-08-15',
        ]);

        $response = $this->actingAs($this->user)->get('/reports?date_from=2026-08-01&date_to=2026-08-31');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Reports/Index')
            ->has('contracts', 0)
        );
    }
}
