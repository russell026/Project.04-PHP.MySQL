<?php
// Informasi koneksi database
$host = "localhost";
$username = "root";
$password = "";
$database = "portfolio_db";

// Membuat koneksi
$conn = mysqli_connect($host, $username, $password, $database);

// Memeriksa koneksi
if (!$conn) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

// Set karakter set ke UTF-8
mysqli_set_charset($conn, "utf8");

// Tampilkan pesan untuk memverifikasi script dijalankan
echo "Config file loaded successfully.";
?>
