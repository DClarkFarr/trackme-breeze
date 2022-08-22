<?php

namespace App\Events;

use App\Models\Account;
use App\Models\User;
use Illuminate\Queue\SerializesModels;

class AdminInvited
{
    use SerializesModels;

    /**
     * The invited user
     * @var User
     */
    public $user;

    /**
     * The account the user was invited to
     * @var Account
     */
    public $account;

    /**
     * The temporary password.
     *
     * @var string
     */
    public $tempPassword;

    /**
     * Create a new event instance.
     *
     * @param  User  $user
     * @param Account $account
     * @param  string  $tempPassword
     * @return void
     */
    public function __construct(User $user, Account $account, string $tempPassword)
    {
        info(['created event', $tempPassword]);

        $this->user = $user;
        $this->account = $account;
        $this->tempPassword = $tempPassword;
    }
}
