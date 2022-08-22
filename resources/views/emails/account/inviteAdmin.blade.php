<div>
    <h2>Welcome, {{ $user->name }} (<small>{{ $user->email }}</small>)!</h2>
    <p>You have been invited to join TrackMe account: {$account->name}</p>

    @if ($tempPassword)
        <p>
            Your temporary password is: <b>{{ $tempPassword }}</b>
        </p>
    @endif
    <p>
        Please click the link below to set your password and login to your account.
    </p>
    <p>
        <a href="{{ config('app.url') }}">{{ config('app.url') }}/account</a>
    </p>
    <br /><br />
    <p>
        Sincerely, <br />
        TrackMe Team
    </p>
</div>
