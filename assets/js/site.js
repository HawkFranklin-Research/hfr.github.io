// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}

// Current year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Active nav link highlight
(function highlightNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('nav a, header a.nav-link');
  links.forEach((a) => {
    const href = a.getAttribute('href');
    const target = href === '/' ? 'index.html' : href;
    if (target === path) {
      a.classList.add('nav-active');
      a.setAttribute('aria-current', 'page');
    }
  });
})();

// Contact form -> mailto fallback (GitHub Pages friendly)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name') || '';
    const email = fd.get('email') || '';
    const org = fd.get('org') || '';
    const message = fd.get('message') || '';
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOrganization: ${org}\n\n${message}`);
    const mailto = `mailto:contact@hawk-franklin-research.com?subject=${encodeURIComponent('HFR Demo / Inquiry')}&body=${body}`;
    window.location.href = mailto;
  });
}
