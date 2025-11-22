// Menu Mobile
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');

function toggleMenu() {
    const isActive = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', !isActive);
    document.body.style.overflow = isActive ? '' : 'hidden';
}

mobileMenu.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link ou no overlay
function closeMenu() {
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

menuOverlay.addEventListener('click', closeMenu);

// Fechar menu com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Debounce para melhor performance no scroll
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

// Header scroll effect
window.addEventListener('scroll', debounce(function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 10px 30px rgba(16, 20, 23, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(16, 20, 23, 0.1)';
    }

    // Atualizar navegação ativa
    updateActiveNav();
}, 10));

// Atualizar navegação ativa
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Animação suave ao rolar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Inicializar animações
function initAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .mv-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}


// Adicionar classe active ao header no carregamento
window.addEventListener('load', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    }

    // Inicializar animações
    initAnimations();

    // Carregamento suave de imagens
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function () {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function () {
                console.warn('Erro ao carregar imagem:', this.src);
            });
        }
    });
});

// Melhorias de acessibilidade - foco visível
document.addEventListener('keyup', function (e) {
    if (e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function () {
    document.documentElement.classList.remove('keyboard-nav');
});

// Prevenir zoom em inputs no iOS
document.addEventListener('touchstart', function () { }, { passive: true });

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    updateActiveNav();

    // Adicionar loading lazy para imagens que não tem
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Performance: Preconnect para fonts
const preconnectLinks = [
    'https://cdnjs.cloudflare.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
];

preconnectLinks.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
});