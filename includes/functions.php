<?php
require_once 'config.php';

// Fungsi untuk membersihkan input
function clean($data) {
    global $conn;
    
    if (!$conn) {
        die("Database connection failed.");
    }
    
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return mysqli_real_escape_string($conn, $data);
}

// Fungsi untuk mendapatkan semua proyek
function getProjects($category = '', $limit = 0) {
    global $conn;

    if (!$conn) {
        die("Database connection failed.");
    }

    $sql = "SELECT * FROM projects";
    
    if (!empty($category) && $category != 'all') {
        $sql .= " WHERE category = '" . clean($category) . "'";
    }

    $sql .= " ORDER BY created_at DESC";
    
    if ($limit > 0) {
        $sql .= " LIMIT " . (int)$limit;
    }
    
    $result = mysqli_query($conn, $sql);
    
    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    $projects = [];
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $projects[] = $row;
        }
    }
    
    return $projects;
}

// Fungsi untuk mendapatkan proyek berdasarkan ID
function getProject($id) {
    global $conn;
    
    if (!$conn) {
        die("Database connection failed.");
    }
    
    $sql = "SELECT * FROM projects WHERE id = " . (int)$id;
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    if (mysqli_num_rows($result) > 0) {
        return mysqli_fetch_assoc($result);
    }

    return null;
}

// Fungsi untuk mendapatkan semua blog post
function getBlogPosts($category = '', $limit = 0) {
    global $conn;

    if (!$conn) {
        die("Database connection failed.");
    }

    $sql = "SELECT * FROM blog_posts";
    
    if (!empty($category) && $category != 'all') {
        $sql .= " WHERE category = '" . clean($category) . "'";
    }

    $sql .= " ORDER BY created_at DESC";
    
    if ($limit > 0) {
        $sql .= " LIMIT " . (int)$limit;
    }
    
    $result = mysqli_query($conn, $sql);
    
    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    $posts = [];
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $posts[] = $row;
        }
    }
    
    return $posts;
}

// Fungsi untuk mendapatkan blog post berdasarkan ID
function getBlogPost($id) {
    global $conn;
    
    if (!$conn) {
        die("Database connection failed.");
    }
    
    $sql = "SELECT * FROM blog_posts WHERE id = " . (int)$id;
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    if (mysqli_num_rows($result) > 0) {
        return mysqli_fetch_assoc($result);
    }

    return null;
}

// Fungsi untuk menyimpan pesan kontak
function saveContactMessage($name, $email, $subject, $message) {
    global $conn;
    
    if (!$conn) {
        die("Database connection failed.");
    }

    $name = clean($name);
    $email = clean($email);
    $subject = clean($subject);
    $message = clean($message);
    
    $sql = "INSERT INTO contact_messages (name, email, subject, message) 
            VALUES ('$name', '$email', '$subject', '$message')";
    
    if (mysqli_query($conn, $sql)) {
        return true;
    }

    return false;
}

// Fungsi untuk memformat tanggal
function formatDate($date) {
    $timestamp = strtotime($date);
    return date('d F Y', $timestamp);
}

?>

// Function to get a blog post by ID
function getBlogPost($id) {
    global $conn;
    
    if (!$conn) {
        die("Database connection failed.");
    }
    
    $id = (int)$id; // Ensure ID is an integer for security
    
    $sql = "SELECT * FROM blog_posts WHERE id = $id";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    if (mysqli_num_rows($result) > 0) {
        return mysqli_fetch_assoc($result);
    }

    return null;
}