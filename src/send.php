<?php

$event  = trim($_POST["event"]);
$company  = trim($_POST["company"]);
$fullName = trim($_POST["fullName"]);
$position = trim($_POST["position"]);
$phone    = trim($_POST["phone"]);
$email    = trim($_POST["email"]);

$date = date("H:i:s / m.d.y");
$ip_client = $_SERVER['REMOTE_ADDR'];

// **********************************************

if (empty($_POST['js'])) {
    $mes= "<table style='width: 100%; background-color: #f8f8f8;'>";

    $mes.= "
        <tr style='background-color: #e9e9e9'>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>Время / Дата отправки сообщения</td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$date</td>
        </tr>";

    foreach ( $_POST as $key => $value ) {
        if ($value != "" && $key != "event" && $key != "company" && $key != "fullName" && $key != "position" && $key != "phone" && $key != "email") {
            $mes.= "
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>".preg_replace("/_/", " ", $key)."</td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
                </tr>";
        }
    }


    $mes.= "<tr><td style='padding: 10px; colspan='2'></td></tr>";

    $mes.= "
        <tr>
            <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>IP посетителя</td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$ip_client</td>
        </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>Название мероприятия</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$event</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>Название компании</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$company</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>ФИО</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$fullName</td>
            </tr>";
    

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>Должность</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$position</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>Контактный телефон</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$phone</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'>E-mail</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$email</td>
            </tr>";


    $mes.= "</table>";

    $mes.= "<div style='text-align: right; color: #939393; margin: 20px 0 0 0'>Клиенты для Вашего бизнеса. Команда Markello.</div>";

// opzt@opzt.ru

    $to = 'opzt@opzt.ru';
    $subject .= "Заявка с сайта";
    $subject = "=?utf-8?b?" . base64_encode($subject) . "?=";

    $boundary = "--".md5(uniqid(time())); 
    $mailheaders = "MIME-Version: 1.0;\r\n"; 
    $mailheaders .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n"; 
    $mailheaders .= "From: Admin \r\n"; 

    $multipart = "--$boundary\r\n"; 
    $multipart .= "Content-Type: text/html; charset=\"utf-8\"\r\n";
    $multipart .= "Content-Transfer-Encoding: 7bit\r\n";    
    $multipart .= "\r\n";
    $multipart .= $mes;

    $message_part = '';
    if (is_uploaded_file($_FILES['usr_file']['tmp_name'])) {
        $filename = $_FILES['usr_file']['name'];
        $filetype = $_FILES['usr_file']['type'];
        $filesize = $_FILES['usr_file']['size'];

        $message_part = "\r\n--$boundary\r\n"; 
        $message_part .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";  
        $message_part .= "Content-Transfer-Encoding: base64\r\n"; 
        $message_part .= "Content-Disposition: attachment; filename=\"$filename\"\r\n"; 
        $message_part .= "\r\n";
        $message_part .= chunk_split(base64_encode(file_get_contents($_FILES['usr_file']['tmp_name'])));
        $message_part .= "\r\n--$boundary--\r\n";
    }
    $multipart .= $message_part;

    if ($filesize < 26214400) {
        if (mail($to, $subject, $multipart, $mailheaders)) {
            echo "Отправлено"; //Всё Ok!
        }else{
            echo "Не отправлено";
        }   
    }
    else {
        echo "Размер всех файлов превышает 25 МБ";
    }
}

?>