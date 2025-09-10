// The Junction Dubai - Interactive Features & Language Support
document.addEventListener('DOMContentLoaded', function() {
    
    // State management
    let currentLanguage = 'en';
    let isLoading = true;
    let isModalOpen = false;
    
    // DOM Elements
    const loadingScreen = document.getElementById('loadingScreen');
    const languageToggle = document.getElementById('languageToggle');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    
    // Initialize app
    init();
    
    function init() {
        setupLoadingScreen();
        setupLanguageToggle();
        setupMobileMenu();
        setupSmoothScrolling();
        setupIntersectionObserver();
        setupNewsletterForm();
        setupGallery();
        
        // Show content after brief loading
        setTimeout(() => {
            hideLoadingScreen();
        }, 1500);
    }
    
    /**********************
     Loading Screen
    **********************/
    function setupLoadingScreen() {
        // Stage lights animation start immediately
        const stageLights = document.querySelector('.stage-lights');
        if (stageLights) {
            stageLights.style.animationDuration = '2s';
        }
    }
    
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                languageToggle.style.display = 'flex';
                isLoading = false;
            }, 300);
        }
    }
    
    /**********************
     Language Toggle
    **********************/
    function setupLanguageToggle() {
        if (!languageToggle) return;
        
        const langButtons = languageToggle.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                switchLanguage(lang);
                updateActiveButton(btn, langButtons);
            });
        });
    }
    
    function switchLanguage(lang) {
        currentLanguage = lang;
        const html = document.documentElement;
        
        // Update HTML attributes
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update all text content
        const elementsWithLang = document.querySelectorAll('[data-en], [data-ar]');
        elementsWithLang.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update placeholders
        const elementsWithPlaceholder = document.querySelectorAll(`[data-${lang}-placeholder]`);
        elementsWithPlaceholder.forEach(element => {
            const placeholder = element.getAttribute(`data-${lang}-placeholder`);
            if (placeholder) {
                element.setAttribute('placeholder', placeholder);
            }
        });
        
        // Add smooth transition class
        document.body.classList.add('lang-switching');
        setTimeout(() => {
            document.body.classList.remove('lang-switching');
        }, 300);
    }
    
    function updateActiveButton(activeBtn, allButtons) {
        allButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    /**********************
     Mobile Navigation
    **********************/
    function setupMobileMenu() {
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navToggle.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
    
    function closeMobileMenu() {
        navMenu.style.display = 'none';
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
    
    /**********************
     Smooth Scrolling
    **********************/
    function setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                closeMobileMenu();
            });
        });
        
        // Scroll indicator click
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    /**********************
     Intersection Observer for Animations
    **********************/
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for cards
                    if (entry.target.classList.contains('about-grid') || 
                        entry.target.classList.contains('workshop-grid')) {
                        const cards = entry.target.querySelectorAll('.about-card, .workshop-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                    
                    // Stagger animation for gallery items
                    if (entry.target.classList.contains('gallery-grid')) {
                        const items = entry.target.querySelectorAll('.gallery-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.about-grid, .workshop-grid, .events-status, .gallery-grid, .newsletter-content');
        animateElements.forEach(el => {
            observer.observe(el);
            
            // Initial state for cards
            if (el.classList.contains('about-grid') || el.classList.contains('workshop-grid')) {
                const cards = el.querySelectorAll('.about-card, .workshop-card');
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                });
            }
            
            // Initial state for gallery items
            if (el.classList.contains('gallery-grid')) {
                const items = el.querySelectorAll('.gallery-item');
                items.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                });
            }
        });
    }
    
    /**********************
     Newsletter Form
    **********************/
    function setupNewsletterForm() {
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email && isValidEmail(email)) {
                // Simulate API call
                const submitButton = newsletterForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = currentLanguage === 'ar' ? 'جارٍ الإرسال...' : 'Subscribing...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    newsletterForm.style.display = 'none';
                    newsletterSuccess.style.display = 'block';
                    
                    // Reset after 5 seconds
                    setTimeout(() => {
                        newsletterForm.style.display = 'grid';
                        newsletterSuccess.style.display = 'none';
                        newsletterForm.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    
    function showVideoModal() {
        // Ensure navbar stays visible
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.zIndex = '2100'; // Higher than modal
        }
        
        // Create video modal overlay
        const videoModal = document.createElement('div');
        videoModal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.95);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            padding-top: 6rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        videoModal.innerHTML = `
            <div style="
                position: relative;
                width: 100%;
                max-width: 900px;
                aspect-ratio: 16/9;
                background: var(--surface);
                border-radius: var(--radius-lg);
                overflow: hidden;
                box-shadow: var(--shadow-lg);
            ">
                <button id="closeVideoModal" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                ">&times;</button>
                
                <div style="
                    width: 100%;
                    height: 100%;
                    background: 
                        linear-gradient(135deg, rgba(21,17,16,0.8), rgba(0,0,0,0.6)),
                        url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    color: var(--text);
                    padding: 2rem;
                ">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: rgba(212,163,115,0.9);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 2rem;
                        color: var(--bg);
                    ">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5.14v13.72L19 12L8 5.14z" fill="currentColor"/>
                        </svg>
                    </div>
                    
                    <h2 style="margin: 0 0 1rem; color: var(--accent);">${currentLanguage === 'ar' ? 'قصة ذا جانكشن' : 'The Junction Story'}</h2>
                    <p style="margin: 0 0 1.5rem; color: var(--muted); max-width: 60ch; line-height: 1.6;">${currentLanguage === 'ar' ? 'اكتشف كيف أصبح ذا جانكشن دبي مساحة فنون أداء نابضة بالحياة صُنعت من قِبل الفنانين للفنانين. رحلة إبداعية تحتفل بالمواهب المحلية والإقليمية.' : 'Discover how The Junction Dubai became a vibrant performing arts space made by performers for performers. A creative journey celebrating local and regional talent.'}</p>
                    
                    <div style="
                        background: rgba(255,255,255,0.1);
                        padding: 1rem 2rem;
                        border-radius: var(--radius);
                        border: 1px solid rgba(255,255,255,0.1);
                    ">
                        <p style="margin: 0; font-size: 0.9rem; color: var(--muted);">
                            ${currentLanguage === 'ar' ? '🎬 الفيديو قريباً - نعمل على إنتاج محتوى رائع لك!' : '🎬 Video Coming Soon - We\'re creating amazing content for you!'}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(videoModal);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        isModalOpen = true; // Disable scroll listener
        
        // Fade in
        setTimeout(() => {
            videoModal.style.opacity = '1';
        }, 10);
        
        // Close modal functionality
        const closeVideoModal = () => {
            videoModal.style.opacity = '0';
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset navbar z-index and modal state
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.zIndex = '100'; // Back to original
            }
            isModalOpen = false; // Re-enable scroll listener
            
            setTimeout(() => {
                document.body.removeChild(videoModal);
            }, 300);
        };
        
        // Close on overlay click
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
        
        // Close button
        videoModal.querySelector('#closeVideoModal').addEventListener('click', closeVideoModal);
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeVideoModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
    }
    
    /**********************
     Gallery Interactions
    **********************/
    function setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const playButtons = document.querySelectorAll('.play-button-large, .video-placeholder');
        
        // Add click handlers for gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const isVideoItem = item.classList.contains('video-item');
                
                if (isVideoItem) {
                    // Handle video click - use the same video modal
                    showVideoModal();
                } else {
                    // Handle image gallery click
                    const overlay = item.querySelector('.gallery-overlay');
                    if (overlay) {
                        const title = overlay.querySelector('h3').textContent;
                        const description = overlay.querySelector('p').textContent;
                        
                        // Create a simple modal effect
                        showImageModal(title, description);
                    }
                }
            });
            
            // Add hover sound effect (visual only)
            item.addEventListener('mouseenter', () => {
                item.style.boxShadow = 'var(--shadow-lg)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = 'none';
            });
        });
    }
    
    function showImageModal(title, description) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(21,17,16,0.95);
            z-index: 1000;
            display: grid;
            place-items: center;
            padding: 2rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--surface);
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: var(--radius-lg);
                padding: 2rem;
                max-width: 500px;
                text-align: center;
                box-shadow: var(--shadow-lg);
            ">
                <h3 style="color: var(--accent); margin-bottom: 1rem;">${title}</h3>
                <p style="color: var(--muted); margin-bottom: 1.5rem;">${description}</p>
                <button id="closeModal" style="
                    background: var(--accent);
                    color: var(--bg);
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 999px;
                    cursor: pointer;
                    font-weight: 600;
                ">${currentLanguage === 'ar' ? 'إغلاق' : 'Close'}</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        modal.querySelector('#closeModal').addEventListener('click', closeModal);
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
    }
    
    /**********************
     Button Interactions
    **********************/
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    /**********************
     Navbar Scroll Effect
    **********************/
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Don't hide navbar when modal is open
        if (isModalOpen) {
            navbar.style.transform = 'translateY(0)';
            return;
        }
        
        // Only hide navbar when scrolling down significantly and not at the top
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or near top - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur effect based on scroll position
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = 'saturate(140%) blur(20px)';
            navbar.style.background = 'linear-gradient(180deg, rgba(21,17,16,0.95), rgba(21,17,16,0.85))';
        } else {
            navbar.style.backdropFilter = 'saturate(140%) blur(10px)';
            navbar.style.background = 'linear-gradient(180deg, rgba(21,17,16,0.9), rgba(21,17,16,0.6))';
        }
        
        lastScrollY = window.scrollY;
    });
    
    /**********************
     Performance Optimization
    **********************/
    
    // Lazy load background images
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bg = entry.target.getAttribute('data-bg');
                    entry.target.style.backgroundImage = `url(${bg})`;
                    bgObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
    }
    
    // Preload critical resources
    function preloadResources() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('Preloading', criticalImages.length, 'critical images from Unsplash');
    }
    
    preloadResources();
});

/**********************
 Additional CSS for animations
**********************/
const additionalStyles = `
.lang-switching * {
    transition: all 0.3s ease;
}

.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}


.animate-in {
    animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
