const navToggle = document.getElementById('nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav?.classList.remove('open');
  });
});
