<?php

// Procesamiento básico y seguro de datos recibidos por POST
// Se recomienda ejecutar esto dentro de XAMPP (htdocs) para que PHP funcione.

// Función simple de saneamiento
function clean($key){
    return trim(filter_input(INPUT_POST, $key, FILTER_SANITIZE_FULL_SPECIAL_CHARS));
}

$nombre = clean('nombre') ?: 'Anonimo';
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) ?: null;
$edad = intval($_POST['edad'] ?? 0);
$energia = clean('energia');
$transporte = clean('transporte');
$separa = isset($_POST['separa']) && $_POST['separa'] === 'si';
$agua = intval($_POST['agua'] ?? 0);
$consumo = clean('consumo');

// Validaciones servidor (ejemplo mínimo)
$errors = [];
if (!$email) $errors[] = 'Email inválido.';
if ($edad < 10 || $edad > 120) $errors[] = 'Edad fuera de rango.';

if (!empty($errors)){
    // Responder errores breves
    echo 'Errores: ' . implode(' ', $errors);
    exit;
}

// Recalcular puntuación en servidor (misma lógica que en cliente)
$score = 0;
if ($energia === 'bajo') $score += 25;
elseif ($energia === 'medio') $score += 15;
elseif ($energia === 'alto') $score += 5;

if ($transporte === 'activo') $score += 25;
elseif ($transporte === 'publico') $score += 18;
elseif ($transporte === 'privado') $score += 5;

if ($separa) $score += 15;

if ($agua <= 50) $score += 20;
elseif ($agua <= 150) $score += 10;
else $score += 2;

if ($consumo === 'frecuente') $score += 15;
elseif ($consumo === 'ocasional') $score += 8;
else $score += 2;

if ($score > 100) $score = 100;

$nivel = 'Bajo';
if ($score >= 75) $nivel = 'Alto';
elseif ($score >= 45) $nivel = 'Medio';

// Respuesta simple en HTML (para mostrar en la página)
echo "<strong>$nombre</strong><br>";
echo "Puntuación: <strong>$score / 100</strong><br>";
echo "Nivel estimado: <strong>$nivel</strong><br>";
echo "Gracias por completar la evaluación.";
?>