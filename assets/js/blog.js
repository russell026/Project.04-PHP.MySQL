document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const noResults = document.getElementById('no-results');
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    // Current category and search term
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let currentPage = 1;
    const postsPerPage = 4;
    
    // Animation for blog posts
    function animateBlogPosts() {
        blogPosts.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('animate');
            }, 100 * index);
        });
    }
    
    // Initialize with animation
    animateBlogPosts();
    
    // Search functionality
    if(searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchPosts();
        });
    }
    
    if(searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchPosts();
            }
        });
    }
    
    function searchPosts() {
        if (!searchInput) return;
        
        currentSearchTerm = searchInput.value.toLowerCase();
        
        let visibleCount = 0;
        
        blogPosts.forEach(post => {
            const title = post.querySelector('h2 a').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const category = post.getAttribute('data-category').toLowerCase();
            
            const matchesSearch = title.includes(currentSearchTerm) || excerpt.includes(currentSearchTerm);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            
            if (matchesSearch && matchesCategory) {
                post.style.display = 'block';
                visibleCount++;
            } else {
                post.style.display = 'none';
            }
        });
        
        // Show "no results" message if needed
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
        
        // Reset to first page
        currentPage = 1;
        updatePagination();
        updatePageDisplay();
    }
    
    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = this.getAttribute('data-category');
            
            let visibleCount = 0;
            
            blogPosts.forEach(post => {
                const category = post.getAttribute('data-category');
                const title = post.querySelector('h2 a').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                
                const matchesSearch = !currentSearchTerm || title.includes(currentSearchTerm) || excerpt.includes(currentSearchTerm);
                const matchesCategory = currentCategory === 'all' || category === currentCategory;
                
                if (matchesSearch && matchesCategory) {
                    post.style.display = 'block';
                    visibleCount++;
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Show "no results" message if needed
            if (noResults) {
                if (visibleCount === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            }
            
            // Reset to first page
            currentPage = 1;
            updatePagination();
            updatePageDisplay();
        });
    });
    
    // Pagination
    function updatePagination() {
        if (!pageNumbers || !prevBtn || !nextBtn) return;
        
        const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');
        const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
        
        // Create or update page numbers
        const pageNumbersContainer = document.querySelector('.page-numbers');
        if (pageNumbersContainer) {
            pageNumbersContainer.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                const pageNumber = document.createElement('button');
                pageNumber.className = 'page-number' + (i === currentPage ? ' active' : '');
                pageNumber.textContent = i;
                
                pageNumber.addEventListener('click', function() {
                    currentPage = i;
                    updatePagination();
                    updatePageDisplay();
                });
                
                pageNumbersContainer.appendChild(pageNumber);
            }
        }
        
        // Update prev/next buttons
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        }
    }
    
    function updatePageDisplay() {
        const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');
        
        visiblePosts.forEach((post, index) => {
            const pageIndex = Math.floor(index / postsPerPage) + 1;
            
            if (pageIndex === currentPage) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
        
        // Scroll to top of blog content
        const blogContent = document.querySelector('.blog-content');
        if (blogContent) {
            blogContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Initialize pagination
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                updatePageDisplay();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');
            const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                updatePageDisplay();
            }
        });
        
        // Initial pagination setup
        updatePagination();
        updatePageDisplay();
    }
    
    // Reading time calculation for blog post page
    const blogPostBody = document.querySelector('.blog-post-body');
    if (blogPostBody) {
        const text = blogPostBody.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed (200 words per minute)
        
        const postMeta = document.querySelector('.blog-post-meta');
        if (postMeta) {
            const readingTimeSpan = document.createElement('span');
            readingTimeSpan.className = 'reading-time';
            readingTimeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${readingTime} minute read`;
            
            postMeta.appendChild(readingTimeSpan);
        }
    }
    
    // Table of contents for blog post
    if (blogPostBody) {
        const headings = blogPostBody.querySelectorAll('h2');
        
        if (headings.length >= 3) {
            const toc = document.createElement('div');
            toc.className = 'table-of-contents';
            toc.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
            
            headings.forEach((heading, index) => {
                if (!heading.id) {
                    heading.id = 'heading-' + index;
                }
                
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.textContent = heading.textContent;
                li.appendChild(a);
                toc.querySelector('ul').appendChild(li);
                
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, targetId);
                });
            });
            
            const firstPara = blogPostBody.querySelector('p');
            if (firstPara) {
                firstPara.parentNode.insertBefore(toc, firstPara.nextSibling);
            }
        }
    }
    
    // Reading progress bar for blog post
    if (blogPostBody) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const fullHeight = document.body.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            
            const progress = (scrolled / fullHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }
    
    // Add share buttons to blog post
    if (blogPostBody) {
        const shareSection = document.createElement('div');
        shareSection.className = 'share-post';
        
        const postTitle = document.querySelector('.blog-post-header h1')?.textContent || 'Blog Post';
        const postUrl = window.location.href;
        
        shareSection.innerHTML = `
            <span class="share-label">Share this article:</span>
            <div class="share-buttons">
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}" target="_blank" class="share-button" aria-label="Share on Twitter">
                    <i class="twitter-icon">Twitter</i>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}" target="_blank" class="share-button" aria-label="Share on Facebook">
                    <i class="facebook-icon">Facebook</i>
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}" target="_blank" class="share-button" aria-label="Share on LinkedIn">
                    <i class="linkedin-icon">LinkedIn</i>
                </a>
                <a href="mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent('Check out this article: ' + postUrl)}" class="share-button" aria-label="Share via Email">
                    <i class="email-icon">Email</i>
                </a>
            </div>
        `;
        
        blogPostBody.appendChild(shareSection);
    }

    // Initialize particles.js for the blog hero section if particles-js exists
    const particlesContainer = document.getElementById('particles-js');
    if (typeof particlesJS !== 'undefined' && particlesContainer) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});