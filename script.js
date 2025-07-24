// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// --- Enhanced Smooth Scroll with Offset for Fixed Nav ---
function smoothScrollTo(targetId) {
    const navHeight = document.querySelector('nav').offsetHeight;
    const target = document.getElementById(targetId);
    if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// --- Section Reveal Animations (Fade/Slide In) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// --- Button Ripple Effect ---
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// --- Ripple Effect Styles (inject if not present) ---
if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.innerHTML = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background: rgba(0,163,255,0.25);
        pointer-events: none;
        width: 120px;
        height: 120px;
        z-index: 10;
        opacity: 0.7;
    }
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    .btn-primary, .btn-secondary { position: relative; overflow: hidden; }
    `;
    document.head.appendChild(style);
}

// --- Animate Project and Skill Cards on Hover (scale, shadow) ---
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.04)';
        card.style.boxShadow = '0 16px 40px 0 rgba(0,163,255,0.18)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});


if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', formProps);
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Message Sent!';
    submitBtn.classList.add('bg-green-600');
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.classList.remove('bg-green-600');
    }, 3000);
});

// --- Active Link Highlighting (unchanged) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-600');
        }
    });
}); 

// --- Nav shadow on scroll for glass effect ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}); 

// --- Hero Section Typewriter Effect ---
document.addEventListener('DOMContentLoaded', function () {
    const typewriterEl = document.getElementById('hero-typewriter');
    if (typewriterEl) {
        const text = 'Backend Developer & AI-ML Developer crafting innovative solutions with code';
        let i = 0;
        function type() {
            if (i <= text.length) {
                typewriterEl.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 32);
            }
        }
        type();
    }
}); 

// --- Hero Section Animated Tagline Cycling ---
document.addEventListener('DOMContentLoaded', function () {
    const taglines = [
        'Passionate about building scalable backend systems',
        'Loves AI, ML, and data-driven solutions',
        'Open source contributor & lifelong learner',
        'Turning ideas into beautiful code',
        'Let\'s build something amazing together!'
    ];
    const taglineEl = document.getElementById('hero-tagline');
    let taglineIdx = 0;
    function showTagline(idx) {
        if (!taglineEl) return;
        taglineEl.classList.remove('fade-in');
        taglineEl.classList.add('fade-out');
        setTimeout(() => {
            taglineEl.textContent = taglines[idx];
            taglineEl.classList.remove('fade-out');
            taglineEl.classList.add('fade-in');
        }, 400);
    }
    if (taglineEl) {
        showTagline(taglineIdx);
        setInterval(() => {
            taglineIdx = (taglineIdx + 1) % taglines.length;
            showTagline(taglineIdx);
        }, 3200);
    }
}); 

// --- Hero Section Typing Animation for Headline ---
document.addEventListener('DOMContentLoaded', function () {
    const typedEl = document.getElementById('hero-typed');
    const cursorEl = document.querySelector('.typed-cursor');
    const words = [
        'Rumit Vasoya',
        'Backend Developer',
        'Full Stack Developer'
    ];
    const typingSpeed = 70;
    const erasingSpeed = 40;
    const delayBetweenWords = 1200;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        if (!typedEl) return;
        const currentWord = words[wordIndex];
        if (!isDeleting) {
            typedEl.textContent = currentWord.substring(0, charIndex + 1);
            console.log('Typing:', currentWord.substring(0, charIndex + 1));
            charIndex++;
            if (charIndex < currentWord.length) {
                setTimeout(typeLoop, typingSpeed);
            } else {
                console.log('Word complete:', currentWord);
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(typeLoop, delayBetweenWords);
                }, delayBetweenWords);
            }
        } else {
            typedEl.textContent = currentWord.substring(0, charIndex - 1);
            console.log('Deleting:', currentWord.substring(0, charIndex - 1));
            charIndex--;
            if (charIndex > 0) {
                setTimeout(typeLoop, erasingSpeed);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                console.log('Next word:', words[wordIndex]);
                setTimeout(typeLoop, 400);
            }
        }
    }
    if (typedEl) {  
        console.log('Starting typing animation');
        typedEl.textContent = '';
        setTimeout(typeLoop, 600);
    }
}); 

// Scroll-triggered animation (90% visible)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.9) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.9 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Particle Profile Effect
const canvas = document.getElementById('profile-particle-canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'images/rumit.JPG'; // Use your profile image path

const PARTICLE_SIZE = 3;
const PARTICLE_GAP = 4;
let particles = [];
let originalPositions = [];
let dispersed = false;

img.onload = () => {
  // Draw image to canvas, then extract pixel data
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI*2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.restore();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  particles = [];
  for (let y = 0; y < canvas.height; y += PARTICLE_GAP) {
    for (let x = 0; x < canvas.width; x += PARTICLE_GAP) {
      const i = (y * canvas.width + x) * 4;
      const alpha = imageData.data[i+3];
      if (alpha > 128) {
        const color = `rgba(${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]},${imageData.data[i+3]/255})`;
        particles.push({x, y, color, tx: x, ty: y});
      }
    }
  }
  originalPositions = particles.map(p => ({x: p.x, y: p.y}));
  drawParticles();
};

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, PARTICLE_SIZE, 0, Math.PI*2);
    ctx.fill();
  }
}

function animateDisperse() {
  dispersed = true;
  for (const p of particles) {
    p.tx = p.x + (Math.random()-0.5)*120;
    p.ty = p.y + (Math.random()-0.5)*120;
  }
  animateParticles();
}

function animateReform() {
  dispersed = false;
  particles.forEach((p, i) => {
    p.tx = originalPositions[i].x;
    p.ty = originalPositions[i].y;
  });
  animateParticles();
}

function animateParticles() {
  let animating = true;
  function step() {
    animating = false;
    for (const p of particles) {
      p.x += (p.tx - p.x) * 0.12;
      p.y += (p.ty - p.y) * 0.12;
      if (Math.abs(p.x - p.tx) > 0.5 || Math.abs(p.y - p.ty) > 0.5) {
        animating = true;
      }
    }
    drawParticles();
    if (animating) requestAnimationFrame(step);
  }
  step();
}

canvas.addEventListener('mouseenter', animateDisperse);
canvas.addEventListener('mouseleave', animateReform);

// Also trigger disperse/reform on scroll
window.addEventListener('scroll', () => {
  const rect = canvas.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    if (!dispersed) animateDisperse();
  } else {
    if (dispersed) animateReform();
  }
}); 