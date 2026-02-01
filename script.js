/**
 * DANILO MOTION - Premium Video Editing Website
 * Optimized JavaScript for Performance
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initVideoLazyLoading();
    initPortfolioHover();
    initVideoEditingHover();
    initVideoModals();
    initLucideIcons();
    
    // Initialize GSAP only if not preferring reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initHeroAnimations();
        initParallaxEffects();
        initScrollReveal();
    }
});

// ============================================
// VIDEO THUMBNAIL LOADING
// ============================================

function initVideoLazyLoading() {
    const videos = document.querySelectorAll('.portfolio-video, .video-editing-video');
    
    // Load video metadata and show first frame as thumbnail
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Load video to show first frame
                if (video.readyState === 0) {
                    video.load();
                    // Seek to frame and pause to show thumbnail
                    video.addEventListener('loadeddata', function onLoad() {
                        video.currentTime = 0.1;
                        video.removeEventListener('loadeddata', onLoad);
                    }, { once: true });
                }
            } else {
                // Pause and reset when out of viewport
                if (!video.paused) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0
    });
    
    videos.forEach(video => videoObserver.observe(video));
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let ticking = false;
    
    // Optimized scroll handler with requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// HERO ANIMATIONS (Lightweight)
// ============================================

function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Simplified hero entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.from('.headline-line-1', { y: 30, opacity: 0, duration: 0.6 })
      .from('.headline-line-2', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.headline-line-3', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-subline', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.stat-item', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.2');
}

// ============================================
// PARALLAX EFFECTS (Optimized)
// ============================================

function initParallaxEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Batch animations for better performance
    const portfolioItems = gsap.utils.toArray('.portfolio-item');
    const videoEditingItems = gsap.utils.toArray('.video-editing-item');
    
    // Use batch for better performance
    ScrollTrigger.batch([...portfolioItems, ...videoEditingItems], {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }),
        onLeaveBack: batch => gsap.to(batch, { opacity: 0.8, y: 20, duration: 0.4 }),
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
    });
}

// ============================================
// PORTFOLIO HOVER INTERACTIONS
// ============================================

function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const video = item.querySelector('.portfolio-video');
        
        item.addEventListener('mouseenter', () => {
            if (video) {
                // Load and play on hover
                video.play().catch(() => {});
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        // Open modal on click
        item.addEventListener('click', () => {
            openWistiaModal('4l08fspoxt');
        });
    });
}

// ============================================
// VIDEO EDITING HOVER INTERACTIONS
// ============================================

function initVideoEditingHover() {
    const videoEditingItems = document.querySelectorAll('.video-editing-item');
    
    videoEditingItems.forEach(item => {
        const video = item.querySelector('.video-editing-video');
        
        item.addEventListener('mouseenter', () => {
            if (video) {
                video.play().catch(() => {});
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        item.addEventListener('click', () => {
            openWistiaModal('4l08fspoxt');
        });
    });
}

// ============================================
// VIDEO MODAL SYSTEM
// ============================================

function initVideoModals() {
    const videoModal = document.getElementById('videoModal');
    
    if (!videoModal) return;
    
    // Showreel button
    const showreelBtn = document.querySelector('.cta-showreel');
    if (showreelBtn) {
        showreelBtn.addEventListener('click', () => {
            openWistiaModal('4l08fspoxt');
        });
    }
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.video-modal');
            closeModal(modal);
        });
    });
    
    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            const modal = e.target.closest('.video-modal');
            closeModal(modal);
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal(videoModal);
        }
    });
}

function openWistiaModal(mediaId) {
    const modal = document.getElementById('videoModal');
    const iframe = modal.querySelector('.modal-wistia');
    
    if (iframe) {
        iframe.src = `https://fast.wistia.net/embed/iframe/${mediaId}`;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    
    const iframe = modal.querySelector('.modal-wistia');
    
    if (iframe) {
        iframe.src = '';
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// SCROLL REVEAL ANIMATIONS (Optimized)
// ============================================

function initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    const revealElements = document.querySelectorAll('.section-header, .about-content');
    
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                once: true // Only animate once for performance
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

// ============================================
// LUCIDE ICONS
// ============================================

function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// CLEANUP ON PAGE HIDE
// ============================================

// Pause all videos when page is hidden
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (document.hidden) {
            video.pause();
        }
    });
});
