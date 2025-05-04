<?php
$pageTitle = 'Home - Portfolio Russell Imanuel Ruru';
$extraCss = [];
$extraJs = ['particles.js'];

// Ambil 3 proyek terbaru
include_once 'includes/config.php';
include_once 'includes/functions.php';
$latestProjects = getProjects('', 3);

// Ambil 2 artikel blog terbaru
$latestPosts = getBlogPosts('', 2);

include_once 'includes/header.php';
?>

<section class="hero">
    <div class="hero-content">
        <div class="profile-photo">
            <div class="photo-container">
                <img src="assets/images/profile/profile.jpg" alt="Foto Profil" id="profile-img">
            </div>
        </div>
        <div class="hero-text">
            <h2>Selamat Datang di Portfolio Saya</h2>
            <h3 id="typing-text"></h3>
            <p>Saya Russell Imanuel Ruru, mahasiswa Teknik Informatika yang bersemangat dalam pengembangan web dan teknologi.</p>
            <div class="cta-buttons">
                <a href="contact.php" class="btn-primary">Hubungi Saya</a>
                <a href="gallery.php" class="btn-secondary">Lihat Karya</a>
            </div>
        </div>
    </div>
</section>

<section class="about" id="about">
    <div class="container">
        <h2 class="section-title">Tentang Saya</h2>
        <div class="about-content">
            <div class="about-text">
                <p>Saya adalah mahasiswa Teknik Informatika dengan minat utama di bidang pengembangan web dan aplikasi. Saya memiliki pengalaman dengan HTML, CSS, JavaScript, PHP, dan berbagai teknologi lainnya.</p>
                <p>Melalui portfolio ini, saya ingin menunjukkan karya-karya yang telah saya buat serta berbagi pengetahuan melalui blog.</p>
                
                <h3>Skills</h3>
                <div class="skills">
                    <div class="skill">
                        <span>HTML</span>
                        <div class="skill-bar"><div class="skill-level" data-level="90"></div></div>
                    </div>
                    <div class="skill">
                        <span>CSS</span>
                        <div class="skill-bar"><div class="skill-level" data-level="85"></div></div>
                    </div>
                    <div class="skill">
                        <span>JavaScript</span>
                        <div class="skill-bar"><div class="skill-level" data-level="75"></div></div>
                    </div>
                    <div class="skill">
                        <span>PHP & MySQL</span>
                        <div class="skill-bar"><div class="skill-level" data-level="80"></div></div>
                    </div>
                    <div class="skill">
                        <span>UI/UX Design</span>
                        <div class="skill-bar"><div class="skill-level" data-level="70"></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="featured-projects">
    <div class="container">
        <h2 class="section-title">Proyek Terbaru</h2>
        <div class="project-cards">
            <?php if (!empty($latestProjects)): ?>
                <?php foreach ($latestProjects as $index => $project): ?>
                    <div class="card" data-aos="fade-up" data-aos-delay="<?php echo $index * 200; ?>">
                        <div class="card-img">
                            <img src="assets/images/gallery/<?php echo $project['image']; ?>" alt="<?php echo $project['title']; ?>">
                        </div>
                        <div class="card-content">
                            <h3><?php echo $project['title']; ?></h3>
                            <p><?php echo $project['description']; ?></p>
                            <a href="gallery.php" class="read-more">Selengkapnya</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="no-projects">Belum ada proyek yang ditambahkan.</p>
            <?php endif; ?>
        </div>
    </div>
</section>

<section class="blog-preview">
    <div class="container">
        <h2 class="section-title">Artikel Terbaru</h2>
        <div class="blog-cards">
            <?php if (!empty($latestPosts)): ?>
                <?php foreach ($latestPosts as $post): ?>
                    <div class="blog-card">
                        <div class="blog-img">
                            <img src="assets/images/blog/<?php echo $post['image']; ?>" alt="<?php echo $post['title']; ?>">
                        </div>
                        <div class="blog-content">
                            <h3><?php echo $post['title']; ?></h3>
                            <p class="date"><?php echo formatDate($post['created_at']); ?></p>
                            <p class="excerpt"><?php echo substr(strip_tags($post['content']), 0, 150); ?>...</p>
                            <a href="post.php?id=<?php echo $post['id']; ?>" class="read-more">Baca Selengkapnya</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="no-posts">Belum ada artikel yang ditambahkan.</p>
            <?php endif; ?>
        </div>
        <div class="center-btn">
            <a href="blog.php" class="btn-primary">Lihat Semua Artikel</a>
        </div>
    </div>
</section>

<?php
include_once 'includes/footer.php';
?>