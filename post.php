<?php
include_once 'includes/config.php';
include_once 'includes/functions.php';

// Mendapatkan ID post dari parameter URL
$postId = isset($_GET['id']) ? $_GET['id'] : 0;

// Mendapatkan data post
$post = getBlogPost($postId);

// Redirect jika post tidak ditemukan
if (!$post) {
    header('Location: blog.php');
    exit;
}

$pageTitle = $post['title'] . ' - Portfolio Russell Imanuel Ruru';
$extraCss = ['blog.css'];
$extraJs = ['blog.js'];

// Mendapatkan post sebelumnya dan selanjutnya
$prevPost = null;
$nextPost = null;

$sql = "SELECT id, title FROM blog_posts WHERE id < $postId ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $prevPost = mysqli_fetch_assoc($result);
}

$sql = "SELECT id, title FROM blog_posts WHERE id > $postId ORDER BY id ASC LIMIT 1";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
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
    </div>
</section>

<?php
include_once 'includes/footer.php';
?>