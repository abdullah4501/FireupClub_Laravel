<?php

namespace App\Mail;

use App\Models\UserData;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserDataSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public $userData;

    public function __construct(UserData $userData)
    {
        $this->userData = $userData;
    }

    public function build()
    {
        return $this->subject('Your Form Submission Received')
                    ->view('emails.user_data_submitted'); // This should be a blade view for the email content
    }
}
