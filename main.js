// Theme toggle: follows the system setting until the visitor picks one
function currentTheme() {
    const set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Header border once the page scrolls
    const header = document.querySelector('.site-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Fade elements in as they enter the viewport
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Highlight the nav link of the section in view
    const links = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(sec => sectionObserver.observe(sec));
});
