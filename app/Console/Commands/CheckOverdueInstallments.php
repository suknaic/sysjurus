<?php

namespace App\Console\Commands;

use App\Models\Installment;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckOverdueInstallments extends Command
{
    protected $signature = 'installments:check-overdue';

    protected $description = 'Mark pending installments as overdue and update days_overdue';

    public function handle(): int
    {
        $today = Carbon::today();

        $updated = Installment::where('status', 'pending')
            ->where('due_date', '<', $today)
            ->update(['status' => 'overdue']);

        $recalculated = Installment::where('status', 'overdue')
            ->get()
            ->each(function (Installment $inst) use ($today) {
                $inst->days_overdue = $today->diffInDays($inst->due_date);
                $inst->save();
            });

        $total = $updated + $recalculated->count();

        $this->info("{$updated} parcelas marcadas como atrasadas.");
        $this->info("{$recalculated->count()} parcelas com dias de atraso recalculados.");

        return Command::SUCCESS;
    }
}
