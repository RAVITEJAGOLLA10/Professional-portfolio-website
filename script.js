// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

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

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section');

function highlightNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.borderBottom = '3px solid var(--accent-color)';
        } else {
            link.style.borderBottom = 'none';
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and content elements
document.querySelectorAll('.education-card, .project-card, .certification-card, .timeline-content, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// TYPEWRITER EFFECT FOR HERO SUBTITLE
// ============================================

const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;

function typewriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    typewriter(heroSubtitle, originalText, 50);
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ============================================
// FORM SUBMISSION (Contact Section)
// ============================================

// This is a placeholder for contact form handling
// You can integrate with a service like Formspree, Netlify Forms, or EmailJS

const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// SMOOTH SCROLL TO TOP
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Create scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #2563eb, #1e40af);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', scrollToTop);

// ============================================
// PARALLAX EFFECT (Optional)
// ============================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0% ${window.scrollY * 0.5}px`;
    }
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imgObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    }
    
    // Scroll to top with Ctrl+Home
    if (e.ctrlKey && e.key === 'Home') {
        scrollToTop();
    }
});

// ============================================
// DYNAMIC ACTIVE NAV LINK STYLING
// ============================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color);
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION: DEBOUNCE
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Apply debounce to scroll event for better performance
const debouncedScrollHandler = debounce(highlightNavLink, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add subtle animation to all headings
    document.querySelectorAll('h1, h2, h3').forEach((heading, index) => {
        heading.style.animation = `slideInDown 0.6s ease ${index * 0.1}s`;
    });
});

// ============================================
// NOTIFICATION SYSTEM (Optional)
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInUp 0.3s ease;
        z-index: 10000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInDown 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Example usage: showNotification('Welcome to my portfolio!', 'success');

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// You can add copy functionality to contact cards
// document.querySelectorAll('.contact-card').forEach(card => {
//     card.addEventListener('click', () => {
//         const email = card.querySelector('p').textContent;
//         copyToClipboard(email);
//     });
// });

// ============================================
// THEME SWITCHER (Optional - Add if needed)
// ============================================

function initThemeSwitcher() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        document.documentElement.style.colorScheme = 'dark';
    }
    
    prefersDark.addEventListener('change', (e) => {
        document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
    });
}

// Uncomment to enable theme switching
// initThemeSwitcher();
