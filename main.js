// Typing effect for landing section
const titles = [
    "Lead Developer",
    "Microservices & API Architect",
    "Tech Team Mentor",
    "Cloud Native Solutions",
    "Freelancer"
];
let titleIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');

function type() {
    const current = titles[titleIndex];
    if (isDeleting) {
        charIndex--;
        typedText.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(type, 600);
        } else {
            setTimeout(type, 40);
        }
    } else {
        charIndex++;
        typedText.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(type, 1200);
        } else {
            setTimeout(type, 80);
        }
    }
}
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 600);
});

// Hide all sections except landing on load, then reveal on scroll or nav
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        if (sec === section) {
            sec.classList.add('visible');
        } else if (!sec.classList.contains('landing')) {
            sec.classList.remove('visible');
            sec.style.display = 'none';
        }
    });
    section.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', () => {
    // Only show landing on load
    document.querySelectorAll('.section').forEach(sec => {
        if (!sec.classList.contains('landing')) {
            sec.classList.remove('visible');
        } else {
            sec.classList.add('visible');
        }
    });

    // Progressive reveal on scroll
    const sections = document.querySelectorAll('.section:not(.landing)');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll-down indicator click/scroll triggers next section
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    const revealNextSection = () => {
        const nextSection = document.querySelector('.section:not(.landing):not(.visible)');
        if (nextSection) {
            nextSection.classList.add('visible');
            // Use scrollIntoView with block: 'center' for better alignment
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', revealNextSection);
    }

    // Allow mouse wheel or touchpad scroll to reveal next section from landing
    let landingRevealed = false;
    const wheelHandler = (e) => {
        if (!landingRevealed && window.scrollY < 50 && e.deltaY > 0) {
            revealNextSection();
            landingRevealed = true;
            setTimeout(() => { landingRevealed = false; }, 1000);
        }
    };
    window.addEventListener('wheel', wheelHandler, { passive: true });

    // Fix nav links: reveal all sections and scroll to target
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Reveal all previous sections up to and including the target
                let found = false;
                document.querySelectorAll('.section').forEach(sec => {
                    if (sec === target) found = true;
                    if (!found && !sec.classList.contains('landing')) {
                        sec.classList.add('visible');
                    }
                    if (sec === target) {
                        sec.classList.add('visible');
                    }
                });
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Micro-interaction: bounce on skill badge hover
const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.13) translateY(-4px)';
        badge.style.transition = 'transform 0.18s';
    });
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = '';
    });
});
