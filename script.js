/* 이곳의 링크만 수정하면 메뉴·본문·푸터에 함께 반영됩니다.
 * 스토어를 개설하면 빈 문자열 대신 실제 스토어 URL을 넣으세요.
 * 외부 판매 중심으로 확장하기 전 README의 GitHub Pages 이용 조건을 확인하세요.
 */
const SITE = {
  instagram: 'https://www.instagram.com/kimhorang/',
  youtube: 'https://www.youtube.com/@kimhorang711',
  email: 'contact@kimhorang.com',
  stores: [
    { name: '네이버 스마트스토어', url: '' },
    { name: '마플샵', url: '' }
  ]
};

document.querySelectorAll('[data-link]').forEach(link => {
  const key = link.dataset.link;
  if (key === 'email') {
    link.href = 'mailto:' + SITE.email;
    link.replaceChildren(document.createTextNode(SITE.email + ' '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    link.append(arrow);
  } else if (SITE[key]) link.href = SITE[key];
});
document.getElementById('year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
navigation.classList.add('js-menu');
menuButton.hidden = false;
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  navigation.classList.toggle('is-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
window.matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));

const filters = document.querySelectorAll('[data-filter]');
const works = document.querySelectorAll('.work');
document.querySelector('.filters').hidden = false;
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  works.forEach(work => {
    work.hidden = button.dataset.filter !== 'all' && work.dataset.category !== button.dataset.filter;
    if (!work.hidden) count++;
  });
  document.getElementById('filter-status').textContent = button.textContent + ' 작업 ' + count + '개를 표시합니다.';
}));

const projects = {
  illustration: {
    category: 'ILLUSTRATION / 캐릭터 일러스트',
    title: '둘이 함께 그리는 시간',
    image: 'assets/kimhorang-hogi.png',
    alt: '스케치북을 들고 그림을 그리는 김호랑과 호기',
    copy: '김호랑이 스케치북을 펼치면 호기도 곁에 앉아요.\n호랑이 모티브의 김호랑과 아주 작은 반려호랑이 호기. 둘이 함께하는 모습을 담은 캐릭터 일러스트입니다.',
    note: '',
    duo: true
  },
  concept: {
    category: 'CONCEPT / 굿즈 디자인 목업',
    title: '손안에 들어온 작은 호기',
    image: 'assets/hogi-concept.png',
    alt: '호기 봉제인형 디자인 목업',
    copy: '그림 속 호기를 손에 쥘 수 있다면 어떤 모습일까요?\n캐릭터의 둥근 실루엣과 줄무늬를 입체로 상상해 본 디자인 목업입니다. 작은 굿즈로 이어질 가능성을 살펴보고 있어요.',
    note: 'AI로 제작한 디자인 목업입니다. 실제 제작·판매 제품이나 제품 사진이 아니며, 제작 사양과 출시 일정은 정해지지 않았습니다.',
    duo: false
  },
  emoticon: {
    category: 'EMOTICON / 이모티콘 기획',
    title: '호기로운 하루',
    image: '',
    alt: '',
    copy: '매일 쓰는 채팅창에 김호랑의 작은 세계를 담아보려 해요.\n일상의 감정과 반응을 전하는 첫 이모티콘 시리즈를 준비하고 있습니다.',
    note: '아직 출시되지 않은 기획·제작 중 프로젝트입니다.',
    duo: false
  }
};
const dialog = document.getElementById('project-dialog');
const imageFrame = document.querySelector('.dialog-image');
const dialogImage = document.getElementById('dialog-image');
let projectTrigger;
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-project]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const project = projects[button.dataset.project];
      projectTrigger = button;
      document.getElementById('dialog-category').textContent = project.category;
      document.getElementById('dialog-title').textContent = project.title;
      document.getElementById('dialog-copy').textContent = project.copy;
      document.getElementById('dialog-note').textContent = project.note;
      document.getElementById('dialog-note').hidden = !project.note;
      imageFrame.hidden = !project.image;
      imageFrame.classList.toggle('duo-art', project.duo);
      if (project.image) { dialogImage.src = project.image; dialogImage.alt = project.alt; }
      else { dialogImage.removeAttribute('src'); dialogImage.alt = ''; }
      document.body.classList.add('dialog-open');
      dialog.showModal();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (projectTrigger) projectTrigger.focus();
  });
}

const storeLinks = document.getElementById('store-links');
SITE.stores.forEach(store => {
  if (!store.url) return;
  let url;
  try { url = new URL(store.url); } catch { return; }
  if (url.protocol !== 'https:') return;
  const link = document.createElement('a');
  link.href = url.href;
  link.textContent = store.name + ' ↗';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  storeLinks.append(link);
});
if (storeLinks.children.length) {
  storeLinks.hidden = false;
  document.getElementById('store-status').textContent = '스토어 보기';
}
