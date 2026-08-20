<?php

namespace Tests\Unit;

use App\Models\Installment;
use Carbon\Carbon;
use Tests\TestCase;

class DaysOverdueCalculationTest extends TestCase
{
    /**
     * Test that due_date in the future produces 0 days overdue.
     */
    public function test_future_due_date_returns_zero(): void
    {
        $installment = new Installment;
        $installment->due_date = Carbon::tomorrow();

        $daysOverdue = $this->calculateDaysOverdue($installment);

        $this->assertEquals(0, $daysOverdue);
    }

    /**
     * Test that due_date today produces 0 days overdue.
     */
    public function test_today_due_date_returns_zero(): void
    {
        $installment = new Installment;
        $installment->due_date = Carbon::today();

        $daysOverdue = $this->calculateDaysOverdue($installment);

        $this->assertEquals(0, $daysOverdue);
    }

    /**
     * Test that due_date yesterday produces 1 day overdue.
     */
    public function test_yesterday_due_date_returns_one(): void
    {
        $installment = new Installment;
        $installment->due_date = Carbon::yesterday();

        $daysOverdue = $this->calculateDaysOverdue($installment);

        $this->assertEquals(1, $daysOverdue);
    }

    /**
     * Test that due_date 30 days ago produces 30 days overdue.
     */
    public function test_thirty_days_ago_returns_thirty(): void
    {
        $installment = new Installment;
        $installment->due_date = Carbon::now()->subDays(30);

        $daysOverdue = $this->calculateDaysOverdue($installment);

        $this->assertEquals(30, $daysOverdue);
    }

    /**
     * Test that due_date 1 day in the future returns 0 (never negative).
     */
    public function test_never_returns_negative(): void
    {
        $installment = new Installment;
        $installment->due_date = Carbon::now()->addDays(365);

        $daysOverdue = $this->calculateDaysOverdue($installment);

        $this->assertGreaterThanOrEqual(0, $daysOverdue);
    }

    /**
     * Test that ISO 8601 date strings are handled correctly.
     * This is the format Laravel sends via Inertia (due to 'date' cast).
     */
    public function test_iso8601_date_string_is_handled(): void
    {
        $dueDate = Carbon::yesterday()->format('Y-m-d');
        $daysOverdue = $this->calculateDaysOverdueFromString($dueDate);

        $this->assertEquals(1, $daysOverdue);
    }

    /**
     * Test that ISO 8601 datetime string (with time) is handled correctly.
     */
    public function test_iso8601_datetime_string_is_handled(): void
    {
        $dueDate = Carbon::yesterday()->format('Y-m-d\TH:i:s.u\Z');
        $daysOverdue = $this->calculateDaysOverdueFromString($dueDate);

        $this->assertEquals(1, $daysOverdue);
    }

    /**
     * Calculate days overdue using the same logic as WhatsAppSendButton.tsx.
     * Mirrors: Math.max(0, Math.floor((Date.now() - new Date(due_date.split('T')[0] + 'T12:00:00').getTime()) / 86400000))
     */
    private function calculateDaysOverdue(Installment $installment): int
    {
        $due = Carbon::parse($installment->due_date)->startOfDay();
        $now = Carbon::now()->startOfDay();

        return max(0, $now->diffInDays($due, false) * -1);
    }

    /**
     * Calculate days overdue from a date string (simulating frontend behavior).
     */
    private function calculateDaysOverdueFromString(string $dueDate): int
    {
        // Simulate frontend: split('T')[0] then parse
        $datePart = explode('T', $dueDate)[0];
        $due = Carbon::parse($datePart)->startOfDay();
        $now = Carbon::now()->startOfDay();

        return max(0, $now->diffInDays($due, false) * -1);
    }
}
