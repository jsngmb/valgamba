const body = document.body;
const nav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const revealItems = [...document.querySelectorAll('[data-reveal]')];
const mobileMenu = document.querySelector('.navbar-collapse');
const bsCollapse = mobileMenu ? bootstrap.Collapse.getOrCreateInstance(mobileMenu, { toggle: false }) : null;

body.classList.add('reveal-ready');

const updateNavState = () => {
    if (!nav) {
        return;
    }

    nav.classList.toggle('is-scrolled', window.scrollY > 18);
};

updateNavState();
window.addEventListener('scroll', updateNavState, { passive: true });

const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const setActiveLink = () => {
    const offset = window.scrollY + 150;
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
        if (offset >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
};

setActiveLink();
window.addEventListener('scroll', setActiveLink, { passive: true });

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992 && bsCollapse) {
            bsCollapse.hide();
        }
    });
});

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, revealObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}
