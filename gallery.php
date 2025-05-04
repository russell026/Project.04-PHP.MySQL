<?php
$pageTitle = 'Gallery - Portfolio Russell Imanuel Ruru';
$extraCss = ['gallery.css'];
$extraJs = ['gallery.js', 'particles.js'];

include_once 'includes/config.php';
include_once 'includes/functions.php';

// Mendapatkan kategori filter
$category = isset($_GET['category']) ? $_GET['category'] : 'all';

// Mendapatkan semua proyek
$projects = getProjects($category);

include_once 'includes/header.php';
?>

<section class="gallery-hero">
    <div class="container">
        <h1>Gallery</h1>
        <p>Kumpulan karya dan proyek yang telah saya kerjakan</p>
    </div>
</section>

<section class="gallery-filters">
    <div class="container">
        <div class="filter-buttons">
            <button class="filter-btn <?php echo ($category == 'all') ? 'active' : ''; ?>" data-filter="all">Semua</button>
            <button class="filter-btn <?php echo ($category == 'web') ? 'active' : ''; ?>" data-filter="web">Web Design</button>
            <button class="filter-btn <?php echo ($category == 'ui') ? 'active' : ''; ?>" data-filter="ui">UI/UX</button>
            <button class="filter-btn <?php echo ($category == 'graphic') ? 'active' : ''; ?>" data-filter="graphic">Graphic Design</button>
        </div>
    </div>
</section>

<section class="gallery-container">
    <div class="container">
        <div class="gallery-grid">
            <?php if (!empty($projects)): ?>
                <?php foreach ($projects as $project): ?>
                    <div class="gallery-item" data-category="<?php echo $project['category']; ?>">
                        <div class="gallery-img">
                            <img src="assets/images/gallery/<?php echo $project['image']; ?>" alt="<?php echo $project['title']; ?>">
                            <div class="gallery-overlay">
                                <h3><?php echo $project['title']; ?></h3>
                                <p><?php echo $project['category']; ?></p>
                                <button class="view-btn" data-image="assets/images/gallery/<?php echo $project['image']; ?>" data-title="<?php echo $project['title']; ?>" data-desc="<?php echo $project['description']; ?>">View</button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="no-projects">Belum ada proyek yang ditambahkan.</p>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Modal for image preview -->
<div id="image-modal" class="modal">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img id="modal-image" src="" alt="Project Preview">
        <div class="modal-info">
            <h2 id="modal-title"></h2>
            <p id="modal-desc"></p>
        </div>
    </div>
</div>

<?php
include_once 'includes/footer.php';
?>