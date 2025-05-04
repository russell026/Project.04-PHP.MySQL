document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    // Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });
    
    // Update progress bar while page loads
    let width = 0;
    const progressInterval = setInterval(function() {
        if (width >= 90) {
            clearInterval(progressInterval);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 20);
    
    window.addEventListener('load', function() {
        progressBar.style.width = '100%';
        setTimeout(function() {
            progressBar.style.opacity = '0';
        }, 500);
    });
    
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate menu toggle
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (nav.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset toggle appearance
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Typing Effect
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const texts = [
            'Web Developer',
            'UI/UX Designer',
            'Student',
            'Tech Enthusiast'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typingDelay = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500;
            }
            
            setTimeout(type, typingDelay);
        }
        
        setTimeout(type, 1000);
    }
    
    // Animate skill bars on scroll
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.width = level + '%';
        });
    }
    
    // Create Intersection Observer for skill bars
    if ('IntersectionObserver' in window && skillLevels.length > 0) {
        const skillsSection = document.querySelector('.skills');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener('load', animateSkills);
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Project cards hover effect with 3D tilt
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation (max 10 degrees)
            const rotateY = mouseX * 10 / (cardRect.width / 2);
            const rotateX = -mouseY * 10 / (cardRect.height / 2);
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Animate on scroll effect (enhanced implementation)
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            if (elementPosition < windowHeight * 0.8) {
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }
    
    // Add animation classes based on data-aos attribute
    animatedElements.forEach(element => {
        const animation = element.getAttribute('data-aos') || 'fade-up';
        element.style.opacity = '0';
        
        switch (animation) {
            case 'fade-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(-30px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-30px)';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(0.9)';
                break;
        }
        
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Initialize animations
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // For same-page links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.classList.remove('active');
                        
                        // Reset toggle appearance
                        const spans = menuToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            }
        });
    });
    
    // Profile image animation
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        // Add floating animation
        profileImg.classList.add('float-animation');
        
        // Add hover effect
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
    }
    
    // Dark mode toggle
    const createDarkModeToggle = () => {
        // Check if user has a preference
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        
        // Create toggle button
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
        darkModeToggle.innerHTML = '<i class="mode-icon">🌙</i>';
        document.body.appendChild(darkModeToggle);
        
        // Apply theme based on preference or stored value
        if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="mode-icon">☀️</i>';
        }
        
        // Toggle dark mode
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="mode-icon">☀️</i>';
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="mode-icon">🌙</i>';
            }
        });
    };
    
    createDarkModeToggle();
    
    // Custom cursor effect
    const createCustomCursor = () => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add active class on clickable elements
        const clickableElements = document.querySelectorAll('a, button, input, select, textarea, .card, .blog-card, .gallery-item');
        
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
            });
        });
    };
    
    // Only enable custom cursor on desktop devices
    if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
        createCustomCursor();
    }
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img:not([loading])');
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.add('loaded');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('.blur-load img');
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
    
    // AJAX page transitions
    const enableAjaxPageTransitions = () => {
        const internalLinks = document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target]), a[href^="index.html"]:not([target]), a[href^="blog.html"]:not([target]), a[href^="gallery.html"]:not([target]), a[href^="contact.html"]:not([target])');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Show loading animation
                progressBar.style.width = '0';
                progressBar.style.opacity = '1';
                
                // Animate progress bar
                let width = 0;
                const progressInterval = setInterval(function() {
                    if (width >= 70) {
                        clearInterval(progressInterval);
                    } else {
                        width++;
                        progressBar.style.width = width + '%';
                    }
                }, 10);
                
                // Fetch the new page
                fetch(href)
                    .then(response => response.text())
                    .then(html => {
                        progressBar.style.width = '100%';
                        
                        // Parse the HTML
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        
                        // Get the main content
                        const newContent = doc.querySelector('body').innerHTML;
                        
                        // Fade out current content
                        document.body.style.opacity = '0';
                        
                        setTimeout(() => {
                            // Update page content
                            document.body.innerHTML = newContent;
                            
                            // Update URL
                            window.history.pushState({}, '', href);
                            
                            // Reinitialize scripts
                            document.body.style.opacity = '1';
                            
                            // Hide progress bar
                            progressBar.style.opacity = '0';
                            
                            // Reinitialize the page
                            initPage();
                        }, 500);
                    })
                    .catch(() => {
                        // If fetch fails, navigate normally
                        window.location.href = href;
                    });
            });
        });
    };
    
    // Call initial functions
    function initPage() {
        // Re-attach event listeners and initialize components for AJAX-loaded pages
        // This would need to re-execute all the initialization code
    }
    
    // Uncomment to enable AJAX transitions
    // enableAjaxPageTransitions();
    
    // Add dynamic content loading for blog
    if (window.location.pathname.includes('blog.html')) {
        // Simulate loading more posts on scroll
        window.addEventListener('scroll', function() {
            const distanceToBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
            const blogGrid = document.querySelector('.blog-grid');
            
            if (distanceToBottom < 300 && blogGrid && !blogGrid.classList.contains('loading-more')) {
                // Prevent multiple loads
                blogGrid.classList.add('loading-more');
                
                // Create loading indicator
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'loading-indicator';
                loadingIndicator.innerHTML = '<div class="loading-spinner"></div><p>Loading more posts...</p>';
                loadingIndicator.style.textAlign = 'center';
                loadingIndicator.style.padding = '30px';
                document.querySelector('.blog-content .container').appendChild(loadingIndicator);
                
                // Simulate AJAX delay
                setTimeout(function() {
                    // Remove loading indicator
                    loadingIndicator.remove();
                    
                    // Remove loading flag
                    blogGrid.classList.remove('loading-more');
                    
                    // Update pagination
                    const pagination = document.querySelector('.pagination');
                    if (pagination) {
                        pagination.style.display = 'none';
                    }
                    
                    // Add "Load More" button
                    const loadMoreBtn = document.createElement('button');
                    loadMoreBtn.className = 'btn-primary';
                    loadMoreBtn.innerText = 'Load More Posts';
                    loadMoreBtn.style.margin = '30px auto';
                    loadMoreBtn.style.display = 'block';
                    
                    document.querySelector('.blog-content .container').appendChild(loadMoreBtn);
                    
                    loadMoreBtn.addEventListener('click', function() {
                        // Simulate loading more posts
                        this.innerHTML = '<div class="loading-spinner" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 10px;"></div> Loading...';
                        this.disabled = true;
                        
                        setTimeout(() => {
                            this.remove();
                        }, 2000);
                    });
                }, 1500);
            }
        });
    }
});