<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submitted</title>
</head>
<body>
    <h1>Thank you for your submission, {{ $userData->name }}!</h1>
    <p>We have received the following details from you:</p>
    <ul>
        <li>Email: {{ $userData->email }}</li>
        <li>Phone: {{ $userData->phone }}</li>
        <li>Occupation: {{ $userData->occupation }}</li>
        <li>Industry: {{ $userData->industry }}</li>
        <!-- Add more fields as needed -->
    </ul>
    <p>We will get back to you shortly.</p>
</body>php artisan route:list

</html>
