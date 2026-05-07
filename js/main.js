/**
 * אורית בן אלי - משרד עורכי דין
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initScrollReveal();
    initContactForm();
    initGoogleReviews();
    initCounterAnimation();
});

/**
 * Header Scroll Effect
 */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        const name = form.querySelector('#name');
        const phone = form.querySelector('#phone');
        const subject = form.querySelector('#subject');
        
        let isValid = true;

        // Clear previous errors
        form.querySelectorAll('.error').forEach(el => el.remove());

        // Validate name
        if (!name?.value.trim()) {
            showError(name, 'נא להזין שם מלא');
            isValid = false;
        }

        // Validate phone
        if (!phone?.value.trim()) {
            showError(phone, 'נא להזין מספר טלפון');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'נא להזין מספר טלפון תקין');
            isValid = false;
        }

        // Validate subject
        if (!subject?.value) {
            showError(subject, 'נא לבחור נושא פנייה');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> הפנייה נשלחה בהצלחה!';
            submitBtn.disabled = true;
            submitBtn.style.background = '#28a745';

            // In production, you would send the form data to a server here
            // For now, we'll just show a success message
            
            setTimeout(() => {
                alert('תודה על פנייתך! נחזור אליך בהקדם.');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 1500);
        }
    });

    function showError(input, message) {
        const error = document.createElement('span');
        error.className = 'error';
        error.style.cssText = 'color: #dc3545; font-size: 0.85rem; display: block; margin-top: 5px;';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = '#dc3545';
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            const errorEl = this.parentNode.querySelector('.error');
            if (errorEl) errorEl.remove();
        }, { once: true });
    }

    function isValidPhone(phone) {
        // Israeli phone number validation
        const cleanPhone = phone.replace(/[\s\-]/g, '');
        return /^(0[23489]\d{7}|05\d{8}|97[23]\d{8,9})$/.test(cleanPhone);
    }
}

/**
 * Google Reviews Display
 * Note: In production, you would fetch real reviews from Google Places API
 */
function initGoogleReviews() {
    const reviewsContainer = document.querySelector('.google-reviews');
    if (!reviewsContainer) return;

    // Sample data - replace with actual API call in production
    const reviewData = {
        rating: 5.0,
        totalReviews: 47,
        reviews: [
            { author: 'דניאל כהן', rating: 5, text: 'עורכת דין מצוינת!', time: 'לפני חודש' },
            { author: 'רחלי לוי', rating: 5, text: 'מקצועית ואנושית', time: 'לפני חודשיים' }
        ]
    };

    // Update rating display
    const ratingNumber = reviewsContainer.querySelector('.rating-number');
    const reviewCount = reviewsContainer.querySelector('.review-count');
    
    if (ratingNumber) ratingNumber.textContent = reviewData.rating.toFixed(1);
    if (reviewCount) reviewCount.textContent = `(${reviewData.totalReviews} ביקורות)`;
}

/**
 * Counter Animation for Stats
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stats-number, .stat-number');
    
    if (counters.length === 0) return;

    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    
    if (!match) return;
    
    const target = parseInt(match[1]);
    const suffix = text.replace(/\d+/, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

/**
 * Active Navigation Link
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// Initialize active nav tracking
updateActiveNavLink();

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

initLazyLoading();

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
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

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
