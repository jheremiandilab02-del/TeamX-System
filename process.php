<?php
// Ensure request comes via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and validate inputs
    $name    = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $serviceInput = trim($_POST['service'] ?? '');
    $service = htmlspecialchars($serviceInput);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    $availableServices = [
        'Networking',
        'CCTV Installation',
        'PC Maintenance',
        'Operating System Installation',
        'Website Development',
        'App Development',
        'Debugging & Troubleshooting',
        'IT Support',
        'Graphic Design',
    ];

    // Validation Check
    if (empty($name) || empty($email) || !in_array($serviceInput, $availableServices, true) || empty($message)) {
        echo "<script>alert('Please fill out all required fields.'); window.history.back();</script>";
        exit;
    }

    // Success Screen Response
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Inquiry!</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>
    <body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6">
        <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl premium-form">
            <div class="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ✓
            </div>
            <h1 class="text-2xl font-bold text-white mb-2">Thank You, <?php echo $name; ?>!</h1>
            <p class="text-slate-400 text-sm mb-6">
                We have received your inquiry regarding <strong class="text-blue-300"><?php echo $service; ?></strong>. We will get back to you at <span class="text-slate-300"><?php echo $email; ?></span> as soon as possible.
            </p>
            <a href="index.php" class="premium-button">
                Return to Homepage
            </a>
        </div>
    </body>
    </html>
    <?php

} else {
    // Redirect if accessed directly without POST
    header("Location: index.php");
    exit();
}
?>