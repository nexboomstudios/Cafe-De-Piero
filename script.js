// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// ===== Navbar scroll effect =====
let lastScroll = 0;
function updateNavbar() {
  const scrollY = window.scrollY;
  
  if (scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = scrollY;
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ===== Menu Tab System =====
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    tabPanels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
  });
});

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Scroll Reveal =====
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.why-card, .menu-card, .review-card, .location-card, .event-card, .menu-item-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== Enquiry Form =====
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = enquiryForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your enquiry! We will get back to you within 24 hours.');
      enquiryForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// ===== Gallery touch interaction =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('touchstart', function() {
    this.querySelector('img').style.transform = 'scale(1.04)';
  }, { passive: true });
  
  item.addEventListener('touchend', function() {
    this.querySelector('img').style.transform = 'scale(1)';
  }, { passive: true });
});

// ===== Lazy loading fallback =====
if ('loading' in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.classList.add('lazyload');
    img.dataset.src = img.src;
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  });
}

// ===== Debounce =====
function debounce(func, wait = 20) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', debounce(() => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}));

console.log('%c🦁 Welcome to The Lion\'s Den %c— Independent brunch & speciality coffee',
  'font-size: 1.2rem; font-family: serif; color: #3C2A21;',
  'color: #6B705C;');