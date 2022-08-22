<?php

namespace App\Http\Controllers;

use App\Events\AdminInvited;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function getAccounts(Request $request)
    {
        $user = $request->user();

        $accounts = $user->accounts()->with(['users'])->get();

        return $accounts->toArray();
    }

    /**
     * Invite a new admin to the account
     * If user does not exist, create new user recort.
     * Set Accounts pivot role to admin, and status to pending, and status_at to current date.
     */
    public function inviteAdmin(Request $request, $id)
    {
        $user = $request->user();

        $account = $user->accounts()->where('id', $id)->first();

        if (!$account) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        $this->validate($request, [
            'email' => 'required|email',
            'name' => 'required',
        ]);

        $email = $request->input('email');
        $name = $request->input('name');

        $invitedUser = User::where('email', $email)->first();

        $tempPassword = '';

        if (!$invitedUser) {
            $tempPassword = 'Happy' . date('jS') . '!';
            $invitedUser = User::create([
                'email' => $email,
                'name' => $name,
                'password' => Hash::make($tempPassword),
            ]);
        } else {
            /**
             * Check if user already has relationship with account
             */
            $existingInvite = $invitedUser->accounts()->where('id_account', $account->id)->first();

            /**
             * If relationship status is 'reject', ignore
             */
            if ($existingInvite) {
                if ($existingInvite->pivot->status != 'reject') {
                    return response()->json(['message' => 'User has already been invited, with status "' . $existingInvite->pivot->status . '"'], 400);
                }
                $invitedUser->accounts()->detatch($account->id);
            }
        }

        /**
         * Create new rel, or update existing
         */
        $invitedUser->accounts()->attach($account, [
            'role' => 'admin',
            'status' => 'pending',
            'status_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $responseUser = $account->users()->where('id', $invitedUser->id)->first();

        event(new AdminInvited($responseUser, $account, $tempPassword));

        return response()->json($responseUser->toArray());
    }
}
