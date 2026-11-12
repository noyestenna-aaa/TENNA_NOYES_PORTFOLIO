(() => {
  const setCurrentYear = () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  const initCursor = () => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let cursor = document.querySelector('.cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'cursor';
      document.body.appendChild(cursor);
    }

    const moveCursor = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    document.addEventListener('pointermove', moveCursor, { passive: true });

    const clickableSelectors = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      '.button',
      '.card',
      '.brand',
      'nav a'
    ];

    clickableSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
      });
    });

    document.body.classList.add('is-ready');
  };

  const initPageTransitions = () => {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      const isPageLink = href.endsWith('.html') || !href.includes('://');
      if (!isPageLink) {
        return;
      }

      link.addEventListener('click', (event) => {
        if (link.target === '_blank') {
          return;
        }

        event.preventDefault();
        document.body.classList.remove('is-ready');
        document.body.classList.add('page-transition');

        window.setTimeout(() => {
          window.location.href = href;
        }, 220);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    initCursor();
    initPageTransitions();
  });
})();
