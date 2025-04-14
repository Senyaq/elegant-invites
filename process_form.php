<?php
require 'phpmailer_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Отправляем письмо
    if (sendEmail($name, $email, $message)) {
        // Если письмо отправлено успешно
        echo json_encode(['status' => 'success', 'message' => 'Сообщение успешно отправлено!']);
    } else {
        // Если произошла ошибка
        echo json_encode(['status' => 'error', 'message' => 'Произошла ошибка при отправке сообщения.']);
    }
} else {
    // Если запрос не POST
    echo json_encode(['status' => 'error', 'message' => 'Неверный метод запроса.']);
}
?> 