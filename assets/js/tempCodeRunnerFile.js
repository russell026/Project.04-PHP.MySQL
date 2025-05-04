document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering with animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Modal elements
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Set initial animation delay for each item
    galleryItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    // Add lightbox navigation
    const createModalNavigation = () => {
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'modal-nav prev-btn';
        prevButton.innerHTML = '&lsaquo;';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'modal-nav next-btn';
        nextButton.innerHTML = '&rsaquo;';
        
        // Add buttons to modal
        modal.appendChild(prevButton);
        modal.appendChild(nextButton);
        
        let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createMasonryLayout, 300);
    });
    
    // Add filter transition effects
    const addFilterAnimations = () => {
        // Create animated background for active filter
        const filterContainer = document.querySelector('.filter-buttons');
        const activeIndicator = document.createElement('span');
        activeIndicator.className = 'active-filter-indicator';
        filterContainer.appendChild(activeIndicator);
        
        // Add styles for the indicator
        const filterStyle = document.createElement('style');
        filterStyle.textContent = `
            .filter-buttons {
                position: relative;
            }
            
            .active-filter-indicator {
                position: absolute;
                height: 100%;
                background-color: rgba(52, 152, 219, 0.1);
                border-radius: 30px;
                z-index: 0;
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .filter-btn {
                position: relative;
                z-index: 1;
            }
        `;
        document.head.appendChild(filterStyle);
        
        // Position the indicator correctly
        function positionIndicator() {
            const activeButton = document.querySelector('.filter-btn.active');
            if (activeButton) {
                const buttonRect = activeButton.getBoundingClientRect();
                const containerRect = filterContainer.getBoundingClientRect();
                
                activeIndicator.style.width = buttonRect.width + 'px';
                activeIndicator.style.left = (buttonRect.left - containerRect.left) + 'px';
                activeIndicator.style.top = '0';
            }
        }
        
        // Initial positioning
        setTimeout(positionIndicator, 100);
        
        // Update on filter change
        filterButtons.forEach(button => {
            button.addEventListener('click', positionIndicator);
        });
        
        // Update on window resize
        window.addEventListener('resize', positionIndicator);
    };
    
    addFilterAnimations();
    
    // Add hover effects for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // 3D tilt effect on hover
            item.addEventListener('mousemove', function(e) {
                const itemRect = this.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2;
                const itemCenterY = itemRect.top + itemRect.height / 2;
                
                const mouseX = e.clientX - itemCenterX;
                const mouseY = e.clientY - itemCenterY;
                
                // Calculate rotation (max 10 degrees)
                const rotateY = mouseX * 5 / (itemRect.width / 2);
                const rotateX = -mouseY * 5 / (itemRect.height / 2);
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        galleryItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                // Show overlay on touch
                const overlay = this.querySelector('.gallery-overlay');
                overlay.style.opacity = '1';
                
                // Show overlay content
                const title = overlay.querySelector('h3');
                const desc = overlay.querySelector('p');
                const btn = overlay.querySelector('.view-btn');
                
                title.style.transform = 'translateY(0)';
                desc.style.transform = 'translateY(0)';
                btn.style.transform = 'translateY(0)';
                btn.style.opacity = '1';
                
                // Hide other overlays
                galleryItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherOverlay = otherItem.querySelector('.gallery-overlay');
                        otherOverlay.style.opacity = '0';
                        
                        const otherTitle = otherOverlay.querySelector('h3');
                        const otherDesc = otherOverlay.querySelector('p');
                        const otherBtn = otherOverlay.querySelector('.view-btn');
                        
                        otherTitle.style.transform = 'translateY(20px)';
                        otherDesc.style.transform = 'translateY(20px)';
                        otherBtn.style.transform = 'translateY(20px)';
                        otherBtn.style.opacity = '0';
                    }
                });
            });
        });
    }
    
    // Add dynamic gallery content loading
    const addLoadMoreButton = () => {
        // Create "Load More" button
        const loadMoreButton = document.createElement('button');
        loadMoreButton.className = 'btn-primary';
        loadMoreButton.innerText = 'Load More Projects';
        loadMoreButton.style.display = 'block';
        loadMoreButton.style.margin = '40px auto 0';
        
        // Add button to container
        const galleryContainer = document.querySelector('.gallery-container .container');
        galleryContainer.appendChild(loadMoreButton);
        
        // Sample new items data (in a real project, this would be loaded from a server)
        const newItemsData = [
            {
                category: 'web',
                image: 'images/gallery/img9.jpg',
                title: 'E-Learning Platform',
                desc: 'A comprehensive e-learning platform with course management system and interactive quizzes.',
                tags: 'Web Design, JavaScript, PHP'
            },
            {
                category: 'ui',
                image: 'images/gallery/img10.jpg',
                title: 'Finance App UI',
                desc: 'User interface design for a personal finance management application with intuitive dashboards.',
                tags: 'UI/UX, Mobile App'
            },
            {
                category: 'graphic',
                image: 'images/gallery/img11.jpg',
                title: 'Event Branding',
                desc: 'Complete branding package for a tech conference including logo, banners, and printed materials.',
                tags: 'Graphic Design, Branding'
            }
        ];
        
        // Add click event to load more items
        loadMoreButton.addEventListener('click', function() {
            // Show loading animation
            this.innerHTML = '<div class="loading-spinner" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 10px;"></div> Loading...';
            this.disabled = true;
            
            // Simulate AJAX loading delay
            setTimeout(() => {
                // Create new items from data
                newItemsData.forEach(itemData => {
                    const newItem = document.createElement('div');
                    newItem.className = 'gallery-item';
                    newItem.setAttribute('data-category', itemData.category);
                    
                    // Create HTML structure for new item
                    newItem.innerHTML = `
                        <div class="gallery-img">
                            <img src="${itemData.image}" alt="${itemData.title}">
                            <div class="gallery-overlay">
                                <h3>${itemData.title}</h3>
                                <p>${itemData.tags}</p>
                                <button class="view-btn" data-image="${itemData.image}" data-title="${itemData.title}" data-desc="${itemData.desc}">View</button>
                            </div>
                        </div>
                    `;
                    
                    // Add new item to gallery
                    document.querySelector('.gallery-grid').appendChild(newItem);
                    
                    // Add event listeners to new view button
                    const newViewBtn = newItem.querySelector('.view-btn');
                    newViewBtn.addEventListener('click', function() {
                        const imageSrc = this.getAttribute('data-image');
                        const title = this.getAttribute('data-title');
                        const desc = this.getAttribute('data-desc');
                        
                        modalImage.src = imageSrc;
                        modalTitle.textContent = title;
                        modalDesc.textContent = desc;
                        
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    });
                });
                
                // Apply current filter
                const activeFilter = document.querySelector('.filter-btn.active');
                if (activeFilter) {
                    const filterValue = activeFilter.getAttribute('data-filter');
                    const allItems = document.querySelectorAll('.gallery-item');
                    
                    allItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hide');
                            item.classList.add('show');
                        } else {
                            item.classList.add('hide');
                            item.classList.remove('show');
                        }
                    });
                }
                
                // Hide button after loading all items
                this.remove();
                
                // Update masonry layout
                setTimeout(createMasonryLayout, 300);
            }, 1500);
        });
    };
    
    // Initialize load more function
    addLoadMoreButton();
    
    // Add image comparison slider for before/after showcase
    const addImageComparisonSlider = () => {
        // Create a showcase section
        const showcaseSection = document.createElement('section');
        showcaseSection.className = 'image-comparison-section';
        showcaseSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Before & After</h2>
                <p class="section-desc" style="text-align: center; margin-bottom: 40px;">See the transformation in our design process</p>
                
                <div class="image-comparison-slider">
                    <div class="comparison-container">
                        <img class="before-image" src="images/gallery/before.jpg" alt="Before">
                        <img class="after-image" src="images/gallery/after.jpg" alt="After">
                        <div class="slider-handle"></div>
                        <div class="slider-line"></div>
                    </div>
                    <div class="comparison-labels">
                        <span class="before-label">Before</span>
                        <span class="after-label">After</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for the comparison slider
        const comparisonStyle = document.createElement('style');
        comparisonStyle.textContent = `
            .image-comparison-section {
                padding: 80px 0;
                background-color: var(--light-background);
            }
            
            .comparison-container {
                position: relative;
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            .before-image, .after-image {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .after-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 50%;
                clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
            }
            
            .slider-handle {
                position: absolute;
                top: 0;
                left: 50%;
                width: 40px;
                height: 40px;
                background-color: var(--primary-color);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                cursor: ew-resize;
                z-index: 10;
                top: 50%;
                box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.7);
            }
            
            .slider-handle::before, .slider-handle::after {
                content: '';
                position: absolute;
                width: 2px;
                height: 10px;
                background-color: white;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .slider-handle::before {
                left: 13px;
            }
            
            .slider-handle::after {
                right: 13px;
            }
            
            .slider-line {
                position: absolute;
                top: 0;
                left: 50%;
                width: 2px;
                height: 100%;
                background-color: white;
                transform: translateX(-50%);
                z-index: 5;
                pointer-events: none;
            }
            
            .comparison-labels {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                font-weight: 500;
                color: var(--text-color);
            }
            
            .before-label, .after-label {
                padding: 5px 15px;
                background-color: rgba(52, 152, 219, 0.1);
                border-radius: 20px;
                font-size: 14px;
            }
            
            @media (max-width: 768px) {
                .comparison-container {
                    max-width: 100%;
                }
            }
        `;
        document.head.appendChild(comparisonStyle);
        
        // Insert the showcase section before the footer
        const footer = document.querySelector('footer');
        if (footer) {
            document.body.insertBefore(showcaseSection, footer);
        }
        
        // Add functionality to the slider
        setTimeout(() => {
            const container = document.querySelector('.comparison-container');
            const handle = document.querySelector('.slider-handle');
            const afterImage = document.querySelector('.after-image');
            const sliderLine = document.querySelector('.slider-line');
            
            if (container && handle && afterImage) {
                let isActive = false;
                
                // Set initial position
                let sliderPosition = 50;
                
                // Update slider position
                function updateSliderPosition(x) {
                    const containerRect = container.getBoundingClientRect();
                    sliderPosition = ((x - containerRect.left) / containerRect.width) * 100;
                    
                    // Limit position to container boundaries
                    sliderPosition = Math.max(0, Math.min(sliderPosition, 100));
                    
                    // Update handle and clip-path
                    handle.style.left = `${sliderPosition}%`;
                    sliderLine.style.left = `${sliderPosition}%`;
                    afterImage.style.width = `${sliderPosition}%`;
                    afterImage.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
                }
                
                // Mouse events
                handle.addEventListener('mousedown', () => {
                    isActive = true;
                });
                
                document.addEventListener('mouseup', () => {
                    isActive = false;
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (!isActive) return;
                    updateSliderPosition(e.clientX);
                });
                
                // Touch events
                handle.addEventListener('touchstart', () => {
                    isActive = true;
                });
                
                document.addEventListener('touchend', () => {
                    isActive = false;
                });
                
                document.addEventListener('touchmove', (e) => {
                    if (!isActive) return;
                    updateSliderPosition(e.touches[0].clientX);
                });
                
                // Click on container
                container.addEventListener('click', (e) => {
                    updateSliderPosition(e.clientX);
                });
            }
        }, 500);
    };
    
    // Initialize comparison slider (uncomment to enable)
    // addImageComparisonSlider();
}); currentIndex = 0;
        
        // Navigation functions
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModalContent(currentIndex);
        }
        
        function showNextImage() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModalContent(currentIndex);
        }
        
        function updateModalContent(index) {
            const button = galleryItems[index].querySelector('.view-btn');
            const imageSrc = button.getAttribute('data-image');
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            
            // Animate image change
            modalImage.style.opacity = '0';
            setTimeout(() => {
                modalImage.src = imageSrc;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                modalImage.style.opacity = '1';
            }, 300);
        }
        
        // Add event listeners
        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (event.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
        
        // Update current index when opening modal
        viewButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                currentIndex = index;
            });
        });
    };
    
    createModalNavigation();
    
    // Add CSS for modal navigation
    const modalNavStyle = document.createElement('style');
    modalNavStyle.textContent = `
        .modal-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .modal-nav:hover {
            background-color: rgba(52, 152, 219, 0.8);
        }
        
        .prev-btn {
            left: 20px;
        }
        
        .next-btn {
            right: 20px;
        }
        
        @media (max-width: 768px) {
            .modal-nav {
                width: 40px;
                height: 40px;
                font-size: 24px;
            }
        }
    `;
    document.head.appendChild(modalNavStyle);
    
    // Filter functionality with animation
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items with staggered animation
            galleryItems.forEach((item, index) => {
                // Reset animation
                item.style.animationDelay = `${index * 0.1}s`;
                
                // Force a reflow to restart animation
                void item.offsetWidth;
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Modal functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            modal.style.display = 'block';
            
            // Disable scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
            
            // Add zoom effect on image click
            modalImage.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
            
            // Add CSS for image zoom
            if (!document.querySelector('#zoom-style')) {
                const zoomStyle = document.createElement('style');
                zoomStyle.id = 'zoom-style';
                zoomStyle.textContent = `
                    #modal-image {
                        transition: transform 0.3s ease;
                        cursor: zoom-in;
                    }
                    
                    #modal-image.zoomed {
                        transform: scale(1.5);
                        cursor: zoom-out;
                    }
                `;
                document.head.appendChild(zoomStyle);
            }
        });
    });
    
    // Close modal functionality
    closeModal.addEventListener('click', function() {
        closeModalFunction();
    });
    
    // Close modal function
    function closeModalFunction() {
        modal.style.display = 'none';
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
        
        // Reset zoom
        modalImage.classList.remove('zoomed');
    }
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
    
    // Image lazy loading with blur effect
    const galleryImages = document.querySelectorAll('.gallery-img img');
    
    galleryImages.forEach(img => {
        // Create parent container for blur effect
        const parent = img.parentElement;
        parent.classList.add('blur-load');
        
        // Set low-res background image
        const imgSrc = img.getAttribute('src');
        
        // Create tiny thumbnail URL (this is a simulation)
        const thumbSrc = imgSrc.replace('.jpg', '-thumb.jpg');
        
        // Set thumbnail as background (in production, use actual thumbnails)
        parent.style.backgroundImage = `url(${imgSrc})`;
        
        // Add loading class
        img.classList.add('loading');
        
        // When image loads
        img.addEventListener('load', function() {
            // Remove loading class
            img.classList.remove('loading');
            
            // Mark container as loaded
            parent.classList.add('loaded');
        });
    });
    
    // Masonry layout for gallery items
    function createMasonryLayout() {
        const container = document.querySelector('.gallery-grid');
        
        if (container && window.innerWidth > 768) {
            // Apply masonry layout
            const gridItems = container.querySelectorAll('.gallery-item:not(.hide)');
            
            if (gridItems.length > 0) {
                let columns = 3;
                
                if (window.innerWidth < 992) {
                    columns = 2;
                }
                
                // Reset heights
                gridItems.forEach(item => {
                    item.style.height = 'auto';
                });
                
                // Get items per column
                const itemsPerColumn = Math.ceil(gridItems.length / columns);
                
                // Adjust heights to create masonry effect
                for (let i = 0; i < itemsPerColumn; i++) {
                    for (let j = 0; j < columns; j++) {
                        const itemIndex = i + j * itemsPerColumn;
                        
                        if (itemIndex < gridItems.length) {
                            const item = gridItems[itemIndex];
                            const heightModifier = Math.floor(Math.random() * 3); // 0, 1, or 2
                            
                            switch (heightModifier) {
                                case 0:
                                    item.style.height = '250px';
                                    break;
                                case 1:
                                    item.style.height = '300px';
                                    break;
                                case 2:
                                    item.style.height = '350px';
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
    
    // Initialize masonry layout and update on filter change
    createMasonryLayout();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Wait for animations to complete
            setTimeout(createMasonryLayout, 500);
        });
    });
    
    // Update layout on window resize
    let