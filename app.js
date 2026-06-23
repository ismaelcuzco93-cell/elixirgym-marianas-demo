document.addEventListener('DOMContentLoaded', () => {
  // --- INITIALIZE LUCIDE ICOns SAFELY ---
  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (e) {
    console.error('Lucide icons could not be initialized:', e);
  }

  // --- HEADER SCROLL TRANSITION ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE DRAWER NAVIGATION MENU ---
  window.toggleMenu = function () {
    const drawer = document.getElementById('navDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer && overlay) {
      drawer.classList.toggle('open');
      overlay.classList.toggle('open');
    }
  }

  // --- INTERSECTION OBSERVER FOR TRANSITION ON SCROLL ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated to ensure smooth, lightweight execution
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });

  // --- TESTIMONIALS SLIDER ---
  const slider = document.getElementById('testimonialSlider');
  const dots = document.querySelectorAll('.test-dot');

  if (slider && dots.length > 0) {
    // Navigate on dot click
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index') || '0');
        const cards = slider.querySelectorAll('.test-card');
        if (cards[index]) {
          slider.scrollTo({
            left: cards[index].offsetLeft - slider.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    });

    // Track scroll position to update dots
    slider.addEventListener('scroll', () => {
      const cards = slider.querySelectorAll('.test-card');
      let activeIndex = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const diff = Math.abs((card.offsetLeft - slider.offsetLeft) - slider.scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          activeIndex = idx;
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });
  }

  // --- DYNAMIC HEADER ACTIVE LINK HIGHLIGHT ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a, .drawer-menu a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
