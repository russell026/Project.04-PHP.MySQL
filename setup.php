<?php
/*
 * setup.php - Script untuk menginisialisasi database portfolio_db
 * 
 * Script ini berdiri sendiri dan tidak bergantung pada config.php
 */

// Konfigurasi database
$host = "localhost";
$username = "root";
$password = "";
$database = "portfolio_db";

// Membuat koneksi ke MySQL server (tanpa memilih database)
$conn = mysqli_connect($host, $username, $password);

// Memeriksa koneksi
if (!$conn) {
    die("Koneksi ke MySQL server gagal: " . mysqli_connect_error());
}

// Membuat database jika belum ada
$sql_create_db = "CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if (mysqli_query($conn, $sql_create_db)) {
    echo "Database '$database' siap digunakan.<br>";
} else {
    die("Error membuat database: " . mysqli_error($conn) . "<br>");
}

// Memilih database untuk digunakan
if (!mysqli_select_db($conn, $database)) {
    die("Error memilih database: " . mysqli_error($conn) . "<br>");
}

// Membuat tabel users
$sql_users = "CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `profile_image` VARCHAR(255) DEFAULT 'profile.jpg',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (mysqli_query($conn, $sql_users)) {
    echo "Tabel 'users' siap digunakan.<br>";
} else {
    echo "Error membuat tabel users: " . mysqli_error($conn) . "<br>";
}

// Membuat tabel projects
$sql_projects = "CREATE TABLE IF NOT EXISTS `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (mysqli_query($conn, $sql_projects)) {
    echo "Tabel 'projects' siap digunakan.<br>";
} else {
    echo "Error membuat tabel projects: " . mysqli_error($conn) . "<br>";
}

// Membuat tabel blog_posts
$sql_blog_posts = "CREATE TABLE IF NOT EXISTS `blog_posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (mysqli_query($conn, $sql_blog_posts)) {
    echo "Tabel 'blog_posts' siap digunakan.<br>";
} else {
    echo "Error membuat tabel blog_posts: " . mysqli_error($conn) . "<br>";
}

// Memeriksa apakah admin user sudah ada
$check_admin = "SELECT id FROM users WHERE username = 'admin'";
$admin_result = mysqli_query($conn, $check_admin);

if ($admin_result && mysqli_num_rows($admin_result) == 0) {
    // Admin user belum ada, buat user baru
    $admin_username = 'admin';
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    $admin_name = 'Russell Imanuel Ruru';
    $admin_email = 'russellruru026@student.unsrat.ac.id';
    $profile_image = 'profile.jpg';
    
    $sql_admin = "INSERT INTO users (username, password, name, email, profile_image) 
                  VALUES (?, ?, ?, ?, ?)";
    
    $stmt = mysqli_prepare($conn, $sql_admin);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sssss", $admin_username, $admin_password, $admin_name, $admin_email, $profile_image);
        
        if (mysqli_stmt_execute($stmt)) {
            echo "Admin user berhasil dibuat.<br>";
        } else {
            echo "Error membuat admin user: " . mysqli_stmt_error($stmt) . "<br>";
        }
        
        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing statement: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "Admin user sudah ada.<br>";
}

// Memeriksa apakah proyek sudah ada
$check_projects = "SELECT id FROM projects LIMIT 1";
$projects_result = mysqli_query($conn, $check_projects);

if ($projects_result && mysqli_num_rows($projects_result) == 0) {
    // Tambahkan proyek sampel
    $projects = [
        [
            'title' => 'Website Portofolio',
            'description' => 'Desain dan pengembangan website portofolio personal dengan HTML, CSS, dan JavaScript.',
            'image' => 'img1.jpg',
            'category' => 'web'
        ],
        [
            'title' => 'Aplikasi Todo List',
            'description' => 'Aplikasi manajemen tugas sederhana dengan fitur drag and drop untuk mengatur prioritas.',
            'image' => 'img2.jpg',
            'category' => 'web'
        ],
        [
            'title' => 'Game Sederhana',
            'description' => 'Game berbasis web sederhana menggunakan JavaScript dan Canvas API.',
            'image' => 'img3.jpg',
            'category' => 'web'
        ]
    ];
    
    $sql_project = "INSERT INTO projects (title, description, image, category) VALUES (?, ?, ?, ?)";
    
    $stmt = mysqli_prepare($conn, $sql_project);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssss", $title, $description, $image, $category);
        
        foreach ($projects as $project) {
            $title = $project['title'];
            $description = $project['description'];
            $image = $project['image'];
            $category = $project['category'];
            
            if (mysqli_stmt_execute($stmt)) {
                echo "Proyek '$title' berhasil ditambahkan.<br>";
            } else {
                echo "Error menambahkan proyek: " . mysqli_stmt_error($stmt) . "<br>";
            }
        }
        
        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing statement: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "Data proyek sudah ada.<br>";
}

// Memeriksa apakah artikel blog sudah ada
$check_posts = "SELECT id FROM blog_posts LIMIT 1";
$posts_result = mysqli_query($conn, $check_posts);

if ($posts_result && mysqli_num_rows($posts_result) == 0) {
    // Tambahkan artikel blog sampel
    $posts = [
        [
            'title' => 'Mengenal Teknologi Web Modern',
            'content' => '<p>Perkembangan teknologi web saat ini sangat pesat, dengan berbagai framework dan library yang mempermudah pengembangan. Artikel ini akan membahas beberapa teknologi web modern yang populer saat ini dan bagaimana teknologi-teknologi tersebut mempengaruhi cara kita membangun aplikasi web.</p>
<h2>HTML5 dan CSS3: Fondasi Web Modern</h2>
<p>HTML5 dan CSS3 adalah standar terbaru untuk pembangunan web. HTML5 menambahkan banyak fitur baru seperti elemen semantik, audio dan video tanpa plugin, canvas untuk grafis, dan banyak API JavaScript baru. CSS3 membawa kemampuan styling yang lebih canggih seperti animasi, transformasi, gradien, dan grid layout.</p>
<p>Dengan HTML5 dan CSS3, pengembang web dapat membuat desain yang lebih responsif dan interaktif tanpa harus mengandalkan JavaScript secara berlebihan. Hal ini membuat web lebih cepat, lebih mudah diakses, dan lebih ramah mesin pencari.</p>',
            'image' => 'post1.jpg',
            'category' => 'web'
        ],
        [
            'title' => 'Dasar-dasar UI/UX Design',
            'content' => '<p>Desain antarmuka pengguna yang baik adalah kunci dalam membuat aplikasi yang mudah digunakan. Artikel ini akan membahas prinsip-prinsip dasar UI/UX design yang penting untuk dipahami.</p>
<h2>Apa itu UI/UX Design?</h2>
<p>UI (User Interface) Design adalah proses pembuatan antarmuka visual untuk aplikasi, sedangkan UX (User Experience) Design berfokus pada pengalaman keseluruhan pengguna saat berinteraksi dengan aplikasi. Keduanya sangat penting untuk menciptakan produk digital yang sukses.</p>
<h2>Prinsip-prinsip Dasar UI/UX Design</h2>
<p>Beberapa prinsip dasar dalam UI/UX design meliputi kesederhanaan, konsistensi, umpan balik yang jelas, dan user-centered design. Dengan memahami prinsip-prinsip ini, kita dapat membuat desain yang tidak hanya menarik secara visual tetapi juga fungsional dan mudah digunakan.</p>',
            'image' => 'post2.jpg',
            'category' => 'ui'
        ],
        [
            'title' => 'Artificial Intelligence dalam Kehidupan Sehari-hari',
            'content' => '<p>Artificial Intelligence (AI) saat ini semakin menjadi bagian integral dari kehidupan sehari-hari kita. Teknologi yang dulunya hanya ada dalam novel dan film fiksi ilmiah, kini hadir dalam perangkat yang kita gunakan setiap hari, dari smartphone hingga peralatan rumah tangga.</p>
<h2>Asisten Virtual dan Smart Home</h2>
<p>Salah satu penerapan AI yang paling terlihat adalah asisten virtual seperti Siri, Google Assistant, dan Alexa. Asisten ini menggunakan natural language processing (NLP) untuk memahami perintah suara, menjawab pertanyaan, dan mengontrol perangkat lain.</p>
<h2>Rekomendasi Konten dan Personalisasi</h2>
<p>Algoritma pembelajaran mesin (machine learning) memungkinkan platform seperti Netflix, Spotify, dan YouTube untuk merekomendasikan konten yang sesuai dengan preferensi kita. Mereka menganalisis pola konsumsi konten, rating, dan berbagai data lain untuk memprediksi apa yang mungkin kita sukai.</p>',
            'image' => 'post3.jpg',
            'category' => 'tech'
        ]
    ];
    
    $sql_post = "INSERT INTO blog_posts (title, content, image, category) VALUES (?, ?, ?, ?)";
    
    $stmt = mysqli_prepare($conn, $sql_post);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssss", $title, $content, $image, $category);
        
        foreach ($posts as $post) {
            $title = $post['title'];
            $content = $post['content'];
            $image = $post['image'];
            $category = $post['category'];
            
            if (mysqli_stmt_execute($stmt)) {
                echo "Artikel blog '$title' berhasil ditambahkan.<br>";
            } else {
                echo "Error menambahkan artikel blog: " . mysqli_stmt_error($stmt) . "<br>";
            }
        }
        
        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing statement: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "Data artikel blog sudah ada.<br>";
}

echo "<br><div style='padding: 10px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 5px;'>";
echo "<strong>Setup selesai!</strong> Sekarang Anda dapat <a href='index.php'>mengakses website</a> atau <a href='admin/index.php'>masuk ke panel admin</a> dengan username 'admin' dan password 'admin123'.";
echo "</div>";

// Tutup koneksi database
mysqli_close($conn);
?>