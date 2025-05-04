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
    const postsPerPage = 4; // Reduced to show pagination better
    
    // Add a reading progress bar
    const addReadingProgressBar = () => {
        // Check if this is a blog post page
        const isBlogPost = document.querySelector('.blog-post-article');
        
        if (isBlogPost) {
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress-bar';
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .reading-progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    background-color: var(--primary-color);
                    z-index: 1001;
                    width: 0%;
                    transition: width 0.1s;
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(progressBar);
            
            // Update progress on scroll
            window.addEventListener('scroll', function() {
                const windowHeight = window.innerHeight;
                const fullHeight = document.body.scrollHeight - windowHeight;
                const scrolled = window.scrollY;
                
                const progress = (scrolled / fullHeight) * 100;
                progressBar.style.width = progress + '%';
            });
        }
    };
    
    // Initialize reading progress
    addReadingProgressBar();
    
    // Add estimated reading time
    const addReadingTime = () => {
        // Check if this is a blog post page
        const blogPostBody = document.querySelector('.blog-post-body');
        
        if (blogPostBody) {
            // Get all text content
            const text = blogPostBody.textContent;
            
            // Calculate reading time based on average reading speed (200 words per minute)
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200);
            
            // Create reading time element
            const readingTimeEl = document.createElement('span');
            readingTimeEl.className = 'reading-time';
            readingTimeEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${readingTime} minute read`;
            
            // Add to meta section
            const postMeta = document.querySelector('.blog-post-meta');
            if (postMeta) {
                postMeta.appendChild(readingTimeEl);
            }
        }
    };
    
    // Initialize reading time
    addReadingTime();
    
    // Create table of contents for blog posts
    const createTableOfContents = () => {
        // Check if this is a blog post page
        const blogPostBody = document.querySelector('.blog-post-body');
        
        if (blogPostBody) {
            // Get all headings
            const headings = blogPostBody.querySelectorAll('h2');
            
            // Only create TOC if there are enough headings
            if (headings.length >= 3) {
                const toc = document.createElement('div');
                toc.className = 'table-of-contents';
                toc.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
                
                headings.forEach((heading, index) => {
                    // Add ID to heading if not already present
                    if (!heading.id) {
                        heading.id = 'heading-' + index;
                    }
                    
                    // Add entry to TOC
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = '#' + heading.id;
                    a.textContent = heading.textContent;
                    li.appendChild(a);
                    toc.querySelector('ul').appendChild(li);
                    
                    // Add smooth scrolling
                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Get target position
                        const targetId = this.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                        
                        // Scroll smoothly
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL hash
                        history.pushState(null, null, targetId);
                    });
                });
                
                // Insert TOC after first paragraph
                const firstPara = blogPostBody.querySelector('p');
                if (firstPara) {
                    firstPara.parentNode.insertBefore(toc, firstPara.nextSibling);
                }
                
                // Highlight active heading on scroll
                const observerOptions = {
                    rootMargin: '-100px 0px -70% 0px',
                    threshold: 0
                };
                
                const headingObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Find the TOC link and add active class
                            const id = entry.target.id;
                            const tocLink = document.querySelector(`.table-of-contents a[href="#${id}"]`);
                            
                            // Remove active class from all links
                            document.querySelectorAll('.table-of-contents a').forEach(link => {
                                link.classList.remove('active');
                            });
                            
                            // Add active class to current link
                            if (tocLink) {
                                tocLink.classList.add('active');
                            }
                        }
                    });
                }, observerOptions);
                
                // Observe all headings
                headings.forEach(heading => {
                    headingObserver.observe(heading);
                });
            }
        }
    };
    
    // Initialize table of contents
    createTableOfContents();
    
    // Add syntax highlighting for code blocks
    const addSyntaxHighlighting = () => {
        // Check if there are code blocks
        const codeBlocks = document.querySelectorAll('pre code');
        
        if (codeBlocks.length > 0) {
            // Simple syntax highlighting (in a real project, you'd use a library like Prism.js)
            codeBlocks.forEach(block => {
                // Style the code block
                block.style.display = 'block';
                block.style.padding = '20px';
                block.style.backgroundColor = '#f5f5f5';
                block.style.borderRadius = '5px';
                block.style.overflowX = 'auto';
                block.style.fontFamily = "'Fira Code', monospace";
                block.style.fontSize = '14px';
                block.style.lineHeight = '1.6';
                
                // Get the code text
                let codeText = block.textContent;
                
                // Simple highlighting for keywords (this is a basic example)
                // In a real project, use a proper syntax highlighting library
                const keywords = ['function', 'return', 'if', 'else', 'for', 'while', 'let', 'const', 'var', 'class', 'import', 'export'];
                
                keywords.forEach(keyword => {
                    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                    codeText = codeText.replace(regex, `<span style="color: #9b59b6;">${keyword}</span>`);
                });
                
                // Highlight strings
                codeText = codeText.replace(/(["'])(.*?)\1/g, '<span style="color: #2ecc71;">$&</span>');
                
                // Highlight comments
                codeText = codeText.replace(/\/\/.*/g, '<span style="color: #95a5a6;">$&</span>');
                
                // Highlight numbers
                codeText = codeText.replace(/\b(\d+)\b/g, '<span style="color: #e74c3c;">$&</span>');
                
                // Set the highlighted code
                block.innerHTML = codeText;
            });
        }
    };
    
    // Initialize syntax highlighting
    addSyntaxHighlighting();
    
    // Add share buttons for blog posts
    const addShareButtons = () => {
        // Check if this is a blog post page
        const blogPostBody = document.querySelector('.blog-post-body');
        
        if (blogPostBody) {
            // Create share section
            const shareSection = document.createElement('div');
            shareSection.className = 'share-post';
            
            // Get post title and URL
            const postTitle = document.querySelector('.blog-post-header h1').textContent;
            const postUrl = window.location.href;
            
            // Create share content
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
            
            // Add to blog post
            blogPostBody.appendChild(shareSection);
        }
    };
    
    // Initialize share buttons
    addShareButtons();
    
    // Add related posts section
    const addRelatedPosts = () => {
        // Check if this is a blog post page
        const blogPostBody = document.querySelector('.blog-post-body');
        
        if (blogPostBody) {
            // Create related posts section
            const relatedPosts = document.createElement('div');
            relatedPosts.className = 'related-posts';
            
            // Sample related posts (in a real project, these would be dynamically generated)
            relatedPosts.innerHTML = `
                <h3>You Might Also Like</h3>
                <div class="related-posts-grid">
                    <div class="related-post">
                        <a href="blog-post2.html">
                            <img src="images/blog/post2.jpg" alt="Related Post">
                            <h4>Dasar-dasar UI/UX Design</h4>
                        </a>
                    </div>
                    <div class="related-post">
                        <a href="#">
                            <img src="images/blog/post3.jpg" alt="Related Post">
                            <h4>Artificial Intelligence dalam Kehidupan Sehari-hari</h4>
                        </a>
                    </div>
                    <div class="related-post">
                        <a href="#">
                            <img src="images/blog/post4.jpg" alt="Related Post">
                            <h4>Optimasi Website untuk Kecepatan dan Performa</h4>
                        </a>
                    </div>
                </div>
            `;
            
            // Add styles
            const relatedStyle = document.createElement('style');
            relatedStyle.textContent = `
                .related-posts {
                    margin-top: 60px;
                    padding-top: 40px;
                    border-top: 1px solid var(--border-color);
                }
                
                .related-posts h3 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .related-posts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }
                
                .related-post {
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }
                
                .related-post:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
                
                .related-post img {
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                }
                
                .related-post h4 {
                    padding: 15px;
                    font-size: 16px;
                    margin: 0;
                    color: var(--text-color);
                    transition: all 0.3s ease;
                }
                
                .related-post:hover h4 {
                    color: var(--primary-color);
                }
                
                @media (max-width: 768px) {
                    .related-posts-grid {
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    }
                }
                
                @media (max-width: 576px) {
                    .related-posts-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(relatedStyle);
            
            // Add to blog post
            blogPostBody.appendChild(relatedPosts);
        }
    };
    
    // Initialize related posts
    addRelatedPosts();
});
