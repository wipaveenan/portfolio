// Canan (Wipavee Pinyamuksapong) — 2026 Interactive Portfolio Logic (Latest Version)
var appState = {
  activeSection: 'sec-top',
  mobileMenuOpen: false,
  peekingAllFolders: false,
  selectedTool: 'Figma',
  cpnViewMode: 'both',
  oocaState: 'heart',
  sitemapTab: 'both',
  moodFilter: 'all',
  webFilter: 'all',
  productFilter: 'all'
};

var TOOL_DETAILS = {
  'Ai': {
    name: 'Adobe Illustrator',
    tag: 'Vector, Mascot & Packaging CI',
    desc: 'Crafting custom mascots (Mooca), brand logos, Puppy Love Perfume packaging, Portable Bag Hanger patterns, and vector assets.'
  },
  'Ps': {
    name: 'Adobe Photoshop',
    tag: 'Photo & Campaign Retouching',
    desc: 'High-impact advertising banners (GSB, Feel Great Now, Beauty Pro, Hometools), product mockups, and image compositing.'
  },
  'Figma': {
    name: 'Figma',
    tag: 'Primary UX/UI & Prototyping Tool',
    desc: '5 years designing end-to-end Sitemaps, Wireframes, Mood & Tone proposals, Design Systems, and interactive prototypes.'
  },
  'WordPress': {
    name: 'WordPress CMS',
    tag: 'Full-Cycle Web Development',
    desc: 'Building fast, responsive, SEO-friendly production websites for corporate, hospitality, and retail clients.'
  },
  'Elementor': {
    name: 'Elementor Pro & HTML/CSS',
    tag: 'Pixel-Perfect Frontend Builder',
    desc: 'Translating custom Figma UI into responsive desktop, tablet, and mobile layouts with custom CSS animations.'
  },
  'Canva': {
    name: 'Canva & Social Systems',
    tag: 'Rapid Content Templates',
    desc: 'Creating scalable social media templates and quick client marketing collateral.'
  },
  'ChatGPT': {
    name: 'OpenAI ChatGPT',
    tag: 'UX Copywriting & Ideation',
    desc: 'Accelerating UX microcopy, bilingual Thai/English content structuring, and research synthesis.'
  },
  'Gemini': {
    name: 'Google Gemini',
    tag: 'Design Engineering & Code',
    desc: 'Rapid interactive prototyping, responsive frontend architecture, and creative problem solving.'
  }
};

var OOCA_STATES = {
  'moon': {
    emoji: '🌙',
    name: 'Moon Dreamer',
    subtitle: 'Deep Rest & Unplugged Peace',
    choice: '“นอนพักยาวๆ แบบไม่ตั้งนาฬิกาปลุก”',
    insight: 'Your mind is asking for permission to slow down. Taking a guilt-free pause restores your creative clarity.'
  },
  'balloon': {
    emoji: '🎈',
    name: 'Balloon Explorer',
    subtitle: 'Freedom & Fresh Perspectives',
    choice: '“ลองเดินทางไปที่ใหม่ๆ ที่ไม่เคยไป”',
    insight: 'Stepping outside familiar routines sparks new energy and helps you release accumulated pressure.'
  },
  'bench': {
    emoji: '🪑',
    name: 'Bench Break',
    subtitle: 'Mindful Grounding & Stability',
    choice: '“นั่งมองวิวเงียบๆ คนเดียวสักพัก”',
    insight: 'A quiet moment of stillness lets your thoughts settle naturally without needing to fix everything at once.'
  },
  'curious': {
    emoji: '✨',
    name: 'Curious Spark',
    subtitle: 'Playful Discovery & Connection',
    choice: '“ลองทำสิ่งเล็กๆ ที่อยากทำมานาน”',
    insight: 'Following small curiosities reconnects you with joy and gentle self-discovery.'
  },
  'heart': {
    emoji: '💖',
    name: 'Glowing Heart',
    subtitle: 'Warmth, Empathy & Self-Care',
    choice: '“ใช้เวลาดีๆ ดูแลคนสำคัญรอบตัวและตัวเอง”',
    insight: 'Warm connection and kindness toward yourself and loved ones recharge your emotional resilience.'
  }
};

function showToast(message) {
  var toast = document.getElementById('toast-notification');
  var toastText = document.getElementById('toast-message');
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');
  if (window._toastTimer) clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function() {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
  }, 2800);
}

function copyTextToClipboard(text, label) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('Copied ' + label + ': ' + text);
      }).catch(function() {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  } catch (e) {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Copied ' + label + ': ' + text);
  } catch (err) {
    showToast(label + ': ' + text);
  }
  document.body.removeChild(ta);
}

function toggleMobileMenu() {
  appState.mobileMenuOpen = !appState.mobileMenuOpen;
  var drawer = document.getElementById('mobile-menu-drawer');
  var iconOpen = document.getElementById('menu-icon-open');
  var iconClose = document.getElementById('menu-icon-close');
  if (!drawer) return;
  if (appState.mobileMenuOpen) {
    drawer.classList.remove('hidden');
    if (iconOpen) iconOpen.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }
}

function jumpToSection(sectionId, optionalFilter) {
  if (appState.mobileMenuOpen) {
    toggleMobileMenu();
  }
  if (optionalFilter === 'corporate' || optionalFilter === 'ecommerce' || optionalFilter === 'all') {
    setWebFilter(optionalFilter);
  }
  var target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  target.classList.remove('section-highlight-pulse');
  void target.offsetWidth;
  target.classList.add('section-highlight-pulse');

  var readable = {
    'sec-top': 'Top Hero',
    'sec-about': 'About Me (5 Years Experience)',
    'sec-folders': 'Interactive 6-Folder Directory',
    'sec-uxui': '01 · UX/UI Works',
    'sec-sitemap': '02 · Sitemap & Wireframe',
    'sec-moodtone': '03 · Mood & Tone Proposals',
    'sec-wordpress': '04 · Live WordPress & Stores',
    'sec-products': '05 · Product Design (My Products)',
    'sec-graphics': '06 · Key Visuals & Campaigns',
    'sec-footer': 'Contact & Let\'s Talk'
  };
  showToast('Scrolled to ' + (readable[sectionId] || sectionId));
}

function togglePeekAllFolders() {
  appState.peekingAllFolders = !appState.peekingAllFolders;
  var folders = document.querySelectorAll('.folder-box');
  var btnLabel = document.getElementById('peek-all-btn-label');
  for (var i = 0; i < folders.length; i++) {
    if (appState.peekingAllFolders) {
      folders[i].classList.add('peeking-all');
    } else {
      folders[i].classList.remove('peeking-all');
    }
  }
  if (btnLabel) {
    btnLabel.textContent = appState.peekingAllFolders ? 'Tuck Folders Back In ↑' : 'Peek All 6 Folders at Once ✨';
  }
}

function selectToolDock(toolKey) {
  appState.selectedTool = toolKey;
  var info = TOOL_DETAILS[toolKey];
  if (!info) return;
  var titleEl = document.getElementById('tool-detail-name');
  var tagEl = document.getElementById('tool-detail-tag');
  var descEl = document.getElementById('tool-detail-desc');
  if (titleEl) titleEl.textContent = info.name;
  if (tagEl) tagEl.textContent = info.tag;
  if (descEl) descEl.textContent = info.desc;

  var buttons = document.querySelectorAll('.dock-icon');
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute('data-tool') === toolKey) {
      buttons[i].classList.add('active-tool', 'ring-2', 'ring-blue-600');
    } else {
      buttons[i].classList.remove('active-tool', 'ring-2', 'ring-blue-600');
    }
  }
}

function setCpnView(mode) {
  appState.cpnViewMode = mode;
  var kioskWrap = document.getElementById('cpn-kiosk-wrap');
  var mobileWrap = document.getElementById('cpn-mobile-wrap');
  var divider = document.getElementById('cpn-divider');
  if (!kioskWrap || !mobileWrap) return;

  if (mode === 'kiosk') {
    kioskWrap.classList.remove('hidden');
    mobileWrap.classList.add('hidden');
    if (divider) divider.classList.add('hidden');
  } else if (mode === 'mobile') {
    kioskWrap.classList.add('hidden');
    mobileWrap.classList.remove('hidden');
    if (divider) divider.classList.add('hidden');
  } else {
    kioskWrap.classList.remove('hidden');
    mobileWrap.classList.remove('hidden');
    if (divider) divider.classList.remove('hidden');
  }

  var tabs = ['both', 'kiosk', 'mobile'];
  for (var i = 0; i < tabs.length; i++) {
    var btn = document.getElementById('cpn-tab-' + tabs[i]);
    if (btn) {
      if (tabs[i] === mode) {
        btn.className = 'px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 text-white transition';
      } else {
        btn.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-zinc-800 hover:bg-white transition';
      }
    }
  }
}

function selectOocaState(stateKey) {
  appState.oocaState = stateKey;
  var st = OOCA_STATES[stateKey];
  if (!st) return;

  var emojiEl = document.getElementById('ooca-preview-emoji');
  var nameEl = document.getElementById('ooca-preview-name');
  var subEl = document.getElementById('ooca-preview-sub');
  var choiceEl = document.getElementById('ooca-preview-choice');
  var insightEl = document.getElementById('ooca-preview-insight');

  if (emojiEl) emojiEl.textContent = st.emoji;
  if (nameEl) nameEl.textContent = st.name;
  if (subEl) subEl.textContent = st.subtitle;
  if (choiceEl) choiceEl.textContent = st.choice;
  if (insightEl) insightEl.textContent = st.insight;

  var keys = ['moon', 'balloon', 'bench', 'curious', 'heart'];
  for (var i = 0; i < keys.length; i++) {
    var btn = document.getElementById('ooca-btn-' + keys[i]);
    if (btn) {
      if (keys[i] === stateKey) {
        btn.classList.add('ring-2', 'ring-blue-600', 'scale-110');
        btn.classList.remove('opacity-70');
      } else {
        btn.classList.remove('ring-2', 'ring-blue-600', 'scale-110');
        btn.classList.add('opacity-70');
      }
    }
  }
}

function setSitemapTab(tab) {
  appState.sitemapTab = tab;
  var nextCard = document.getElementById('sitemap-card-nextreal');
  var panCard = document.getElementById('sitemap-card-panduit');
  if (!nextCard || !panCard) return;

  if (tab === 'nextreal') {
    nextCard.classList.remove('hidden');
    panCard.classList.add('hidden');
  } else if (tab === 'panduit') {
    nextCard.classList.add('hidden');
    panCard.classList.remove('hidden');
  } else {
    nextCard.classList.remove('hidden');
    panCard.classList.remove('hidden');
  }

  var tabs = ['both', 'nextreal', 'panduit'];
  for (var i = 0; i < tabs.length; i++) {
    var b = document.getElementById('sitemap-btn-' + tabs[i]);
    if (b) {
      if (tabs[i] === tab) {
        b.className = 'px-3 py-1 rounded-full text-xs font-bold bg-pink-600 text-white transition';
      } else {
        b.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 transition';
      }
    }
  }
}

function setMoodFilter(opt) {
  appState.moodFilter = opt;
  var cards = {
    'optA': document.getElementById('mood-card-optA'),
    'optB': document.getElementById('mood-card-optB'),
    'optC': document.getElementById('mood-card-optC')
  };
  var gridTop = document.getElementById('mood-top-grid');
  for (var k in cards) {
    if (!cards[k]) continue;
    if (opt === 'all' || opt === k) {
      cards[k].classList.remove('hidden');
    } else {
      cards[k].classList.add('hidden');
    }
  }
  if (gridTop) {
    if (opt === 'optA' || opt === 'optB') {
      gridTop.classList.remove('sm:grid-cols-2');
      gridTop.classList.add('grid-cols-1');
    } else {
      gridTop.classList.add('sm:grid-cols-2');
    }
  }

  var opts = ['all', 'optA', 'optB', 'optC'];
  for (var i = 0; i < opts.length; i++) {
    var btn = document.getElementById('mood-btn-' + opts[i]);
    if (btn) {
      if (opts[i] === opt) {
        btn.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white transition';
      } else {
        btn.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition';
      }
    }
  }
}

function setWebFilter(category) {
  appState.webFilter = category;
  var cards = document.querySelectorAll('.web-project-card');
  for (var i = 0; i < cards.length; i++) {
    var cat = cards[i].getAttribute('data-category');
    if (category === 'all' || cat === category) {
      cards[i].classList.remove('hidden');
    } else {
      cards[i].classList.add('hidden');
    }
  }

  var cats = ['all', 'corporate', 'ecommerce'];
  for (var j = 0; j < cats.length; j++) {
    var btn = document.getElementById('web-filter-' + cats[j]);
    if (btn) {
      if (cats[j] === category) {
        btn.className = 'px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#1849D6] text-white shadow-sm transition';
      } else {
        btn.className = 'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-50 transition';
      }
    }
  }
}

function setProductFilter(category) {
  appState.productFilter = category;
  var cards = document.querySelectorAll('.product-design-card');
  for (var i = 0; i < cards.length; i++) {
    var cat = cards[i].getAttribute('data-prod-cat');
    if (category === 'all' || cat === category) {
      cards[i].classList.remove('hidden');
    } else {
      cards[i].classList.add('hidden');
    }
  }

  var cats = ['all', 'packaging', 'lifestyle', 'gift'];
  for (var j = 0; j < cats.length; j++) {
    var btn = document.getElementById('prod-filter-' + cats[j]);
    if (btn) {
      if (cats[j] === category) {
        btn.className = 'px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-purple-700 text-white shadow-sm transition';
      } else {
        btn.className = 'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-purple-900 border border-purple-200 hover:bg-purple-50 transition';
      }
    }
  }
}

function openLightboxById(imgId, title, subtitle, desc, liveUrl) {
  var imgEl = document.getElementById(imgId);
  var src = imgEl ? imgEl.getAttribute('src') : '';
  openLightbox(src, title, subtitle, desc, liveUrl);
}

function openLightbox(imgSrc, title, subtitle, desc, liveUrl) {
  var modal = document.getElementById('project-lightbox-modal');
  var modalImg = document.getElementById('lightbox-image');
  var modalTitle = document.getElementById('lightbox-title');
  var modalSub = document.getElementById('lightbox-subtitle');
  var modalDesc = document.getElementById('lightbox-desc');
  var modalLink = document.getElementById('lightbox-live-link');

  if (!modal) return;
  if (modalImg) modalImg.setAttribute('src', imgSrc || '');
  if (modalTitle) modalTitle.textContent = title || 'Project Preview';
  if (modalSub) modalSub.textContent = subtitle || '';
  if (modalDesc) modalDesc.textContent = desc || '';

  if (modalLink) {
    if (liveUrl && liveUrl.length > 0) {
      modalLink.setAttribute('href', liveUrl);
      modalLink.classList.remove('hidden');
    } else {
      modalLink.classList.add('hidden');
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeLightbox() {
  var modal = document.getElementById('project-lightbox-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Initialize Scroll-Reveal, Scroll-Spy & Mouse Parallax on Load
window.addEventListener('DOMContentLoaded', function() {
  var revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.08 });
    for (var i = 0; i < revealEls.length; i++) {
      obs.observe(revealEls[i]);
    }

    var sectionIds = ['sec-about', 'sec-folders', 'sec-uxui', 'sec-sitemap', 'sec-wordpress', 'sec-products', 'sec-graphics'];
    var spyObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          var navLinks = document.querySelectorAll('.nav-pill-item');
          for (var j = 0; j < navLinks.length; j++) {
            if (navLinks[j].getAttribute('data-target') === id) {
              navLinks[j].classList.add('active-nav');
            } else {
              navLinks[j].classList.remove('active-nav');
            }
          }
        }
      });
    }, { rootMargin: '-25% 0px -55% 0px' });

    for (var k = 0; k < sectionIds.length; k++) {
      var secEl = document.getElementById(sectionIds[k]);
      if (secEl) spyObs.observe(secEl);
    }
  } else {
    for (var m = 0; m < revealEls.length; m++) {
      revealEls[m].classList.add('is-visible');
    }
  }

  var heroStage = document.getElementById('sec-top');
  if (heroStage) {
    heroStage.addEventListener('mousemove', function(e) {
      if (window.innerWidth < 1024) return;
      var rect = heroStage.getBoundingClientRect();
      var dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      var dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
      var layers = heroStage.querySelectorAll('[data-parallax]');
      for (var n = 0; n < layers.length; n++) {
        var speed = parseFloat(layers[n].getAttribute('data-parallax') || '12');
        layers[n].style.transform = 'translate3d(' + (dx * speed).toFixed(1) + 'px, ' + (dy * speed).toFixed(1) + 'px, 0)';
      }
    });
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
