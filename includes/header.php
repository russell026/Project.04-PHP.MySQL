<?php
require_once 'includes/config.php';
require_once 'includes/functions.php';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : 'Portfolio Russell Imanuel Ruru'; ?></title>
    <link rel="stylesheet" href="assets/css/style.css">
    <?php if (isset($extraCss)): ?>
        <?php foreach ($extraCss as $css): ?>
            <link rel="stylesheet" href="assets/css/<?php echo $css; ?>">
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>My Portfolio</h1>
            </div>
            <nav id="navbar">
                <ul>
                    <li><a href="index.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'class="active"' : ''; ?>>Home</a></li>
                    <li><a href="gallery.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'gallery.php') ? 'class="active"' : ''; ?>>Gallery</a></li>
                    <li><a href="blog.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'blog.php' || basename($_SERVER['PHP_SELF']) == 'post.php') ? 'class="active"' : ''; ?>>Blog</a></li>
                    <li><a href="contact.php" <?php echo (basename($_SERVER['PHP_SELF']) == 'contact.php') ? 'class="active"' : ''; ?>>Contact</a></li>
                </ul>
            </nav>
            <div class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>