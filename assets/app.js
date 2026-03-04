const body = document.body;
const dropdowns = document.querySelectorAll('[data-dropdown]');
dropdowns.forEach((wrap) => {
  const btn = wrap.querySelector('button');
  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

document.addEventListener('click', () => {
  dropdowns.forEach((d) => { d.classList.remove('open'); d.querySelector('button')?.setAttribute('aria-expanded', 'false'); });
});

const burger = document.querySelector('.burger');
const drawer = document.getElementById('mobile-drawer');
const closeBtn = document.querySelector('.drawer-close');
const backdrop = document.querySelector('.backdrop');
let lastFocused = null;
function trapFocus(e) {
  if (!drawer.classList.contains('open')) return;
  const focusables = drawer.querySelectorAll('a, button');
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (e.key === 'Escape') closeDrawer();
}
function openDrawer() {
  lastFocused = document.activeElement;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.classList.add('open');
  body.classList.add('no-scroll');
  burger?.setAttribute('aria-expanded', 'true');
  drawer.querySelector('a,button')?.focus();
  document.addEventListener('keydown', trapFocus);
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.classList.remove('open');
  body.classList.remove('no-scroll');
  burger?.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', trapFocus);
  lastFocused?.focus();
}
burger?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
drawer?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));

const allDetails = document.querySelectorAll('.faq-list details');
allDetails.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    allDetails.forEach((other) => { if (other !== item) other.open = false; });
  });
});

const modal = document.getElementById('privacy-modal');
const openModalBtn = document.querySelector('[data-open-modal]');
const closeModalBtns = document.querySelectorAll('[data-close-modal]');
function onModalKey(e) {
  if (e.key === 'Escape') closeModal();
}
function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  document.addEventListener('keydown', onModalKey);
  modal.querySelector('.modal-x')?.focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onModalKey);
}
openModalBtn?.addEventListener('click', openModal);
closeModalBtns.forEach((btn) => btn.addEventListener('click', closeModal));
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks. After you sign up, you get instant access to the next steps.');
  });
});
