// ==================== Navigation Menu Toggle ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Remove preload class after a brief delay to enable transitions
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);
});

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update navbar background based on theme and scroll position
    updateNavbarBackground();
});

// Update navbar background based on theme
function updateNavbarBackground() {
    const currentScroll = window.pageYOffset;
    const theme = html.getAttribute('data-theme');
    
    if (theme === 'light') {
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 235, 205, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 235, 205, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    } else {
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// ==================== Navbar Scroll Effect ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    updateNavbarBackground();
    lastScroll = currentScroll;
});

// ==================== Scroll to Top Button ====================
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Smooth Scroll for Navigation Links ====================
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

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = document.querySelectorAll('.section, .skill-card, .project-card, .timeline-item, .education-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Contact Form Submission ====================
const scriptURL = 'https://script.google.com/macros/s/AKfycbwuNzwVGpmPUTaPpYEaDIzt-OEx2oVTCpa8_PJTiOx_c57klHrwhLKXwhuk-D7KO1pC/exec';
const form = document.forms['submit-to-google-sheet'];
const formMsg = document.getElementById('formMsg');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading message
        formMsg.innerHTML = 'Sending...';
        formMsg.style.color = '#6366f1';
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                formMsg.innerHTML = '✓ Message sent successfully!';
                formMsg.style.color = '#10b981';
                setTimeout(() => {
                    formMsg.innerHTML = '';
                }, 5000);
                form.reset();
            })
            .catch(error => {
                formMsg.innerHTML = '✗ Error sending message. Please try again.';
                formMsg.style.color = '#ef4444';
                console.error('Error!', error.message);
            });
    });
}

// ==================== Typing Effect for Hero Section (Optional) ====================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }, 500);
}

// ==================== Coder Cursor Trail Effect ====================
// Code symbols that represent a developer
const codeSymbols = [
    '{', '}', '<', '>', '(', ')', '[', ']', 
    ';', '/', '$', '#', '=', '+', '-', '*',
    '=>', '{ }', '< />', '++', '--', '&&', '||',
    'fn', 'if', '!=', '==', '::', '0', '1'
];
let lastTrailTime = 0;
const trailDelay = 50; // milliseconds between each symbol

// Only show on desktop
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        
        // Throttle trail creation
        if (currentTime - lastTrailTime < trailDelay) return;
        lastTrailTime = currentTime;
        
        // Create trail element
        const trail = document.createElement('div');
        const symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        
        trail.textContent = symbol;
        trail.className = 'cursor-trail';
        
        // Get current theme color
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'light' ? '#f97316' : '#6366f1';
        
        // Random size variation for more organic feel
        const size = 14 + Math.random() * 6; // 14-20px
        
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            color: ${color};
            font-family: 'Courier New', monospace;
            font-size: ${size}px;
            font-weight: bold;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transform: translate(-50%, -50%);
            animation: fadeTrail 1.2s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        // Remove element after animation
        setTimeout(() => {
            trail.remove();
        }, 1200);
    });
}

// Add CSS animations for trail
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeTrail {
        0% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        50% {
            transform: translate(-50%, -60px) scale(0.8) rotate(5deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -80px) scale(0.3) rotate(10deg);
        }
    }
    
    .cursor-trail {
        user-select: none;
        text-shadow: 0 0 10px currentColor;
    }
`;
document.head.appendChild(style);

// ==================== Active Navigation Link on Scroll ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ==================== Parallax Effect for Background Shapes ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== Skill Cards Hover Effect ====================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Project Cards 3D Effect ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== Stats Counter Animation ====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text);
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = text;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + text.replace(/[0-9]/g, '');
                    }
                }, 30);
            }
            
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

statNumbers.forEach(stat => statsObserver.observe(stat));

// ==================== Console Easter Egg ====================
console.log('%c👋 Hello Developer!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'color: #94a3b8; font-size: 14px;');
console.log('%cEmail: kaflesanatan100@gmail.com', 'color: #8b5cf6; font-size: 12px;');

// ==================== Performance Optimization ====================
// Debounce function for scroll events
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations handled here
}, 10));

console.log('🚀 Portfolio loaded successfully!');

