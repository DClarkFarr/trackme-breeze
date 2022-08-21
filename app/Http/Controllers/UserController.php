<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAccounts(Request $request)
    {
        $user = $request->user();

        $accounts = $user->accounts()->with(['users'])->get();

        return $accounts->toArray();
    }
}
