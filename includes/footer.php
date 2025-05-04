<footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h2>My Portfolio</h2>
                    <p>&copy; <?php echo date('Y'); ?> Hak Cipta Dilindungi</p>
                </div>
                <div class="footer-links">
                    <h3>Link Cepat</h3>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="gallery.php">Gallery</a></li>
                        <li><a href="blog.php">Blog</a></li>
                        <li><a href="contact.php">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h3>Media Sosial</h3>
                    <div class="social-icons">
                        <a href="#" class="social-icon" aria-label="GitHub">
                            <i class="github-icon">GitHub</i>
                        </a>
                        <a href="#" class="social-icon" aria-label="LinkedIn">
                            <i class="linkedin-icon">LinkedIn</i>
                        </a>
                        <a href="https://www.instagram.com/raselimanuel" class="social-icon" aria-label="Instagram">
                            <i class="instagram-icon">Instagram</i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <button id="scroll-to-top" aria-label="Scroll to Top">↑</button>

    <script src="assets/js/main.js"></script>
    <?php if (isset($extraJs)): ?>
        <?php foreach ($extraJs as $js): ?>
            <script src="assets/js/<?php echo $js; ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>