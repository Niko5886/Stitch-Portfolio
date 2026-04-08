document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initScrollSpy();
  initSmoothScroll();
  initFormHandler();
  initRevealAnimation();
});

function initMobileMenu() {
  const menuButton = document.querySelector('[data-mobile-menu-button]');
  const desktopNav = document.querySelector('[data-desktop-nav]');

  if (!menuButton || !desktopNav) {
    return;
  }

  const navLinks = Array.from(desktopNav.querySelectorAll('a')).map(function(link) {
    return {
      href: link.getAttribute('href') || '#',
      label: (link.textContent || '').trim()
    };
  });

  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  overlay.setAttribute('data-mobile-menu-overlay', 'true');

  const panel = document.createElement('aside');
  panel.className = 'mobile-menu-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Мобилна навигация');
  panel.setAttribute('aria-hidden', 'true');

  panel.innerHTML = [
    '<div class="mobile-menu-header">',
    '  <div class="flex items-center gap-2">',
    '    <span class="material-symbols-outlined text-[#00E5FF]">architecture</span>',
    '    <span class="text-lg font-bold tracking-tighter text-[#c3f5ff] font-[\'Space_Grotesk\']">Дигиталният Архитект</span>',
    '  </div>',
    '  <button type="button" class="mobile-menu-close" data-mobile-menu-close aria-label="Затвори меню">',
    '    <span class="material-symbols-outlined">close</span>',
    '  </button>',
    '</div>',
    '<nav class="mobile-menu-links"></nav>'
  ].join('');

  const linksContainer = panel.querySelector('.mobile-menu-links');

  navLinks.forEach(function(item) {
    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'mobile-menu-link';
    link.textContent = item.label;
    linksContainer.appendChild(link);
  });

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  const closeButton = panel.querySelector('[data-mobile-menu-close]');

  function openMenu() {
    document.body.classList.add('mobile-menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    menuButton.textContent = 'close';
  }

  function closeMenu() {
    document.body.classList.remove('mobile-menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    menuButton.textContent = 'menu';
  }

  function toggleMenu() {
    if (document.body.classList.contains('mobile-menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuButton.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  closeButton.addEventListener('click', closeMenu);

  panel.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    if (!link) {
      return;
    }
    closeMenu();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  panel.querySelectorAll('.mobile-menu-link').forEach(function(link) {
    const href = link.getAttribute('href') || '';
    const hrefPath = href.split('#')[0];
    const isCurrentPage = hrefPath === '' || hrefPath === currentPath;
    if (isCurrentPage) {
      link.classList.add('is-active');
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function initScrollSpy() {
  const desktopNav = document.querySelector('[data-desktop-nav]');
  const homeSection = document.getElementById('home');

  if (!desktopNav || !homeSection) {
    return;
  }

  const links = Array.from(desktopNav.querySelectorAll('a'));
  const sections = [
    { id: 'home', href: '#home' },
    { id: 'projects', href: 'projects.html' },
    { id: 'services', href: 'services.html' },
    { id: 'contact', href: '#contact' }
  ]
    .map(function(item) {
      const section = document.getElementById(item.id);
      const link = links.find(function(candidate) {
        return (candidate.getAttribute('href') || '') === item.href;
      });

      return section && link ? { section: section, link: link } : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  function setActiveLink(activeLink) {
    links.forEach(function(link) {
      const isActive = link === activeLink;
      link.style.color = isActive ? '#00E5FF' : 'rgba(225, 226, 234, 0.7)';
      link.style.fontWeight = isActive ? '700' : '500';
      link.style.opacity = '1';
    });
  }

  function updateActiveLink() {
    const marker = window.scrollY + window.innerHeight * 0.38;
    let activeLink = sections[0].link;

    sections.forEach(function(item) {
      if (marker >= item.section.offsetTop) {
        activeLink = item.link;
      }
    });

    setActiveLink(activeLink);
  }

  let scheduled = false;
  window.addEventListener('scroll', function() {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(function() {
      updateActiveLink();
      scheduled = false;
    });
  }, { passive: true });

  updateActiveLink();
}

function initFormHandler() {
  const form = document.querySelector('form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameField = form.querySelector('input[placeholder="Вашето име"]');
    const emailField = form.querySelector('input[type="email"]');
    const projectField = form.querySelector('select');
    const messageField = form.querySelector('textarea');

    const formData = {
      name: nameField ? nameField.value : '',
      email: emailField ? emailField.value : '',
      project: projectField ? projectField.value : '',
      message: messageField ? messageField.value : ''
    };

    if (!formData.name || !formData.email || !formData.message) {
      alert('Моля попълнете всички полета');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Моля въведете валиден имейл адрес');
      return;
    }

    console.log('Форма изпратена:', formData);
    alert('Благодаря! Вашето запитване е получено. Скоро ще се свържем с вас.');
    form.reset();
  });
}

function initRevealAnimation() {
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .group').forEach(function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
  });
}
