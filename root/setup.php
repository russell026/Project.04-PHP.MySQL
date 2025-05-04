<?php
require_once 'includes/config.php';

// Membuat admin user
$admin_username = 'admin';
$admin_password = password_hash('admin123', PASSWORD_DEFAULT);
$admin_name = 'Russell Imanuel Ruru';
$admin_email = 'russellruru026@student.unsrat.ac.id';

$sql = "INSERT INTO users (username, password, name, email, profile_image) 
        VALUES ('$admin_username', '$admin_password', '$admin_name', '$admin_email', 'profile.jpg')";

if (mysqli_query($conn, $sql)) {
    echo "Admin user berhasil dibuat.<br>";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn) . "<br>";
}

// Menambahkan contoh proyek
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

foreach ($projects as $project) {
    $title = $project['title'];
    $description = $project['description'];
    $image = $project['image'];
    $category = $project['category'];
    
    $sql = "INSERT INTO projects (title, description, image, category) 
            VALUES ('$title', '$description', '$image', '$category')";
    
    if (mysqli_query($conn, $sql)) {
        echo "Proyek '$title' berhasil ditambahkan.<br>";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn) . "<br>";
    }
}

// Menambahkan contoh artikel blog
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

foreach ($posts as $post) {
    $title = mysqli_real_escape_string($conn, $post['title']);
    $content = mysqli_real_escape_string($conn, $post['content']);
    $image = $post['image'];
    $category = $post['category'];
    
    $sql = "INSERT INTO blog_posts (title, content, image, category) 
            VALUES ('$title', '$content', '$image', '$category')";
    
    if (mysqli_query($conn, $sql)) {
        echo "Artikel blog '$title' berhasil ditambahkan.<br>";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn) . "<br>";
    }
}

echo "<br><strong>Setup selesai!</strong> Sekarang Anda dapat <a href='index.php'>mengakses website</a> atau <a href='admin/index.php'>masuk ke panel admin</a> dengan username 'admin' dan password 'admin123'.";
?>