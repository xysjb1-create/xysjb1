/* 博客交互脚本：主题切换 / 搜索 / 目录 / 阅读进度 / 复制代码 / 回到顶部 */
(function () {
  'use strict';

  var root = document.documentElement;
  var site = window.__SITE__ || { posts: [], baseurl: '' };

  /* ---------- 主题切换 ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ---------- 搜索 ---------- */
  var searchBtn = document.getElementById('search-btn');
  var modal = document.getElementById('search-modal');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var selectedIndex = -1;
  var currentResults = [];

  function openSearch() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    if (input) { input.value = ''; input.focus(); }
    renderResults([]);
  }
  function closeSearch() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
  function renderResults(list) {
    if (!results) return;
    currentResults = list;
    selectedIndex = list.length ? 0 : -1;
    if (!list.length) {
      results.innerHTML = '<div class="search-empty">没有匹配的文章</div>';
      return;
    }
    results.innerHTML = list.map(function (p, i) {
      return '<a class="search-item' + (i === 0 ? ' selected' : '') + '" href="' + p.url + '">' +
        '<div class="title">' + escapeHtml(p.title) + '</div>' +
        '<div class="meta">' + p.date + (p.tags && p.tags.length ? ' · ' + p.tags.join(' / ') : '') + '</div>' +
        '</a>';
    }).join('');
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function search(keyword) {
    var kw = keyword.trim().toLowerCase();
    if (!kw) { renderResults([]); return; }
    var list = site.posts.filter(function (p) {
      var text = (p.title + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return text.indexOf(kw) !== -1;
    }).slice(0, 12);
    renderResults(list);
  }
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
  }
  if (input) {
    input.addEventListener('input', function () { search(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSearch(); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!currentResults.length) return;
        selectedIndex = (selectedIndex + (e.key === 'ArrowDown' ? 1 : -1) + currentResults.length) % currentResults.length;
        Array.prototype.forEach.call(results.querySelectorAll('.search-item'), function (el, i) {
          el.classList.toggle('selected', i === selectedIndex);
        });
        return;
      }
      if (e.key === 'Enter' && currentResults[selectedIndex]) {
        window.location.href = currentResults[selectedIndex].url;
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault(); openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  /* ---------- 阅读进度条 / 返回顶部 ---------- */
  var progress = document.createElement('div');
  progress.className = 'read-progress';
  document.body.appendChild(progress);

  var backTop = document.getElementById('back-to-top');
  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    progress.style.width = height > 0 ? (scrollTop / height * 100).toFixed(2) + '%' : '0%';
    if (backTop) backTop.classList.toggle('show', scrollTop > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backTop) {
    backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- 阅读时间 ---------- */
  var readingTimeEl = document.getElementById('reading-time');
  var content = document.getElementById('post-content');
  if (readingTimeEl && content) {
    var text = content.innerText || '';
    var minutes = Math.max(1, Math.round(text.length / 400));
    readingTimeEl.textContent = '约 ' + minutes + ' 分钟阅读';
  }

  /* ---------- 目录（TOC） ---------- */
  var tocNav = document.getElementById('toc-nav');
  if (tocNav && content) {
    var headings = content.querySelectorAll('h2, h3');
    if (!headings.length) {
      var tocBox = document.getElementById('toc');
      if (tocBox) tocBox.style.display = 'none';
    } else {
      headings.forEach(function (h, i) {
        if (!h.id) h.id = 'heading-' + i;
        var link = document.createElement('a');
        link.href = '#' + h.id;
        link.textContent = h.textContent;
        if (h.tagName === 'H3') link.classList.add('toc-h3');
        tocNav.appendChild(link);
      });
      var links = tocNav.querySelectorAll('a');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id); });
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      headings.forEach(function (h) { observer.observe(h); });
    }
  }

  /* ---------- 代码块复制按钮 ---------- */
  if (content) {
    content.querySelectorAll('pre').forEach(function (pre) {
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = '复制';
      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        var text = code ? code.innerText : pre.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = '已复制';
            setTimeout(function () { btn.textContent = '复制'; }, 1500);
          });
        }
      });
      pre.appendChild(btn);
    });
  }
})();
