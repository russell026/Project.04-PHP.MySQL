<?php
include_once 'includes/config.php';
include_once 'includes/functions.php';

// Get post ID from URL parameter
$postId = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Get post data
$post = getBlogPost($postId);

// If post not found, redirect to blog page
if (!$post) {
    header('Location: blog.php');
    exit;
}

$pageTitle = $post['title'] . ' - Portfolio Russell Imanuel Ruru';
$extraCss = ['blog.css'];
$extraJs = ['blog.js'];

// Get previous and next posts
$prevPost = null;
$nextPost = null;

$sql = "SELECT id, title FROM blog_posts WHERE id < $postId ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn, $sql);
if ($result && mysqli_num_rows($result) > 0) {
    $prevPost = mysqli_fetch_assoc($result);
}

$sql = "SELECT id, title FROM blog_posts WHERE id > $postId ORDER BY id ASC LIMIT 1";
$result = mysqli_query($conn, $sql);
if ($result && mysqli_num_rows($result) > 0) {
    $nextPost = mysqli_fetch_assoc($result);
}

include_once 'includes/header.php';
?>

<section class="blog-post-page">
    <div class="container">
        <article class="blog-post-article">
            <div class="blog-post-header">
                <h1><?php echo $post['title']; ?></h1>
                <div class="blog-post-meta">
                    <span class="post-date"><?php echo formatDate($post['created_at']); ?></span>
                    <span class="post-category"><?php 
                        switch($post['category']) {
                            case 'web':
                                echo 'Web Development';
                                break;
                            case 'ui':
                                echo 'UI/UX Design';
                                break;
                            case 'tech':
                                echo 'Teknologi';
                                break;
                            default:
                                echo ucfirst($post['category']);
                        }
                    ?></span>
                    <span class="post-author">Oleh: Russell Imanuel Ruru</span>
                </div>
            </div>
            
            <div class="blog-post-image">
                <img src="assets/images/blog/<?php echo $post['image']; ?>" alt="<?php echo $post['title']; ?>">
            </div>
            
            <div class="blog-post-body">
                <?php echo $post['content']; ?>
                
                <div class="blog-post-tags">
                    <?php
                    $tags = explode(',', $post['category']);
                    foreach ($tags as $tag) {
                        echo '<a href="blog.php?category=' . trim($tag) . '" class="blog-post-tag">' . ucfirst(trim($tag)) . '</a>';
                    }
                    ?>
                </div>
                
                <div class="blog-post-navigation">
                    <div class="post-nav-link prev-post">
                        <?php if ($prevPost): ?>
                            <span class="post-nav-label">&laquo; Post Sebelumnya</span>
                            <a href="post.php?id=<?php echo $prevPost['id']; ?>"><?php echo $prevPost['title']; ?></a>
                        <?php endif; ?>
                    </div>
                    <div class="post-nav-link next-post">
                        <?php if ($nextPost): ?>
                            <span class="post-nav-label">Post Selanjutnya &raquo;</span>
                            <a href="post.php?id=<?php echo $nextPost['id']; ?>"><?php echo $nextPost['title']; ?></a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </article>
        
        <div class="related-posts">
            <h2>Artikel Terkait</h2>
            <div class="related-posts-grid">
                <?php
                // Get related posts by category
                $relatedPosts = [];
                $category = $post['category'];
                $sql = "SELECT id, title, image, created_at FROM blog_posts 
                        WHERE category = '$category' AND id != $postId 
                        ORDER BY created_at DESC LIMIT 3";
                $result = mysqli_query($conn, $sql);
                
                if ($result && mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $relatedPosts[] = $row;
                    }
                }
                
                // If not enough related posts by category, get posts by newest
                if (count($relatedPosts) < 3) {
                    $limit = 3 - count($relatedPosts);
                    $sql = "SELECT id, title, image, created_at FROM blog_posts 
                            WHERE id != $postId AND category != '$category' 
                            ORDER BY created_at DESC LIMIT $limit";
                    $result = mysqli_query($conn, $sql);
                    
                    if ($result && mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            $relatedPosts[] = $row;
                        }
                    }
                }
                
                // Display related posts
                foreach ($relatedPosts as $relatedPost):
                ?>
                <div class="related-post">
                    <a href="post.php?id=<?php echo $relatedPost['id']; ?>">
                        <div class="related-post-img">
                            <img src="assets/images/blog/<?php echo $relatedPost['image']; ?>" alt="<?php echo $relatedPost['title']; ?>">
                        </div>
                        <div class="related-post-content">
                            <h3><?php echo $relatedPost['title']; ?></h3>
                            <span class="related-post-date"><?php echo formatDate($relatedPost['created_at']); ?></span>
                        </div>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<?php
include_once 'includes/footer.php';
?>