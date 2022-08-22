<?php

namespace App\Mail;

use App\Models\Account;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminInvitedEmail extends Mailable
{
    use Queueable, SerializesModels;

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
     * The invited user
     * @var User $user
     * @var Account $account
     * @var string $tempPassword
     * 
     * @return void
     */

    public function __construct(User $user, Account $account, string $tempPassword)
    {
        $this->user = $user;
        $this->account = $account;
        $this->tempPassword = $tempPassword;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.account.inviteAdmin');
    }
}
