<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->toArray();

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'default_interest_rate' => 'nullable|numeric|min:0|max:100',
            'default_fine_amount' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|max:10',
        ]);

        foreach ($request->only(['default_interest_rate', 'default_fine_amount', 'currency']) as $key => $value) {
            Setting::setValue($key, $value);
        }

        return back()->with('success', 'Configurações atualizadas com sucesso.');
    }
}
