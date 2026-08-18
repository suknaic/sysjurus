<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Services\ReportBuilderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function __construct(
        private ReportBuilderService $reportService
    ) {}

    public function index(Request $request)
    {
        $contracts = $this->reportService->build($request->only([
            'status', 'customer_id', 'date_from', 'date_to',
        ]));

        $customers = Customer::where('user_id', $request->user()->id)->orderBy('name')->get();

        return Inertia::render('Reports/Index', [
            'contracts' => $contracts,
            'customers' => $customers,
            'filters' => $request->only('status', 'customer_id', 'date_from', 'date_to'),
        ]);
    }
}
