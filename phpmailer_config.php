<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sendEmail($name, $email, $message) {
    $mail = new PHPMailer(true);
    
    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'arsenysvyatov@yandex.ru';
        $mail->Password = 'soksef-veqcY6-vasjuf';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8';

        // Отправитель и получатель
        $mail->setFrom('arsenysvyatov@yandex.ru', 'Invite by KS');
        $mail->addAddress('arsenysvyatov@yandex.ru');

        // Содержимое письма
        $mail->isHTML(true);
        $mail->Subject = 'Новое сообщение с сайта Invite by KS';
        $mail->Body = "
            <h2>Новое сообщение с сайта Invite by KS</h2>
            <p><strong>Имя:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Сообщение:</strong></p>
            <p>$message</p>
        ";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Ошибка отправки письма: {$mail->ErrorInfo}");
        return false;
    }
}
?> 