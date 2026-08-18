<?php

namespace App\Http\Controllers;

use App\Services\DashboardMetricsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardMetricsService $metricsService
    ) {}

    public function __invoke(Request $request)
    {
        $metrics = $this->metricsService->getMetrics([
            'user_id' => $request->user()->id,
        ]);

        $recentInstallments = $this->metricsService->getRecentInstallments($request->user()->id);

        return Inertia::render('Dashboard/Index', [
            'metrics' => $metrics,
            'recentInstallments' => $recentInstallments,
        ]);
    }
}
