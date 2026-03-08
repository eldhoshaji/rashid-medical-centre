// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION =====
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close nav when clicking a link
nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== SCROLL REVEAL ANIMATIONS =====
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const top = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (top < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// ===== ADD REVEAL CLASSES TO ELEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));

    // About section
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImage) aboutImage.classList.add('reveal-left');
    if (aboutContent) aboutContent.classList.add('reveal-right');

    // Service cards with stagger
    document.querySelectorAll('.service-card').forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${i * 0.08}s`;
    });

    // Why us section
    const whyContent = document.querySelector('.why-us-content');
    const whyImage = document.querySelector('.why-us-image');
    if (whyContent) whyContent.classList.add('reveal-left');
    if (whyImage) whyImage.classList.add('reveal-right');

    // Doctor cards with stagger
    document.querySelectorAll('.doctor-card').forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    // Testimonial cards with stagger
    document.querySelectorAll('.testimonial-card').forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${i * 0.12}s`;
    });

    // Insurance items
    document.querySelectorAll('.insurance-item').forEach((item, i) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${i * 0.06}s`;
    });

    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-wrapper');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactForm) contactForm.classList.add('reveal-right');

    // Why items stagger
    document.querySelectorAll('.why-item').forEach((item, i) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${i * 0.1}s`;
    });

    // Trigger initial reveal
    reveal();
});

// ===== ANIMATED COUNTER =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        if (counter.dataset.animated) return;

        const rect = counter.getBoundingClientRect();
        if (rect.top > window.innerHeight) return;

        counter.dataset.animated = 'true';
        const text = counter.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * num);
            counter.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== FORM SUBMISSION VIA WHATSAPP =====
const contactFormEl = document.getElementById('contactForm');
if (contactFormEl) {
    contactFormEl.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactFormEl.querySelector('input[type="text"]').value.trim();
        const phone = contactFormEl.querySelector('input[type="tel"]').value.trim();
        const email = contactFormEl.querySelector('input[type="email"]').value.trim();
        const service = contactFormEl.querySelectorAll('select')[0].value;
        const date = contactFormEl.querySelector('input[type="date"]').value;
        const time = contactFormEl.querySelectorAll('select')[1].value;
        const message = contactFormEl.querySelector('textarea').value.trim();

        let text = `*New Appointment Request*%0A%0A`;
        text += `*Name:* ${name}%0A`;
        text += `*Phone:* ${phone}%0A`;
        if (email) text += `*Email:* ${email}%0A`;
        if (service) text += `*Service:* ${service}%0A`;
        if (date) text += `*Preferred Date:* ${date}%0A`;
        if (time) text += `*Preferred Time:* ${time}%0A`;
        if (message) text += `*Message:* ${message}%0A`;

        const whatsappURL = `https://wa.me/919496829962?text=${text}`;
        window.open(whatsappURL, '_blank');

        contactFormEl.reset();
    });
}

// ===== GOOGLE ANALYTICS EVENT TRACKING =====
if (typeof gtag === 'function') {
    // Track service card clicks
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3')?.textContent || 'Unknown';
            gtag('event', 'view_service', {
                event_category: 'Services',
                event_label: serviceName
            });
        });
    });

    // Track CTA button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gtag('event', 'cta_click', {
                event_category: 'Engagement',
                event_label: btn.textContent.trim()
            });
        });
    });

    // Track WhatsApp button click
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            gtag('event', 'whatsapp_click', {
                event_category: 'Contact',
                event_label: 'WhatsApp Float Button'
            });
        });
    }

    // Track phone call clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'phone_call', {
                event_category: 'Contact',
                event_label: link.href
            });
        });
    });

    // Track form submission
    if (contactFormEl) {
        contactFormEl.addEventListener('submit', () => {
            const service = contactFormEl.querySelectorAll('select')[0].value;
            gtag('event', 'form_submit', {
                event_category: 'Conversion',
                event_label: service || 'No service selected'
            });
        });
    }

    // Track section views
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gtag('event', 'section_view', {
                    event_category: 'Engagement',
                    event_label: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
