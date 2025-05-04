<?php
$pageTitle = 'Blog - Portfolio Russell Imanuel Ruru';
$extraCss = ['blog.css'];
$extraJs = ['blog.js', 'particles.js'];

include_once 'includes/config.php';
include_once 'includes/functions.php';

// Mendapatkan kategori filter
$category = isset($_GET['category']) ? $_GET['category'] : 'all';

// Mendapatkan semua blog post
$posts = getBlogPosts($category);

include_once 'includes/header.php';
?>

<section class="blog-hero">
    <div class="container">
        <h1>Blog</h1>
        <p>Berbagi pengetahuan dan pengalaman seputar teknologi dan pengembangan web</p>
    </div>
</section>

<section class="blog-search">
    <div class="container">
        <div class="search-container">
            <input type="text" id="blog-search" placeholder="Cari artikel...">
            <button id="search-btn">Cari</button>
        </div>
        <div class="blog-categories">
            <button class="category-btn <?php echo ($category == 'all') ? 'active' : ''; ?>" data-category="all">Semua</button>
            <button class="category-btn <?php echo ($category == 'web') ? 'active' : ''; ?>" data-category="web">Web Development</button>
            <button class="category-btn <?php echo ($category == 'ui') ? 'active' : ''; ?>" data-category="ui">UI/UX Design</button>
            <button class="category-btn <?php echo ($category == 'tech') ? 'active' : ''; ?>" data-category="tech">Teknologi</button>
        </div>
    </div>
</section>

<section class="blog-content">
    <div class="container">
        <div class="blog-grid">
            <?php if (!empty($posts)): ?>
                <?php foreach ($posts as $post): ?>
                    <article class="blog-post" data-category="<?php echo $post['category']; ?>">
                        <div class="blog-image">
                            <img src="assets/images/blog/<?php echo $post['image']; ?>" alt="<?php echo $post['title']; ?>">
                        </div>
                        <div class="blog-post-content">
                            <div class="post-meta">
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
                            </div>
                            <h2><a href="post.php?id=<?php echo $post['id']; ?>"><?php echo $post['title']; ?></a></h2>
                            <p class="post-excerpt"><?php echo substr(strip_tags($post['content']), 0, 150); ?>...</p>
                            <a href="post.php?id=<?php echo $post['id']; ?>" class="read-more-btn">Baca Selengkapnya</a>
                        </div>
                    </article>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="no-posts">Belum ada artikel yang ditambahkan.</p>
            <?php endif; ?>
        </div>

        <div id="no-results" class="no-results" style="display: none;">
            <h3>Tidak ada artikel yang ditemukan</h3>
            <p>Coba gunakan kata kunci lain atau pilih kategori yang berbeda</p>
        </div>
        
        <?php if (count($posts) > 4): ?>
            <div class="pagination">
                <button class="pagination-btn prev" disabled>&laquo; Sebelumnya</button>
                <div class="page-numbers">
                    <button class="page-number active">1</button>
                    <button class="page-number">2</button>
                </div>
                <button class="pagination-btn next">Selanjutnya &raquo;</button>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php
include_once 'includes/footer.php';
?>