(() => {
  const languageButtons = document.querySelectorAll('[data-lang]');
  const translatableElements = document.querySelectorAll('[data-en][data-th]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  function setLanguage(language) {
    const selected = language === 'th' ? 'th' : 'en';
    document.documentElement.lang = selected;
    translatableElements.forEach((element) => {
      element.textContent = element.dataset[selected];
    });

    document.querySelectorAll('[data-en-aria-label][data-th-aria-label]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`${selected}AriaLabel`]);
    });

    languageButtons.forEach((button) => {
      const active = button.dataset.lang === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    try {
      localStorage.setItem('wipavee-portfolio-language', selected);
    } catch (error) {
      // The site still works when browser storage is unavailable.
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  try {
    const savedLanguage = localStorage.getItem('wipavee-portfolio-language');
    if (savedLanguage === 'th' || savedLanguage === 'en') setLanguage(savedLanguage);
  } catch (error) {
    // Keep English as the default language when storage is unavailable.
  }

  function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('is-open', !isExpanded);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  function applyFilter(filter) {
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
