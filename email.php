<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = htmlspecialchars(trim($_POST["name"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $photo_type = htmlspecialchars(trim($_POST["photo_type"]));
    $message = htmlspecialchars(trim($_POST["message"]));
    
    // Валидация email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Неверный формат email");
    }
    
    // Адрес, на который нужно отправить письмо
    $to = "ваш_email@example.com";
    
    // Тема письма
    $subject = "Новая заявка на фотосъемку от $name";
    
    // Сообщение
    $email_message = "Новая заявка на фотосъемку\n\n";
    $email_message .= "Имя: $name\n";
    $email_message .= "Телефон: $phone\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Тип съемки: $photo_type\n";
    $email_message .= "Сообщение:\n$message\n";
    $email_message .= "\n---\nДата: " . date("Y-m-d H:i:s");
    
    // Заголовки
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Отправка письма
    if (mail($to, $subject, $email_message, $headers)) {
        // Перенаправление на страницу успеха
        header("Location: thank_you.html");
        exit();
    } else {
        die("Ошибка при отправке письма");
    }
    // опционально
}
?>