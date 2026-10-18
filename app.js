const SVG_CROWN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#e3b341"><path d="M2 20h20v2H2v-2zm0-12l4 4 6-8 6 8 4-4v10H2V8z"/></svg>`;
const SVG_FIRE = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#da3633"><path d="M12 2c0 0-4 4-4 9 0 2 1 3 1 3s-3-2-4-5c0 0-2 3-2 7 0 4 4 8 9 8s9-4 9-8c0-6-6-11-9-14zm0 18c-2.2 0-4-1.8-4-4 0-2 1.5-3.5 2.5-4.5 0 0 .5 1.5 1.5 2.5 0 0 1-1 1-3 1.2 1 3 2.8 3 5 0 2.2-1.8 4-4 4z"/></svg>`;

const TRANSLATIONS = {
  ru: {
    tab_search: "Поиск",
    tab_top: "Top 10",
    tab_viewed: "Most Viewed",
    title: "GitHub Card",
    subtitle: "Введи никнейм разработчика",
    placeholder: "например, torvalds",
    btn_find: "Найти",
    title_top: "Top 10",
    subtitle_top: "Самые популярные разработчики",
    title_viewed: "Most Viewed",
    subtitle_viewed: "Чаще всего ищут в рунете",
    error_404: "Пользователь не найден",
    error_403: "Превышен лимит запросов. Подожди час.",
    error_api: "Ошибка GitHub",
    loading: "Загрузка...",
    badge_top: "#1 Legend",
    badge_viewed: "HOT",
    repos: "Репозитории",
    followers: "Подписчики",
    following: "Подписки",
    on_github_since: "На GitHub с",
    year: "года",
    profile: "Профиль →"
  },
  en: {
    tab_search: "Search",
    tab_top: "Top 10",
    tab_viewed: "Most Viewed",
    title: "GitHub Card",
    subtitle: "Enter developer username",
    placeholder: "e.g. torvalds",
    btn_find: "Find",
    title_top: "Top 10",
    subtitle_top: "Most popular developers",
    title_viewed: "Most Viewed",
    subtitle_viewed: "Most searched in RU web",
    error_404: "User not found",
    error_403: "API rate limit exceeded. Wait an hour.",
    error_api: "GitHub API Error",
    loading: "Loading...",
    badge_top: "#1 Legend",
    badge_viewed: "HOT",
    repos: "Repositories",
    followers: "Followers",
    following: "Following",
    on_github_since: "On GitHub since",
    year: "",
    profile: "Profile →"
  }
};

const TOP_USERS = [
  { login: "torvalds", name: "Linus Torvalds" },
  { login: "karpathy", name: "Andrej Karpathy" },
  { login: "claude", name: "Claude" },
  { login: "gustavoguanabara", name: "Gustavo Guanabara" },
  { login: "yyx990803", name: "Evan You" },
  { login: "gaearon", name: "Dan Abramov" },
  { login: "ruanyf", name: "Ruan Yifeng" },
  { login: "peng-zhihui", name: "Peng Zhihui" },
  { login: "sindresorhus", name: "Sindre Sorhus" },
  { login: "bradtraversy", name: "Brad Traversy" }
];

const MOST_VIEWED = [
  { login: "flowseal", name: "Flowseal", badge: "Zapret" },
  { login: "torvalds", name: "Linus Torvalds" },
  { login: "karpathy", name: "Andrej Karpathy" },
  { login: "yyx990803", name: "Evan You" },
  { login: "gaearon", name: "Dan Abramov" },
  { login: "sindresorhus", name: "Sindre Sorhus" },
  { login: "ruanyf", name: "Ruan Yifeng" },
  { login: "peng-zhihui", name: "Peng Zhihui" },
  { login: "bradtraversy", name: "Brad Traversy" },
  { login: "gustavoguanabara", name: "Gustavo Guanabara" }
];

const form = document.getElementById('form');
const input = document.getElementById('username');
const result = document.getElementById('result');
const btn = form.querySelector('button');
const viewSearch = document.getElementById('view-search');
const viewTop = document.getElementById('view-top');
const viewViewed = document.getElementById('view-viewed');
const tabSearch = document.getElementById('tab-search');
const tabTop = document.getElementById('tab-top');
const tabViewed = document.getElementById('tab-viewed');
const langSwitch = document.getElementById('lang-switch');

let currentLang = localStorage.getItem('gh_lang') || 'ru';

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

function applyLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key === 'tab_top' || key === 'tab_viewed') {
      const svg = key === 'tab_top' ? SVG_CROWN : SVG_FIRE;
      el.innerHTML = `${svg} ${t(key)}`;
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  langSwitch.value = currentLang;
  if (!viewTop.classList.contains('hidden')) renderList(TOP_USERS, 'top');
  if (!viewViewed.classList.contains('hidden')) renderList(MOST_VIEWED, 'viewed');
}

langSwitch.addEventListener('change', (e) => {
  currentLang = e.target.value;
  localStorage.setItem('gh_lang', currentLang);
  applyLanguage();
});

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20,
      size: Math.random() * 8 + 4,
      color: ['#e3b341', '#ffffff', '#58a6ff', '#2ea043'][Math.floor(Math.random() * 4)],
      life: 100 + Math.random() * 100
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.5; 
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      if (p.life <= 0) particles.splice(i, 1);
    });
    if (particles.length > 0) requestAnimationFrame(update);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  update();
}

function renderCard(user, isTop = false, isViewed = false) {
  const date = new Date(user.created_at).getFullYear();
  const bio = user.bio ? `<p class="card-bio">"${user.bio}"</p>` : '';
  const topClass = (isTop || isViewed) ? 'top-card' : '';
  
  let topBadge = '';
  if (isTop) topBadge = `<div class="top-badge">${SVG_CROWN} ${t('badge_top')}</div>`;
  else if (isViewed) topBadge = `<div class="top-badge" style="background:#da3633;color:#fff;border:1px solid #f85149;">${SVG_FIRE} ${t('badge_viewed')}</div>`;
  
  let nameDisplay = user.name || user.login;
  if (isTop) nameDisplay = `${SVG_CROWN} ${nameDisplay}`;
  if (isViewed && user.login === 'flowseal') nameDisplay = `${SVG_FIRE} ${nameDisplay}`;

  result.innerHTML = `
    <div class="card ${topClass}">
      ${topBadge}
      <div class="card-header">
        <img src="${user.avatar_url}" alt="avatar" class="card-avatar">
        <div>
          <div class="card-name">${nameDisplay}</div>
          <div class="card-login">@${user.login}</div>
        </div>
      </div>
      ${bio}
      <div class="card-stats">
        <div>
          <span class="stat-value">${user.public_repos}</span>
          <span class="stat-label">${t('repos')}</span>
        </div>
        <div>
          <span class="stat-value">${user.followers}</span>
          <span class="stat-label">${t('followers')}</span>
        </div>
        <div>
          <span class="stat-value">${user.following}</span>
          <span class="stat-label">${t('following')}</span>
        </div>
      </div>
      <div class="card-footer">
        <span>${t('on_github_since')} ${date} ${t('year')}</span>
        <a href="${user.html_url}" target="_blank" class="card-link">${t('profile')}</a>
      </div>
    </div>
  `;
}

function renderList(users, type) {
  result.innerHTML = `<div class="list-container">${users.map((u, i) => `
    <div class="list-item" data-login="${u.login}" data-type="${type}">
      <div class="list-item-left">
        <img src="https://github.com/${u.login}.png?size=80" class="list-avatar" alt="${u.login}">
        <div>
          <div class="list-name">${u.name}</div>
          <div class="list-login">@${u.login}</div>
        </div>
      </div>
      ${i === 0 && type === 'top' ? `<span class="list-badge">${SVG_CROWN}</span>` : ''}
      ${i === 0 && type === 'viewed' ? `<span class="list-badge viewed">${SVG_FIRE}</span>` : ''}
    </div>
  `).join('')}</div>`;

  document.querySelectorAll('.list-item').forEach(el => {
    el.addEventListener('click', async () => {
      const login = el.dataset.login;
      const itemType = el.dataset.type;
      result.innerHTML = '<div class="loader"></div>';
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(login)}`);
        if (!res.ok) throw new Error('api');
        const data = await res.json();
        renderCard(data, itemType === 'top', itemType === 'viewed');
        if (itemType === 'top' && login === 'torvalds') triggerConfetti();
      } catch (err) {
        result.innerHTML = `<p class="error">${t('error_api')}</p>`;
      }
    });
  });
}

async function fetchUser(username, isTop = false, isViewed = false) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!res.ok) {
      if (res.status === 404) throw new Error(t('error_404'));
      if (res.status === 403) throw new Error(t('error_403'));
      throw new Error(`${t('error_api')}: ${res.status}`);
    }
    const data = await res.json();
    renderCard(data, isTop, isViewed);
  } catch (err) {
    result.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = input.value.trim();
  if (!username) return;
  result.innerHTML = '<div class="loader"></div>';
  btn.disabled = true;
  await fetchUser(username, false, false);
  btn.disabled = false;
});

function switchTab(activeTab, showView, hideViews) {
  [tabSearch, tabTop, tabViewed].forEach(t => t.classList.remove('active'));
  activeTab.classList.add('active');
  [viewSearch, viewTop, viewViewed].forEach(v => v.classList.add('hidden'));
  showView.classList.remove('hidden');
  result.innerHTML = '';
}

tabSearch.addEventListener('click', () => switchTab(tabSearch, viewSearch, [viewTop, viewViewed]));
tabTop.addEventListener('click', () => {
  switchTab(tabTop, viewTop, [viewSearch, viewViewed]);
  renderList(TOP_USERS, 'top');
});
tabViewed.addEventListener('click', () => {
  switchTab(tabViewed, viewViewed, [viewSearch, viewTop]);
  renderList(MOST_VIEWED, 'viewed');
});

applyLanguage();