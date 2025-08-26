// Dynamic loader for Publications/Blog page
// Usage: Set window.HFR_PUBS_CONFIG = { owner: 'ORG', repo: 'REPO', path: 'publications', branch: 'main' }
// If owner/repo provided, fetch directory listing via GitHub API and render files named YYYY-MM-DD-title.html
// Otherwise, render a static set seeded with existing research pages.

(function () {
  const featuredEl = document.getElementById('featured-post');
  const gridEl = document.getElementById('articles-grid');
  if (!featuredEl || !gridEl) return;

  const cfg = Object.assign({ owner: '', repo: '', path: 'publications', branch: 'main' }, (window.HFR_PUBS_CONFIG || {}));

  // Helpers
  const fmtDate = (d) => {
    try {
      const dt = new Date(d);
      const opts = { year: 'numeric', month: 'short', day: 'numeric' };
      return dt.toLocaleDateString(undefined, opts);
    } catch { return d; }
  };

  const makeCardHTML = (a) => {
    const catBadge = a.category ? `<span class="category-badge bg-blue-100 text-blue-800">${a.category}</span>` : '';
    const minutes = a.readingTime || a.read || '';
    const readTxt = minutes ? `<span class="reading-time">${minutes}</span>` : '';
    const dateTxt = a.date ? `<span class="text-xs text-slate-500">${fmtDate(a.date)}</span>` : '';
    const authorHTML = a.author ? `
      <div class="flex items-center">
        ${a.authorAvatar ? `<img src="${a.authorAvatar}" alt="${a.author}" class="w-8 h-8 rounded-full mr-2">` : ''}
        <p class="font-medium text-sm">${a.author}</p>
      </div>` : '<span></span>';

    const imgHTML = a.image ? `<img src="${a.image}" alt="${a.title}" class="w-full h-48 object-cover">` : '';

    return `
      <article class="article-card rounded-xl overflow-hidden">
        <a href="${a.href}">
          ${imgHTML}
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">${catBadge}${readTxt}</div>
            <h3 class="text-xl font-bold text-dark-900 mb-2">${a.title}</h3>
            ${a.excerpt ? `<p class="text-dark-600 mb-4">${a.excerpt}</p>` : ''}
            <div class="flex items-center justify-between">
              ${authorHTML}
              ${dateTxt}
            </div>
          </div>
        </a>
      </article>`;
  };

  const renderFeatured = (a) => {
    const minutes = a.readingTime || a.read || '';
    featuredEl.innerHTML = `
      <div class="flex items-center gap-2 mb-4">
        <span class="category-badge bg-blue-100 text-blue-800">Featured</span>
        ${minutes ? `<span class="reading-time">${minutes}</span>` : ''}
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-dark-900 mb-3">${a.title}</h2>
      ${a.excerpt ? `<p class="text-dark-600 mb-4">${a.excerpt}</p>` : ''}
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          ${a.authorAvatar ? `<img src="${a.authorAvatar}" alt="${a.author}" class="w-10 h-10 rounded-full mr-3">` : ''}
          <div>
            ${a.author ? `<p class="font-medium text-sm">${a.author}</p>` : ''}
            ${a.date ? `<p class="text-xs text-slate-500">${fmtDate(a.date)}</p>` : ''}
          </div>
        </div>
        <a href="${a.href}" class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          Read more <i class="fas fa-arrow-right ml-2 text-sm"></i>
        </a>
      </div>`;
  };

  const seedStatic = () => {
    // Seed with existing research pages so the page isn't empty
    const items = [
      {
        title: 'In-Context Learning for Tabular Data',
        href: 'tabFM_research.html',
        excerpt: 'How in-context learning adapts to clinical tabular data with minimal examples.',
        author: 'HFR Research',
        authorAvatar: '',
        category: 'Research',
        date: '2024-05-15',
        readingTime: '8 min read',
        image: '',
      },
      {
        title: 'Graph Neural Networks in Oncology',
        href: 'graph_research.html',
        excerpt: 'GNNs over multi-omics and clinical graphs to model cancer.',
        author: 'HFR Research',
        authorAvatar: '',
        category: 'Technical',
        date: '2024-04-28',
        readingTime: '12 min read',
        image: '',
      },
      {
        title: 'Survival Foundation Models',
        href: 'survival_research.html',
        excerpt: 'Cross‑modal survival modeling with clinical realism across imaging, EHR, and omics.',
        author: 'HFR Research',
        authorAvatar: '',
        category: 'Research',
        date: '2024-03-30',
        readingTime: '10 min read',
        image: '',
      },
    ];

    // Featured is the first item for now
    renderFeatured(items[0]);
    gridEl.innerHTML = items.slice(1).map(makeCardHTML).join('');
  };

  const loadFromGitHub = async () => {
    if (!cfg.owner || !cfg.repo) { seedStatic(); return; }
    try {
      const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.path}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
      if (!res.ok) throw new Error('GitHub API error');
      const list = await res.json();
      const files = list.filter(x => x.type === 'file' && x.name.endsWith('.html') && x.name !== 'index.html');
      const parsed = files.map(f => {
        const name = decodeURIComponent(f.name.replace(/\+/g, ' '));
        // Expect YYYY-MM-DD-title.html
        const m = name.match(/(\d{4}-\d{2}-\d{2})-(.*)\.html$/);
        const date = m ? m[1] : '';
        const slug = m ? m[2].replace(/[-_]+/g, ' ') : name.replace(/\.html$/, '');
        return {
          title: slug.charAt(0).toUpperCase() + slug.slice(1),
          href: `${cfg.path}/${f.name}`,
          excerpt: '',
          author: '',
          authorAvatar: '',
          category: 'Blog',
          date,
          readingTime: '',
          image: '',
        };
      });
      // Sort by date desc if present, else by filename desc
      parsed.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.href.localeCompare(a.href));

      // If none found, fall back
      if (parsed.length === 0) { seedStatic(); return; }

      // Featured is the most recent
      renderFeatured(parsed[0]);
      // Include seeded existing research after GitHub items
      const extras = [
        { title: 'Graph Neural Networks in Oncology', href: 'graph_research.html', category: 'Technical', date: '2024-04-28', readingTime: '12 min read' },
        { title: 'Survival Foundation Models', href: 'survival_research.html', category: 'Research', date: '2024-03-30', readingTime: '10 min read' },
      ];
      const rest = parsed.slice(1).concat(extras);
      gridEl.innerHTML = rest.map(makeCardHTML).join('');
    } catch (e) {
      console.warn('Publications: falling back to static due to error:', e);
      seedStatic();
    }
  };

  loadFromGitHub();
})();

