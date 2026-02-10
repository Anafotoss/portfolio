/* ============================================
   ANA FOTOS — PHOTOGRAPHY PORTFOLIO
   Main Script v2.0
   ============================================ */

// --- 1. PRELOADER ---
window.addEventListener('load', () => {
    const loaderBar = document.querySelector('.loader-bar');
    const loaderCounter = document.querySelector('.loader-counter');
    const preloader = document.querySelector('.preloader');

    // Animate loader bar
    if (loaderBar) loaderBar.style.width = '100%';
    if (loaderCounter) loaderCounter.textContent = '100%';

    setTimeout(() => {
        gsap.to(preloader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                initAnimations();
            }
        });
    }, 800);
});

// --- 2. SMOOTH SCROLL (LENIS + GSAP SYNC) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

// Sync Lenis with GSAP's ScrollTrigger for frame-perfect performance
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- 3. MENU LOGIC & SCROLL LOCK ---
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    document.body.classList.toggle('menu-open');

    if (isMenuOpen) {
        lenis.stop();
    } else {
        lenis.start();
    }
}

// Make toggleMenu globally accessible
window.toggleMenu = toggleMenu;

// --- 4. LIGHTBOX WITH NAVIGATION ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
let galleryImages = [];
let currentImageIndex = 0;

// Build gallery images array after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
});

function openLightbox(element) {
    const img = element.querySelector('img');
    const fullSrc = img.getAttribute('data-full') || img.src;

    // Find the index of this image
    currentImageIndex = galleryImages.indexOf(img);

    lightboxImg.src = fullSrc;
    lightbox.classList.add('active');
    updateLightboxCounter();
    lenis.stop();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    if (!isMenuOpen) lenis.start();
}

function navigateLightbox(direction) {
    if (galleryImages.length === 0) return;

    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentImageIndex];
    const fullSrc = img.getAttribute('data-full') || img.src;

    // Smooth transition
    gsap.to(lightboxImg, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
            lightboxImg.src = fullSrc;
            updateLightboxCounter();
            gsap.to(lightboxImg, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

function updateLightboxCounter() {
    if (lightboxCounter && galleryImages.length > 0) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
}

// Make functions globally accessible
window.openLightbox = openLightbox;
window.navigateLightbox = navigateLightbox;

// Lightbox event listeners
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// --- 5. KEYBOARD NAVIGATION ---
document.addEventListener('keydown', (e) => {
    // Escape closes lightbox or menu
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (isMenuOpen) {
            toggleMenu();
        }
    }

    // Arrow keys for lightbox navigation
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            navigateLightbox(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            navigateLightbox(-1);
        }
    }
});

// --- 6. CUSTOM CURSOR ---
const isTouch = window.matchMedia("(pointer: coarse)").matches;

if (!isTouch) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0 });
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursorCircle.style.left = `${cursorX}px`;
        cursorCircle.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover trigger for interactive elements
    document.querySelectorAll('.hover-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// --- 7. GSAP ANIMATIONS ---
function initAnimations() {
    // 7a. Parallax for images with data-speed
    document.querySelectorAll('img[data-speed]').forEach(img => {
        gsap.to(img, {
            y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed * 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0
            }
        });
    });

    // 7b. Split text reveals (titles)
    const titles = document.querySelectorAll('.split-text');
    titles.forEach(title => {
        const split = new SplitType(title, { types: 'chars' });
        gsap.from(split.chars, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: title,
                start: "top 90%"
            }
        });
    });

    // 7c. Text block reveal
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: text,
                start: "top 90%"
            }
        });
    });

    // 7d. Gallery items — staggered entrance
    const galleryItems = gsap.utils.toArray('.gallery-item');
    galleryItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.05,
            scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none none"
            }
        });
    });

    // 7e. Section headers reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: header,
                start: "top 88%"
            }
        });
    });

    // 7f. About image reveal
    gsap.utils.toArray('.about-image-wrapper').forEach(wrapper => {
        gsap.from(wrapper, {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%"
            }
        });
    });

    // 7g. Scroll indicator fade out
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: scrollIndicator,
                start: "top 60%",
                end: "top 30%",
                scrub: true
            }
        });
    }

    // 7h. Footer reveal
    const footer = document.querySelector('footer');
    if (footer) {
        gsap.from(footer.children, {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: footer,
                start: "top 90%"
            }
        });
    }

    ScrollTrigger.refresh();
}
