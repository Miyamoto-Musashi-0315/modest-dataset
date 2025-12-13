// Floating Navbar Functionality
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
let scrollThreshold = 100;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.highlight-item, .visualization-block, .table-section');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
});

// Gallery System - Track current slides for each gallery
const galleryStates = {};

function getGalleryElements(galleryName) {
    const gallery = document.querySelector(`.image-gallery[data-gallery="${galleryName}"]`);
    const dotsContainer = document.querySelector(`.gallery-dots[data-gallery="${galleryName}"]`);
    
    if (!gallery || !dotsContainer) return null;
    
    return {
        slides: gallery.querySelectorAll('.gallery-slide'),
        dots: dotsContainer.querySelectorAll('.gallery-dot')
    };
}

function initializeGalleries() {
    const galleries = document.querySelectorAll('.image-gallery[data-gallery]');
    galleries.forEach(gallery => {
        const name = gallery.dataset.gallery;
        galleryStates[name] = 0;
    });
}

function showGallerySlide(galleryName, index) {
    const elements = getGalleryElements(galleryName);
    if (!elements) return;
    
    const { slides, dots } = elements;
    const totalSlides = slides.length;
    
    // Handle wrap-around
    if (index >= totalSlides) {
        galleryStates[galleryName] = 0;
    } else if (index < 0) {
        galleryStates[galleryName] = totalSlides - 1;
    } else {
        galleryStates[galleryName] = index;
    }
    
    const currentIndex = galleryStates[galleryName];
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentIndex) {
            slide.classList.add('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentIndex) {
            dot.classList.add('active');
        }
    });
}

function changeGallerySlide(galleryName, direction) {
    const currentIndex = galleryStates[galleryName] || 0;
    showGallerySlide(galleryName, currentIndex + direction);
}

function goToGallerySlide(galleryName, index) {
    showGallerySlide(galleryName, index);
}

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(imgElement) {
    lightboxImage.src = imgElement.src;
    lightboxImage.alt = imgElement.alt;
    
    // Get caption from sibling element
    const label = imgElement.parentElement.querySelector('.gallery-label');
    lightboxCaption.textContent = label ? label.textContent : imgElement.alt;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Prevent closing when clicking on the image itself
if (lightboxImage) {
    lightboxImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Keyboard navigation for galleries
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) return;
    
    // Find the gallery that's currently in view
    const galleries = document.querySelectorAll('.image-gallery[data-gallery]');
    let visibleGallery = null;
    
    galleries.forEach(gallery => {
        const rect = gallery.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
            visibleGallery = gallery.dataset.gallery;
        }
    });
    
    if (visibleGallery) {
        if (e.key === 'ArrowLeft') {
            changeGallerySlide(visibleGallery, -1);
        } else if (e.key === 'ArrowRight') {
            changeGallerySlide(visibleGallery, 1);
        }
    }
});

// Initialize galleries on page load
document.addEventListener('DOMContentLoaded', initializeGalleries);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
let currentTouchGallery = null;

document.addEventListener('touchstart', function(e) {
    const gallery = e.target.closest('.image-gallery[data-gallery]');
    if (gallery) {
        touchStartX = e.changedTouches[0].screenX;
        currentTouchGallery = gallery.dataset.gallery;
    }
}, false);

document.addEventListener('touchend', function(e) {
    if (!currentTouchGallery) return;
    
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    currentTouchGallery = null;
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeGallerySlide(currentTouchGallery, 1);
        } else {
            // Swipe right - previous slide
            changeGallerySlide(currentTouchGallery, -1);
        }
    }
}
