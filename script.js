// Advanced JavaScript for Rumit Vasoya's Portfolio

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initParticles();
    initTextAnimations();
    initScrollAnimations();
    initProjectCards();
    initContactForm();
    initThemeToggle();
    
    // Initialize EmailJS
    emailjs.init("MzqQDD5jsc2L0JWpv");
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            // Add focus to close button for accessibility
            if (closeMenuButton) {
                closeMenuButton.focus();
            }
        });
    }
    
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            // Return focus to menu button
            if (mobileMenuButton) {
                mobileMenuButton.focus();
            }
        });
    }
    
    // Close menu when clicking on links
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            // Focus on the clicked link's target section
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.focus();
                    }, 100);
                }
            }
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            if (mobileMenuButton) {
                mobileMenuButton.focus();
            }
        }
    });
}

// Particle Background System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create new particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 25px
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random color variation
        const hue = 170 + Math.random() * 20 - 10; // Teal variations
        particle.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
        
        // Random animation
        const duration = Math.random() * 20 + 10; // 10-30 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Text Splitting and Animation
function initTextAnimations() {
    // Hero heading split text animation
    const heroHeading = document.getElementById('hero-heading');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            heroHeading.appendChild(span);
            
            // Staggered animation
            gsap.from(span, {
                duration: 0.8,
                y: 50,
                opacity: 0,
                delay: index * 0.03,
                ease: "back.out(1.7)"
            });
        });
    }
    
    // Subheading animation
    const subheading = document.querySelector('.subheading');
    if (subheading) {
        gsap.from(subheading, {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.5,
            ease: "power2.out"
        });
    }
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // Fade up animations for elements with 'fade-up-element' class
    gsap.utils.toArray('.fade-up-element').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.1
        });
    });
    
    // Skill bars animation
    gsap.utils.toArray('.skill-progress-inner').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        ScrollTrigger.create({
            trigger: bar.parentElement,
            start: "top 80%",
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Project Card Interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Mouse move effect for 3D tilt
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / cardRect.width) * 10;
            const rotateX = -(mouseY / cardRect.height) * 10;
            
            gsap.to(card, {
                rotationY: rotateY,
                rotationX: rotateX,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Honeypot check
        const honeypot = document.getElementById('hp-field');
        if (honeypot && honeypot.value !== '') {
            console.log('Bot detected');
            return; // Bot detected
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone number validation (if provided)
        if (data.phone && data.phone.trim() !== '') {
            const phoneRegex = /^[+]?[0-9][\s\-0-9]{7,}$/;
            if (!phoneRegex.test(data.phone)) {
                showFormMessage('Please enter a valid phone number.', 'error');
                return;
            }
        }
        
        // Send email using EmailJS
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send the email
        emailjs.send("service_vjkcoi5", "template_54701de", {
            from_name: data.name,
            from_email: data.email,
            phone_number: data.phone || 'Not provided',
            message: data.message
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    // Set message content and style
    formMessage.textContent = message;
    formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
    
    if (type === 'success') {
        formMessage.classList.add('bg-green-100', 'text-green-800');
    } else {
        formMessage.classList.add('bg-red-100', 'text-red-800');
    }
    
    formMessage.classList.remove('hidden');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    // Check for saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Update icon based on current theme
    updateThemeIcon();
    
    // Add theme toggle button (if exists in HTML)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Add mobile theme toggle button (if exists in HTML)
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

// Toggle theme function
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

// Update theme icon based on current theme
function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Update desktop theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Update mobile theme toggle icon
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        const icon = mobileThemeToggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Performance optimizations
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        gsap.globalTimeline.timeScale(0);
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Perform scroll-related updates here
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Export functions for potential external use
window.Portfolio = {
    initMobileMenu,
    initParticles,
    initTextAnimations,
    initScrollAnimations,
    initProjectCards,
    initContactForm,
    initThemeToggle
};