// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scrolling - NAPRAWIONY
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Zamknij menu mobilne jeśli jest otwarte
            if (nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active navigation highlighting
    highlightActiveSection();
    
    lastScrollY = currentScrollY;
});

// Active Section Highlighting - NOWA FUNKCJA
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Usuń aktywną klasę ze wszystkich linków
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Dodaj aktywną klasę do odpowiedniego linku
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink && activeLink.classList.contains('nav-link')) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Phone Link Confirmation
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            e.preventDefault();
            const phoneNumber = this.textContent;
            if (confirm(`Czy chcesz zadzwonić pod numer ${phoneNumber}?`)) {
                window.location.href = this.getAttribute('href');
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });
});

// Add mobile styles
const style = document.createElement('style');
style.textContent = `
    html {
        scroll-behavior: smooth;
    }
    
    @media (max-width: 768px) {
        .nav.mobile-active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            z-index: 999;
        }
        
        .nav.mobile-active .nav-list {
            flex-direction: column;
            gap: 1rem;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    }
    
    .nav-link.active {
        color: var(--color-yellow) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
