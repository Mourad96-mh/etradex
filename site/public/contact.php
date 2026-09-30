<?php
/**
 * ETRADEX — réception du formulaire de contact (hébergement mutualisé : Hostinger, cPanel…).
 * Répond en JSON : {"ok":true} ou {"ok":false,"error":"..."}.
 * Si ce script ne tourne pas (hébergeur sans PHP), le site propose l'envoi par WhatsApp.
 */

// ── Réglages ────────────────────────────────────────────────
const TO_EMAIL   = 'eulogesewany09@gmail.com';   // destinataire des demandes
const FROM_EMAIL = 'no-reply@etradex.ma';        // doit appartenir au domaine du site
const SITE_NAME  = 'ETRADEX';
const MIN_SECONDS = 3;                            // un robot remplit le formulaire en moins de 3 s

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function reply(bool $ok, string $error = '', int $code = 200): void {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(false, 'method', 405);
}

$field = static function (string $key, int $max): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
};

// Anti-spam : pot de miel rempli ou envoi trop rapide → on fait semblant d'accepter.
if ($field('website', 200) !== '' || (int)($_POST['elapsed'] ?? 0) < MIN_SECONDS) {
    reply(true);
}

$name    = $field('name', 120);
$email   = $field('email', 160);
$phone   = $field('phone', 40);
$profile = $field('profile', 60);
$service = $field('service', 60);
$message = $field('message', 3000);
$consent = $field('consent', 5);

if ($name === '' || $message === '' || $consent !== 'yes' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(false, 'invalid', 422);
}

// Limite simple : 5 envois par heure et par adresse IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/etradex_' . md5($ip);
$hits = array_filter(
    is_file($bucket) ? (array)json_decode((string)file_get_contents($bucket), true) : [],
    static fn($t) => $t > time() - 3600
);
if (count($hits) >= 5) {
    reply(false, 'rate', 429);
}
$hits[] = time();
@file_put_contents($bucket, json_encode(array_values($hits)));

$oneLine = static fn(string $s): string => preg_replace('/[\r\n]+/', ' ', $s);

$subject = '=?UTF-8?B?' . base64_encode('[' . SITE_NAME . '] Nouvelle demande : ' . $oneLine($name)) . '?=';
$body = "Nouvelle demande reçue depuis le site " . SITE_NAME . "\n\n"
      . "Nom : {$name}\n"
      . "E-mail : {$email}\n"
      . "Téléphone : " . ($phone !== '' ? $phone : '—') . "\n"
      . "Profil : {$profile}\n"
      . "Service : " . ($service !== '' ? $service : 'autre') . "\n\n"
      . "Message :\n{$message}\n\n"
      . "— Envoyé le " . date('d/m/Y H:i') . " depuis " . ($_SERVER['HTTP_REFERER'] ?? 'le site') . "\n";

$headers = [
    'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $oneLine($name) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = @mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

$sent ? reply(true) : reply(false, 'mail', 500);
