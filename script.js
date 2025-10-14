// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoader();
    initNavigation();
    initScrollAnimations();
    initPortfolio();
    initContactForm();
    initModal();
    initSmoothScrolling();
});

// Loading Screen
function initLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        }
        loaderProgress.style.width = progress + '%';
    }, 100);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.section-title, .intro-text, .about-description, .stat-item, .achievement-item, .portfolio-item');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Special animations for about section
    const aboutImage = document.querySelector('.about-img');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage) {
        aboutImage.classList.add('slide-in-left');
        observer.observe(aboutImage);
    }
    
    if (aboutText) {
        aboutText.classList.add('slide-in-right');
        observer.observe(aboutText);
    }
}

// Portfolio Gallery
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const seeMoreBtn = document.getElementById('see-more-btn');
    let showingAll = false;
    let currentFilter = 'all';
    const INITIAL_ITEMS_COUNT = 8;
    
    // Portfolio data with actual images
    const portfolioData = [
        // Editorial Photos
        {
            id: 1,
            category: 'editorial',
            title: 'Editorial Portrait',
            image: 'assets/editorial/1_ 48.jpeg',
            description: 'High fashion editorial'
        },
        {
            id: 2,
            category: 'editorial',
            title: 'Fashion Editorial',
            image: 'assets/editorial/1_ 52.jpeg',
            description: 'Avant-garde fashion'
        },
        {
            id: 3,
            category: 'editorial',
            title: 'Studio Session',
            image: 'assets/editorial/IMG_0199.JPG',
            description: 'Creative studio work'
        },
        {
            id: 4,
            category: 'editorial',
            title: 'Fashion Portrait',
            image: 'assets/editorial/IMG_0206.JPG',
            description: 'Editorial fashion'
        },
        {
            id: 5,
            category: 'editorial',
            title: 'Editorial Shoot',
            image: 'assets/editorial/IMG_0209.JPG',
            description: 'High fashion editorial'
        },
        {
            id: 6,
            category: 'editorial',
            title: 'Fashion Story',
            image: 'assets/editorial/IMG_0210.JPG',
            description: 'Editorial storytelling'
        },
        {
            id: 7,
            category: 'editorial',
            title: 'Studio Portrait',
            image: 'assets/editorial/IMG_0212.JPG',
            description: 'Professional portrait'
        },
        {
            id: 8,
            category: 'editorial',
            title: 'Fashion Editorial',
            image: 'assets/editorial/IMG_0480.JPG',
            description: 'Editorial fashion'
        },
        {
            id: 9,
            category: 'editorial',
            title: 'Creative Portrait',
            image: 'assets/editorial/IMG_0481.JPG',
            description: 'Artistic portrait'
        },
        {
            id: 10,
            category: 'editorial',
            title: 'Fashion Shoot',
            image: 'assets/editorial/IMG_0535.JPG',
            description: 'High fashion'
        },
        {
            id: 11,
            category: 'editorial',
            title: 'Editorial Story',
            image: 'assets/editorial/IMG_0546.JPG',
            description: 'Fashion narrative'
        },
        {
            id: 12,
            category: 'editorial',
            title: 'Studio Work',
            image: 'assets/editorial/IMG_0977.JPG',
            description: 'Professional studio'
        },
        {
            id: 13,
            category: 'editorial',
            title: 'Fashion Portrait',
            image: 'assets/editorial/IMG_2378 копия2.jpeg',
            description: 'Editorial portrait'
        },
        {
            id: 14,
            category: 'editorial',
            title: 'Creative Shoot',
            image: 'assets/editorial/IMG_2383 копия2.jpeg',
            description: 'Artistic fashion'
        },
        {
            id: 15,
            category: 'editorial',
            title: 'Fashion Editorial',
            image: 'assets/editorial/IMG_3273.JPG',
            description: 'High fashion editorial'
        },
        {
            id: 16,
            category: 'editorial',
            title: 'Studio Session',
            image: 'assets/editorial/IMG_3398.JPG',
            description: 'Professional shoot'
        },
        {
            id: 17,
            category: 'editorial',
            title: 'Editorial Portrait',
            image: 'assets/editorial/IMG_3403.JPG',
            description: 'Fashion portrait'
        },
        {
            id: 18,
            category: 'editorial',
            title: 'Creative Work',
            image: 'assets/editorial/IMG_3405.JPG',
            description: 'Artistic editorial'
        },
        {
            id: 19,
            category: 'editorial',
            title: 'Fashion Story',
            image: 'assets/editorial/IMG_3433.JPG',
            description: 'Editorial narrative'
        },
        {
            id: 20,
            category: 'editorial',
            title: 'Studio Portrait',
            image: 'assets/editorial/IMG_4990.JPG',
            description: 'Professional portrait'
        },
        {
            id: 21,
            category: 'editorial',
            title: 'Fashion Shoot',
            image: 'assets/editorial/IMG_4993.JPG',
            description: 'High fashion'
        },
        {
            id: 22,
            category: 'editorial',
            title: 'Editorial Work',
            image: 'assets/editorial/IMG_4995.JPG',
            description: 'Fashion editorial'
        },
        {
            id: 23,
            category: 'editorial',
            title: 'Creative Portrait',
            image: 'assets/editorial/IMG_4996.JPG',
            description: 'Artistic work'
        },
        {
            id: 24,
            category: 'editorial',
            title: 'Fashion Editorial',
            image: 'assets/editorial/IMG_4997.JPG',
            description: 'Editorial fashion'
        },
        {
            id: 25,
            category: 'editorial',
            title: 'Studio Session',
            image: 'assets/editorial/IMG_6195.JPG',
            description: 'Professional shoot'
        },
        {
            id: 26,
            category: 'editorial',
            title: 'Fashion Portrait',
            image: 'assets/editorial/IMG_6204.JPG',
            description: 'Editorial portrait'
        },
        {
            id: 27,
            category: 'editorial',
            title: 'Creative Shoot',
            image: 'assets/editorial/IMG_6308.JPG',
            description: 'Artistic fashion'
        },
        {
            id: 28,
            category: 'editorial',
            title: 'Editorial Story',
            image: 'assets/editorial/IMG_6323.JPG',
            description: 'Fashion narrative'
        },
        {
            id: 29,
            category: 'editorial',
            title: 'Fashion Work',
            image: 'assets/editorial/IMG_6325.JPG',
            description: 'High fashion'
        },
        {
            id: 30,
            category: 'editorial',
            title: 'Professional Shoot',
            image: 'assets/editorial/Z8V_3634.jpeg',
            description: 'Editorial fashion'
        },
        {
            id: 31,
            category: 'editorial',
            title: 'Fashion Editorial',
            image: 'assets/editorial/Z8V_3670.jpeg',
            description: 'Creative editorial'
        },
        
        // Commercial/Judging Photos
        {
            id: 32,
            category: 'commercial',
            title: 'Commercial Campaign',
            image: 'assets/judging/IMG_4862.JPG',
            description: 'Brand campaign work'
        },
        {
            id: 33,
            category: 'commercial',
            title: 'Magazine Feature',
            image: 'assets/judging/IMG_5388.JPG',
            description: 'Commercial magazine'
        },
        {
            id: 34,
            category: 'commercial',
            title: 'Brand Collaboration',
            image: 'assets/judging/IMG_7062.JPG',
            description: 'Commercial work'
        },
        {
            id: 35,
            category: 'commercial',
            title: 'Campaign Shoot',
            image: 'assets/judging/IMG_7066.JPG',
            description: 'Brand advertising'
        },
        
        // Runway Videos
        {
            id: 36,
            category: 'runway',
            title: 'GEO VANASCO NYC',
            image: 'assets/runaway/GEO VANASCO_NYC 2.mp4',
            description: 'Fashion show runway video',
            isVideo: true
        },
        {
            id: 37,
            category: 'runway',
            title: 'NYFW SEPT 2025 - ETSUKA',
            image: 'assets/runaway/NYFW.mp4',
            description: 'New York Fashion Week runway',
            isVideo: true
        },
        {
            id: 38,
            category: 'runway',
            title: 'Runway Performance',
            image: 'assets/runaway/copy_179DDED4-599D-474F-B58E-F20A622604AF.mov',
            description: 'Professional runway show',
            isVideo: true
        }
    ];

    // Create portfolio items
    function createPortfolioItems(data, showAll = false) {
        portfolioGrid.innerHTML = '';
        const itemsToShow = showAll ? data : data.slice(0, INITIAL_ITEMS_COUNT);
        
        // Update See More button visibility
        if (data.length > INITIAL_ITEMS_COUNT && !showAll) {
            seeMoreBtn.style.display = 'block';
            seeMoreBtn.textContent = `See More (${data.length - INITIAL_ITEMS_COUNT} more)`;
        } else {
            seeMoreBtn.style.display = 'none';
        }
        
        itemsToShow.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            
            if (item.isVideo) {
                portfolioItem.innerHTML = `
                    <video muted loop playsinline preload="metadata" poster="">
                        <source src="${item.image}" type="video/mp4">
                        <source src="${item.image}" type="video/mov">
                    </video>
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="video-indicator">▶</div>
                        </div>
                    </div>
                `;
                
                // Add hover effects for videos with performance optimization
                const video = portfolioItem.querySelector('video');
                let playPromise = null;
                
                portfolioItem.addEventListener('mouseenter', () => {
                    if (video.readyState >= 2) { // HAVE_CURRENT_DATA
                        playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.log('Video play failed:', error);
                            });
                        }
                    }
                });
                
                portfolioItem.addEventListener('mouseleave', () => {
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            video.pause();
                            video.currentTime = 0;
                        }).catch(error => {
                            console.log('Video pause failed:', error);
                        });
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            } else {
                portfolioItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
                
                // Apply optimization to the image
                const img = portfolioItem.querySelector('img');
                optimizeImage(img);
            }
            
            // Add click event for modal
            portfolioItem.addEventListener('click', () => {
                openModal(item.image, portfolioData.indexOf(item), item.isVideo);
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Get current filtered data
    function getCurrentData() {
        if (currentFilter === 'all') {
            return portfolioData;
        } else {
            return portfolioData.filter(item => item.category === currentFilter);
        }
    }

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-filter');
            showingAll = false; // Reset to limited view when filtering
            
            const filteredData = getCurrentData();
            createPortfolioItems(filteredData, showingAll);
            
            // Re-apply scroll animations to new items
            setTimeout(() => {
                const newItems = document.querySelectorAll('.portfolio-item');
                newItems.forEach((item, index) => {
                    item.classList.add('fade-in');
                    item.style.transitionDelay = `${index * 0.1}s`;
                    setTimeout(() => item.classList.add('visible'), 50);
                });
            }, 50);
        });
    });

    // See More button functionality
    seeMoreBtn.addEventListener('click', () => {
        showingAll = true;
        const currentData = getCurrentData();
        createPortfolioItems(currentData, showingAll);
        
        // Re-apply scroll animations to new items
        setTimeout(() => {
            const newItems = document.querySelectorAll('.portfolio-item');
            newItems.forEach((item, index) => {
                item.classList.add('fade-in');
                item.style.transitionDelay = `${index * 0.1}s`;
                setTimeout(() => item.classList.add('visible'), 50);
            });
        }, 50);
    });

    // Initialize with limited items
    createPortfolioItems(portfolioData, showingAll);
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalVideoSource = document.getElementById('modal-video-source');
    const modalVideoSourceMov = document.getElementById('modal-video-source-mov');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentMediaIndex = 0;
    let currentMediaItems = [];

    window.openModal = function(mediaSrc, index, isVideo = false) {
        modal.style.display = 'block';
        currentMediaIndex = index;
        
        // Get current filtered items
        const visibleItems = document.querySelectorAll('.portfolio-item');
        currentMediaItems = Array.from(visibleItems).map(item => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            return {
                src: img ? img.src : video.querySelector('source').src,
                isVideo: !!video
            };
        });
        
        // Show appropriate media type
        if (isVideo) {
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideoSource.src = mediaSrc;
            modalVideoSourceMov.src = mediaSrc;
            modalVideo.load();
        } else {
            modalVideo.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = mediaSrc;
        }
        
        document.body.style.overflow = 'hidden';
    };

    function closeModal() {
        modal.style.display = 'none';
        modalVideo.pause();
        document.body.style.overflow = 'auto';
    }

    function showPrevMedia() {
        currentMediaIndex = currentMediaIndex > 0 ? currentMediaIndex - 1 : currentMediaItems.length - 1;
        const currentItem = currentMediaItems[currentMediaIndex];
        
        if (currentItem.isVideo) {
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideoSource.src = currentItem.src;
            modalVideoSourceMov.src = currentItem.src;
            modalVideo.load();
        } else {
            modalVideo.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = currentItem.src;
        }
    }

    function showNextMedia() {
        currentMediaIndex = currentMediaIndex < currentMediaItems.length - 1 ? currentMediaIndex + 1 : 0;
        const currentItem = currentMediaItems[currentMediaIndex];
        
        if (currentItem.isVideo) {
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideoSource.src = currentItem.src;
            modalVideoSourceMov.src = currentItem.src;
            modalVideo.load();
        } else {
            modalVideo.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = currentItem.src;
        }
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevMedia);
    nextBtn.addEventListener('click', showNextMedia);
    
    // Close modal when clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevMedia();
                    break;
                case 'ArrowRight':
                    showNextMedia();
                    break;
            }
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroVideo && scrolled < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Lazy Loading for Images and Videos
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const videos = document.querySelectorAll('video[data-src]');
    
    const mediaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;
                
                if (media.tagName === 'IMG') {
                    media.src = media.dataset.src;
                    media.classList.remove('lazy');
                } else if (media.tagName === 'VIDEO') {
                    const sources = media.querySelectorAll('source');
                    sources.forEach(source => {
                        if (source.dataset.src) {
                            source.src = source.dataset.src;
                        }
                    });
                    media.load();
                    media.classList.remove('lazy');
                }
                
                mediaObserver.unobserve(media);
            }
        });
    }, {
        rootMargin: '50px' // Load media 50px before it comes into view
    });
    
    images.forEach(img => mediaObserver.observe(img));
    videos.forEach(video => mediaObserver.observe(video));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Video memory management
function initVideoMemoryManagement() {
    const videos = document.querySelectorAll('.portfolio-item video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (!entry.isIntersecting) {
                // Pause and reset video when out of view to save memory
                video.pause();
                video.currentTime = 0;
            }
        });
    }, {
        rootMargin: '-100px' // Only manage when completely out of view
    });
    
    videos.forEach(video => videoObserver.observe(video));
}

// Initialize video memory management
document.addEventListener('DOMContentLoaded', initVideoMemoryManagement);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Image optimization function
function optimizeImage(img) {
    // Add loading attribute for native lazy loading support
    img.loading = 'lazy';
    
    // Add decoding hint for better performance
    img.decoding = 'async';
    
    // Add error handling
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=' + encodeURIComponent(this.alt || 'Image');
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-dependent functions here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/editorial/IMG_3398.JPG',
        'assets/editorial/1_ 48.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);