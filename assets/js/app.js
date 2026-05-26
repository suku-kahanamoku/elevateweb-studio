// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
}

// Floating particle background
function createParticles() {
  const container = document.body;
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.className = 'fixed pointer-events-none bg-primary-fixed-dim/20 rounded-full blur-xl';
    const size = Math.random() * 200 + 100;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.transition = 'all 20s linear';
    particle.style.zIndex = '-1';
    container.appendChild(particle);
    setInterval(() => {
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.left = Math.random() * 100 + 'vw';
    }, 2000);
  }
}
createParticles();

// Glass card mouse glow
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
});

// Contact page: glass-panel mouse glow
document.querySelectorAll('.glass-panel').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.backgroundImage = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(0,245,255,0.05), transparent), rgba(25,25,26,0.6)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

// Contact page: form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Submitted ✓';
    btn.classList.add('bg-green-600');
    btn.classList.remove('bg-primary-container');
    setTimeout(() => {
      btn.innerHTML = 'Submit Request <span class="material-symbols-outlined text-lg">arrow_forward</span>';
      btn.classList.remove('bg-green-600');
      btn.classList.add('bg-primary-container');
      e.target.reset();
    }, 3000);
  });
}

// Contact page: scroll header shrink
window.addEventListener('scroll', () => {
  const header = document.querySelector('nav');
  if (!header) return;
  if (window.pageYOffset > 50) {
    header.classList.add('py-2');
    header.classList.remove('py-4');
  } else {
    header.classList.add('py-4');
    header.classList.remove('py-2');
  }
});

// Monetization page: stats counter animation
function animateValue(el, end, duration, suffix) {
  if (!el) return;
  let startTs = null;
  const step = (ts) => {
    if (!startTs) startTs = ts;
    const progress = Math.min((ts - startTs) / duration, 1);
    el.textContent = Math.floor(progress * end) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsEl = document.getElementById('stat1');
if (statsEl) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(document.getElementById('stat1'), 32, 2000, '%');
        animateValue(document.getElementById('stat2'), 12, 1500, 'ms');
        animateValue(document.getElementById('stat3'), 150, 2000, '+');
        animateValue(document.getElementById('stat4'), 99, 1800, '.8%');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsEl);
}
