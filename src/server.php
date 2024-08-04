<?php 
$_POST = json_decode(file_get_contents("php://input"), true); // Это не нужно если отправляем FormData в базовом формате
echo var_dump($_POST);