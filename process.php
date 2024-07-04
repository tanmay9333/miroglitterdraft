<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $last_name = filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $weight = filter_input(INPUT_POST, 'weight', FILTER_SANITIZE_NUMBER_INT);
    $weightUnit = filter_input(INPUT_POST, 'weightUnit', FILTER_SANITIZE_STRING);
    $company_name = filter_input(INPUT_POST, 'company_name', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Form validation (optional, implement more robust validation)
    $errors = [];
    if (empty($name)) {
        $errors['name'] = "Please enter your first name.";
    }
    if (empty($last_name)) {
        $errors['last_name'] = "Please enter your last name.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Please enter a valid email address.";
    }
    if (empty($phone)) {
        $errors['phone'] = "Please enter your phone number.";
    }
    // Add more validation as needed, e.g., weight range

    if (count($errors) > 0) {
        // Display validation errors
        $error_message = "<ul>";
        foreach ($errors as $error) {
            $error_message .= "<li>$error</li>";
        }
        $error_message .= "</ul>";
        echo $error_message;
    } else {
        // Form validation passed, proceed with email sending (replace with your own mechanism)

        // Replace the following with your email sending logic (e.g., using PHPMailer, SwiftMailer, etc.)
        $to = "your_email@example.com";  // Replace with your recipient email
        $subject = "Contact Form Submission from $name";
        $body = "Name: $name $last_name\nEmail: $email\nPhone: $phone\nWeight: $weight $weightUnit\nCompany Name: $company_name\nMessage: $message";
        if (mail($to, $subject, $body)) {
            echo "Thank you for contacting us! We will get back to you soon.";
        } else {
            echo "Error sending email. Please try again later.";
        }

        // Example using PHPMailer (replace with your server setup and credentials)
    }
}
