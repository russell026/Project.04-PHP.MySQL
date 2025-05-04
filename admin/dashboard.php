<?php
session_start();
require_once '../includes/config.php';
require_once '../includes/functions.php';

// Cek jika belum login
if (!isset($_SESSION['admin_id'])) {
    header("Location: index.php");
    exit;
}

// Ambil data untuk dashboard
$postCount = 0;
$projectCount = 0;
$messageCount = 0;

$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM blog_posts");
if ($result) {
    $row = mysqli_fetch_assoc($result);
    $postCount = $row['count'];
}

$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM projects");
if ($result) {
    $row = mysqli_fetch_assoc($result);
    $projectCount = $row['count'];
}

$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM contact_messages");
if ($result) {
    $row = mysqli_fetch_assoc($result);
    $messageCount = $row['count'];
}

// Ambil pesan terbaru
$latestMessages = [];
$result = mysqli_query($conn, "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5");
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $latestMessages[] = $row;
    }
}

// Ambil post terbaru
$latestPosts = [];
$result = mysqli_query($conn, "SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT 5");
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $latestPosts[] = $row;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f5f5f5;
            display: flex;
            min-height: 100vh;
        }
        
        .sidebar {
            width: 250px;
            background-color: #2c3e50;
            color: white;
            padding: 20px 0;
            height: 100vh;
            position: fixed;
        }
        
        .sidebar-header {
            text-align: center;
            padding: 0 20px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 20px;
        }
        
        .sidebar-header h2 {
            font-size: 22px;
            margin-bottom: 5px;
        }
        
        .sidebar-header p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .sidebar-menu {
            list-style: none;
        }
        
        .sidebar-menu li {
            margin-bottom: 5px;
        }
        
        .sidebar-menu a {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .sidebar-menu a:hover, .sidebar-menu a.active {
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
        }
        
        .main-content {
            flex: 1;
            margin-left: 250px;
            padding: 30px;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 28px;
            color: #333;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-info span {
            margin-right: 15px;
            color: #666;
        }
        
        .logout-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
            background-color: #c0392b;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            padding: 20px;
            display: flex;
            align-items: center;
        }
        
        .stat-icon {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            background-color: rgba(52, 152, 219, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #3498db;
            margin-right: 15px;
        }
        
        .stat-icon.projects {
            background-color: rgba(46, 204, 113, 0.2);
            color: #2ecc71;
        }
        
        .stat-icon.messages {
            background-color: rgba(155, 89, 182, 0.2);
            color: #9b59b6;
        }
        
        .stat-info h3 {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .stat-info p {
            font-size: 24px;
            font-weight: 600;
            color: #333;
        }
        
        .recent-section {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .recent-section h2 {
            font-size: 20px;
            margin-bottom: 20px;
            color: #333;
        }
        
        .message-list, .post-list {
            list-style: none;
        }
        
        .message-item, .post-item {
            padding: 15px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .message-item:last-child, .post-item:last-child {
            border-bottom: none;
        }
        
        .message-header, .post-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .message-name, .post-title {
            font-weight: 600;
            color: #333;
        }
        
        .message-date, .post-date {
            font-size: 14px;
            color: #999;
        }
        
        .message-subject, .post-category {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .message-preview, .post-preview {
            font-size: 14px;
            color: #777;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .view-all {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #3498db;
            text-decoration: none;
        }
        
        .view-all:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 992px) {
            .sidebar {
                width: 70px;
                overflow: hidden;
            }
            
            .sidebar-header h2, .sidebar-header p {
                display: none;
            }
            
            .sidebar-menu a {
                text-align: center;
                padding: 15px 0;
            }
            
            .main-content {
                margin-left: 70px;
            }
        }
        
        @media (max-width: 576px) {
            .stats {
                grid-template-columns: 1fr;
            }
            
            .header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .user-info {
                margin-top: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>Admin Panel</h2>
            <p>Portfolio Management</p>
        </div>
        
        <ul class="sidebar-menu">
            <li><a href="dashboard.php" class="active">Dashboard</a></li>
            <li><a href="projects.php">Gallery Projects</a></li>
            <li><a href="blog.php">Blog Posts</a></li>
            <li><a href="messages.php">Contact Messages</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>
    </div>
    
    <div class="main-content">
        <div class="header">
            <h1>Dashboard</h1>
            
            <div class="user-info">
                <span>Welcome, <?php echo $_SESSION['admin_name']; ?></span>
                <a href="logout.php" class="logout-btn">Logout</a>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-icon">
                    <i>B</i>
                </div>
                <div class="stat-info">
                    <h3>Total Blog Posts</h3>
                    <p><?php echo $postCount; ?></p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon projects">
                    <i>P</i>
                </div>
                <div class="stat-info">
                    <h3>Total Projects</h3>
                    <p><?php echo $projectCount; ?></p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon messages">
                    <i>M</i>
                </div>
                <div class="stat-info">
                    <h3>Total Messages</h3>
                    <p><?php echo $messageCount; ?></p>
                </div>
            </div>
        </div>
        
        <div class="recent-section">
            <h2>Recent Messages</h2>
            
            <?php if (!empty($latestMessages)): ?>
                <ul class="message-list">
                    <?php foreach ($latestMessages as $message): ?>
                        <li class="message-item">
                            <div class="message-header">
                                <span class="message-name"><?php echo $message['name']; ?></span>
                                <span class="message-date"><?php echo formatDate($message['created_at']); ?></span>
                            </div>
                            <div class="message-subject"><?php echo $message['subject']; ?></div>
                            <div class="message-preview"><?php echo substr($message['message'], 0, 100); ?>...</div>
                        </li>
                    <?php endforeach; ?>
                </ul>
                
                <a href="messages.php" class="view-all">View All Messages</a>
            <?php else: ?>
                <p>No messages yet.</p>
            <?php endif; ?>
        </div>
        
        <div class="recent-section">
            <h2>Recent Blog Posts</h2>
            
            <?php if (!empty($latestPosts)): ?>
                <ul class="post-list">
                    <?php foreach ($latestPosts as $post): ?>
                        <li class="post-item">
                            <div class="post-header">
                                <span class="post-title"><?php echo $post['title']; ?></span>
                                <span class="post-date"><?php echo formatDate($post['created_at']); ?></span>
                            </div>
                            <div class="post-category">Category: <?php echo ucfirst($post['category']); ?></div>
                            <div class="post-preview"><?php echo substr(strip_tags($post['content']), 0, 100); ?>...</div>
                        </li>
                    <?php endforeach; ?>
                </ul>
                
                <a href="blog.php" class="view-all">View All Posts</a>
            <?php else: ?>
                <p>No blog posts yet.</p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>