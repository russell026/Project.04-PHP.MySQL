document.addEventListener('DOMContentLoaded', function () {
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
    
    let currentIndex = 0;
    
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
        
        // Navigation functions
        const showPrevImage = () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModalContent(currentIndex);
        };
        
        const showNextImage = () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModalContent(currentIndex);
        };
        
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
        document.addEventListener('keydown', function (event) {
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
            button.addEventListener('click', function () {
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
            
            // Recalculate masonry layout
            setTimeout(createMasonryLayout, 500);
        });
    });
    
    // Modal functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
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
            modalImage.addEventListener('click', function () {
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
    closeModal.addEventListener('click', function () {
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
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
    
    // Image lazy loading with blur effect
    const galleryImages = document.querySelectorAll('.gallery-img img');
    
    galleryImages.forEach(img => {
        const parent = img.parentElement;
        parent.classList.add('blur-load');
        
        const imgSrc = img.getAttribute('src');
        
        const thumbSrc = imgSrc.replace('.jpg', '-thumb.jpg');
        
        parent.style.backgroundImage = `url(${thumbSrc})`;
        
        img.classList.add('loading');
        
        img.addEventListener('load', function () {
            img.classList.remove('loading');
            parent.classList.add('loaded');
        });
    });
    
    // Masonry layout for gallery items
    function createMasonryLayout() {
        const container = document.querySelector('.gallery-grid');
        
        if (container && window.innerWidth > 768) {
            const gridItems = container.querySelectorAll('.gallery-item:not(.hide)');
            
            if (gridItems.length > 0) {
                let columns = 3;
                
                if (window.innerWidth < 992) {
                    columns = 2;
                }
                
                gridItems.forEach(item => {
                    item.style.height = 'auto';
                });
                
                const itemsPerColumn = Math.ceil(gridItems.length / columns);
                
                for (let i = 0; i < itemsPerColumn; i++) {
                    for (let j = 0; j < columns; j++) {
                        const itemIndex = i + j * itemsPerColumn;
                        
                        if (itemIndex < gridItems.length) {
                            const item = gridItems[itemIndex];
                            const heightModifier = Math.floor(Math.random() * 3);
                            
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
        button.addEventListener('click', function () {
            setTimeout(createMasonryLayout, 500);
        });
    });
});
