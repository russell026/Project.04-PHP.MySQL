<?php
$pageTitle = 'Contact - Portfolio Russell Imanuel Ruru';
$extraCss = [];
$extraJs = ['form-validation.js', 'particles.js'];

include_once 'includes/config.php';
include_once 'includes/functions.php';

$success = false;
$error = false;
$errorMessage = '';

// Jika form disubmit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $subject = isset($_POST['subject']) ? $_POST['subject'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';
    
    // Validasi input
    if (empty($name)) {
        $error = true;
        $errorMessage = 'Nama tidak boleh kosong';
    } elseif (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = true;
        $errorMessage = 'Email tidak valid';
    } elseif (empty($subject)) {
        $error = true;
        $errorMessage = 'Subjek tidak boleh kosong';
    } elseif (empty($message)) {
        $error = true;
        $errorMessage = 'Pesan tidak boleh kosong';
    } else {
        // Menyimpan pesan ke database
        if (saveContactMessage($name, $email, $subject, $message)) {
            $success = true;
            
            // Reset nilai form
            $name = '';
            $email = '';
            $subject = '';
            $message = '';
        } else {
            $error = true;
            $errorMessage = 'Terjadi kesalahan. Silakan coba lagi nanti.';
        }
    }
}

include_once 'includes/header.php';
?>

<section class="contact-hero">
    <div class="container">
        <h1>Hubungi Saya</h1>
        <p>Ada pertanyaan atau ingin bekerja sama? Jangan ragu untuk menghubungi saya</p>
    </div>
</section>

<section class="contact-content">
    <div class="container">
        <div class="contact-container">
            <div class="contact-info">
                <h2>Informasi Kontak</h2>
                <p>Silakan hubungi saya melalui form atau menggunakan informasi kontak di bawah ini. Saya akan membalas pesan Anda secepatnya.</p>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Email</h3>
                        <p><a href="mailto:russellruru026@student.unsrat.ac.id">russellruru026@student.unsrat.ac.id</a></p>
                    </div>
                </div>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Telepon</h3>
                        <p><a href="tel:+6281234567890">+62 812 3456 7890</a></p>
                    </div>
                </div>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Lokasi</h3>
                        <p>Manado, Indonesia</p>
                    </div>
                </div>
                
                <div class="contact-method">
                    <div
                    <section class="contact-content">
    <div class="container">
        <div class="contact-container">
            <div class="contact-info">
                <h2>Informasi Kontak</h2>
                <p>Silakan hubungi saya melalui form atau menggunakan informasi kontak di bawah ini. Saya akan membalas pesan Anda secepatnya.</p>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Email</h3>
                        <p><a href="mailto:russellruru026@student.unsrat.ac.id">russellruru026@student.unsrat.ac.id</a></p>
                    </div>
                </div>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Telepon</h3>
                        <p><a href="tel:+6281234567890">+62 812 3456 7890</a></p>
                    </div>
                </div>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Lokasi</h3>
                        <p>Manado, Indonesia</p>
                    </div>
                </div>
                
                <div class="contact-method">
                    <div class="contact-icon"></div>
                    <div class="contact-details">
                        <h3>Media Sosial</h3>
                        <p>
                            <a href="#" style="margin-right: 10px;">GitHub</a>
                            <a href="#" style="margin-right: 10px;">LinkedIn</a>
                            <a href="https://www.instagram.com/raselimanuel" target="_blank">@raselimanuel</a>
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="contact-form">
                <?php if ($success): ?>
                    <div class="success-message" id="success-message">
                        Pesan Anda telah berhasil dikirim! Terima kasih telah menghubungi saya.
                    </div>
                <?php endif; ?>
                
                <?php if ($error): ?>
                    <div class="error-message" style="display: block; background-color: rgba(231, 76, 60, 0.1); color: #e74c3c; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                        <?php echo $errorMessage; ?>
                    </div>
                <?php endif; ?>
                
                <h2>Kirim Pesan</h2>
                <form id="contact-form" method="POST" action="">
                    <div class="form-group">
                        <label for="name">Nama Lengkap</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Masukkan nama lengkap Anda" value="<?php echo isset($name) ? $name : ''; ?>">
                        <div class="error-message">Nama tidak boleh kosong</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Masukkan alamat email Anda" value="<?php echo isset($email) ? $email : ''; ?>">
                        <div class="error-message">Masukkan alamat email yang valid</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="subject">Subjek</label>
                        <input type="text" class="form-control" id="subject" name="subject" placeholder="Masukkan subjek pesan" value="<?php echo isset($subject) ? $subject : ''; ?>">
                        <div class="error-message">Subjek tidak boleh kosong</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Pesan</label>
                        <textarea class="form-control" id="message" name="message" placeholder="Tulis pesan Anda di sini"><?php echo isset($message) ? $message : ''; ?></textarea>
                        <div class="error-message">Pesan tidak boleh kosong</div>
                    </div>
                    
                    <button type="submit" class="submit-btn" id="submit-btn">Kirim Pesan</button>
                </form>
            </div>
        </div>
    </div>
</section>

<?php
include_once 'includes/footer.php';
?>