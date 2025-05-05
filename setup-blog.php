<?php
// This script adds blog posts to the database and ensures directory structure exists

// Include config and blog posts
require_once 'includes/config.php';
include_once 'blog-posts-data.php'; // Make sure to create this file with the blog posts array

// Check if blog_posts table exists
$checkTable = mysqli_query($conn, "SHOW TABLES LIKE 'blog_posts'");
if (mysqli_num_rows($checkTable) == 0) {
    // Create blog_posts table if it doesn't exist
    $sql_blog_posts = "CREATE TABLE IF NOT EXISTS `blog_posts` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `content` TEXT NOT NULL,
        `image` VARCHAR(255) NOT NULL,
        `category` VARCHAR(50) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (mysqli_query($conn, $sql_blog_posts)) {
        echo "Table 'blog_posts' created successfully.<br>";
    } else {
        echo "Error creating 'blog_posts' table: " . mysqli_error($conn) . "<br>";
    }
}

// Create directory structure for blog images if it doesn't exist
$blogImagesDir = 'assets/images/blog';
if (!file_exists($blogImagesDir)) {
    if (mkdir($blogImagesDir, 0755, true)) {
        echo "Blog images directory created successfully.<br>";
    } else {
        echo "Error creating blog images directory.<br>";
    }
}

// Check if there are already blog posts in the database
$checkPosts = mysqli_query($conn, "SELECT COUNT(*) as count FROM blog_posts");
$postsCount = mysqli_fetch_assoc($checkPosts)['count'];

if ($postsCount > 0) {
    echo "Blog posts already exist in the database. Skipping import.<br>";
} else {
    // Add blog posts to database
    foreach ($posts as $post) {
        $title = mysqli_real_escape_string($conn, $post['title']);
        $content = mysqli_real_escape_string($conn, $post['content']);
        $image = mysqli_real_escape_string($conn, $post['image']);
        $category = mysqli_real_escape_string($conn, $post['category']);
        
        $sql = "INSERT INTO blog_posts (title, content, image, category) 
                VALUES ('$title', '$content', '$image', '$category')";
        
        if (mysqli_query($conn, $sql)) {
            echo "Blog post '$title' added successfully.<br>";
        } else {
            echo "Error adding blog post '$title': " . mysqli_error($conn) . "<br>";
        }
    }
}

// Create placeholder blog images
$placeholderImages = [
    'javascript-frameworks.jpg',
    'ui-ux-trends.jpg',
    'web-security.jpg',
    'ai-web-dev.jpg'
];

foreach ($placeholderImages as $imageName) {
    $imagePath = "$blogImagesDir/$imageName";
    
    if (!file_exists($imagePath)) {
        // Create a simple colored rectangle as placeholder
        $image = imagecreatetruecolor(800, 500);
        
        // Generate a random color based on image name
        $hash = md5($imageName);
        $r = hexdec(substr($hash, 0, 2));
        $g = hexdec(substr($hash, 2, 2));
        $b = hexdec(substr($hash, 4, 2));
        
        $color = imagecolorallocate($image, $r, $g, $b);
        imagefill($image, 0, 0, $color);
        
        // Add text to image
        $white = imagecolorallocate($image, 255, 255, 255);
        $text = substr($imageName, 0, -4); // Remove file extension
        $text = str_replace('-', ' ', $text); // Replace dashes with spaces
        $text = ucwords($text); // Capitalize each word
        
        // Calculate text position for center
        $font = 5; // Built-in font
        $textWidth = imagefontwidth($font) * strlen($text);
        $textHeight = imagefontheight($font);
        $x = (800 - $textWidth) / 2;
        $y = (500 - $textHeight) / 2;
        
        imagestring($image, $font, $x, $y, $text, $white);
        
        // Save the image
        imagejpeg($image, $imagePath);
        imagedestroy($image);
        
        echo "Created placeholder image: $imageName<br>";
    }
}

echo "<br><strong>Blog setup complete!</strong> <a href='blog.php'>View Blog</a>";
?>