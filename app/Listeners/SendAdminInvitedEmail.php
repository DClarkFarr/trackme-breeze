<?php

namespace App\Listeners;

use App\Events\AdminInvited;
use App\Mail\AdminInvitedEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendAdminInvitedEmail
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(AdminInvited $event)
    {
        info(['listener fired', $event->tempPassword]);

        $res = Mail::to($event->user->email)
            ->send(new AdminInvitedEmail($event->user, $event->account, $event->tempPassword));

        info(['mail sent', $res]);
    }
}
