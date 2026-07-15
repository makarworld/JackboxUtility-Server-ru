#!/usr/bin/env node
/**
 * Локализует JackboxUtility-Server-ru из jackboxgames.ru
 * Запуск из корня репозитория: node JackboxUtility-Server-ru/tool/localize-from-jbru.mjs
 */
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(SERVER_ROOT, '..');
const titleToId = JSON.parse(
  fs.readFileSync(path.join(REPO_ROOT, 'jackbox_patcher/tool/ru_title_to_id.json'), 'utf8'),
);

const PACK_SLUGS = [
  ['jpp1', 'party-pack-1'],
  ['jpp2', 'party-pack-2'],
  ['jpp3', 'party-pack-3'],
  ['jpp4', 'party-pack-4'],
  ['jpp5', 'party-pack-5'],
  ['jpp6', 'party-pack-6'],
  ['jpp7', 'party-pack-7'],
  ['jpp8', 'party-pack-8'],
  ['jpp9', 'party-pack-9'],
  ['jppstarter', 'party-starter'],
  ['df2', '%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D1%87-2'],
  ['quip', '%D1%81%D0%BC%D0%B5%D1%85%D0%BB%D1%8B%D1%81%D1%82'],
];

/** Игры без страницы на jackboxgames.ru — имена с whatif.one / сообщества */
const MANUAL_GAMES = {
  mad_verse_city: {
    name: 'Безумный Стихоград',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Рэп-баттл в стиле 90-х — сочиняйте рифмы и побеждайте соперников.',
  },
  zeeple_dome: {
    name: 'Купол Зипол',
    tagline: 'Для 2-10 игроков.',
    smallDescription: 'Для 2-10 игроков.',
    description: 'Для 2-10 игроков. Спортивная аркада с физикой — забрасывайте зиплы в купол.',
  },
  trivia_murder_party_2: {
    name: 'Смертельная вечеринка 2',
    tagline: 'Для 1-8 игроков.',
    smallDescription: 'Для 1-8 игроков.',
    description: 'Для 1-8 игроков. Продолжение ужасающей викторины с серийным убийцей.',
  },
  role_models: {
    name: 'Анализ роли',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Узнайте, кто из друзей больше всего похож на знаменитость.',
  },
  teeko2: {
    name: 'Футбол К.О. 2',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Рисуйте бойцов и выбивайте соперников с ринга.',
  },
  timejinx: {
    name: 'Таймджинкс',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Викторина, где прошлое и будущее постоянно меняются местами.',
  },
  fixytext: {
    name: 'ФиксиТекст',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Совместно редактируйте текст, пока таймер не истечёт.',
  },
  dodoremi: {
    name: 'До-ре-ми',
    tagline: 'Для 3-9 игроков.',
    smallDescription: 'Для 3-9 игроков.',
    description: 'Для 3-9 игроков. Музыкальная игра — напевайте мелодии и угадывайте песни.',
  },
  hypnotorious: {
    name: 'Гипноториус',
    tagline: 'Для 4-8 игроков.',
    smallDescription: 'Для 4-8 игроков.',
    description: 'Для 4-8 игроков. Социальная дедукция: кто гипнотизёр, а кто обычный игрок?',
  },
  suspectives: {
    name: 'Подозрективы',
    tagline: 'Для 4-8 игроков.',
    smallDescription: 'Для 4-8 игроков.',
    description: 'Для 4-8 игроков. Ролевая дедукция — найдите преступника среди подозреваемых.',
  },
  doominate: {
    name: 'ГРОМИНАНТ',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Текстовая ситуационная игра на выживание.',
  },
  hearsay: {
    name: 'Звук вслух',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Игра со звуковыми эффектами — угадывайте и подбирайте звуки.',
  },
  cookiehaus: {
    name: 'Дом печений',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Рисовашка — рисуйте печенья и угадывайте чужие.',
  },
  legendsoftrivia: {
    name: 'Легенды викторины',
    tagline: 'Для 1-8 игроков.',
    smallDescription: 'Для 1-8 игроков.',
    description: 'Для 1-8 игроков. Викторина с легендарными ведущими Jackbox.',
  },
  fakinitanl: {
    name: 'Обмани меня! Всю ночь',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Расширенная версия «Обмани меня!» для вечеринки.',
  },
  dirtydrawful: {
    name: 'Грязный Рисовач',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Взрослая версия Рисовача для стримов.',
  },
  letmefinish: {
    name: 'Дай договорить',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Дополняйте фразы, не давая другим закончить мысль.',
  },
  surveyscramble: {
    name: 'Jackbox: Опрос-переполох',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Угадывайте ответы на опросы других игроков.',
  },
  quiplash2interlashional: {
    name: 'Смехлыст 2: Интерлашионал',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Международная версия Смехлыста 2.',
  },
  the_wheel_of_enormous_proportions: {
    name: 'Колесо невероятных масштабов',
    tagline: 'Для 2-8 игроков.',
    smallDescription: 'Для 2-8 игроков.',
    description: 'Для 2-8 игроков. Отвечайте на вопросы, чтобы крутить колесо и победить.',
  },
  youdontknowjackvol1: { name: 'А голову ты не забыл? Том 1 XL', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Классическая викторина You Don\'t Know Jack.' },
  youdontknowjackvol2: { name: 'А голову ты не забыл? Том 2', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Классическая викторина You Don\'t Know Jack.' },
  youdontknowjackvol3: { name: 'А голову ты не забыл? Том 3', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Классическая викторина You Don\'t Know Jack.' },
  youdontknowjackvol4: { name: 'А голову ты не забыл? Том 4', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Классическая викторина You Don\'t Know Jack.' },
  youdontknowjackvol6: { name: 'А голову ты не забыл? Том 6', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Классическая викторина You Don\'t Know Jack.' },
  youdontknowjacksports: { name: 'А голову ты не забил? Спорт', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Спортивная версия You Don\'t Know Jack.' },
  youdontknowjackmovies: { name: 'А голову ты не забыл? Кино', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Киноверсия You Don\'t Know Jack.' },
  youdontknowjacktelevision: { name: 'А голову ты не забыл? Телевидение', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Телеверсия You Don\'t Know Jack.' },
  youdontknowjackheadrush: { name: 'А голову ты не забил? Headrush', tagline: 'Для 1-4 игроков.', smallDescription: 'Для 1-4 игроков.', description: 'Быстрая версия You Don\'t Know Jack.' },
  use_your_words: {
    name: 'Своими словами',
    tagline: 'Для 3-6 игроков.',
    smallDescription: 'Для 3-6 игроков.',
    description:
      'Для 3-6 игроков. Пати-игра с четырьмя мини-играми на смекалку: смартфон или планшет каждого игрока выступает контроллером.',
  },
  what_the_dub: { name: 'What The Dub?!', tagline: 'Для 3-8 игроков.', smallDescription: 'Для 3-8 игроков.', description: 'Озвучивайте сцены из плохо переведённых фильмов.' },
  rifftrax_the_game: {
    name: 'RiffTrax: The Game',
    tagline: 'Для 2-6 игроков.',
    smallDescription: 'Для 2-6 игроков.',
    description:
      'Для 2-6 игроков. Пати-игра по мотивам RiffTrax: придумывайте шутки к киноклипам, озвучивайте их и голосуйте за лучшие реплики. До 12 зрителей могут смотреть и голосовать.',
  },
  blatherround: {
    name: 'Густой трёп',
    tagline: 'Для 2-6 игроков.',
    smallDescription: 'Для 2-6 игроков.',
    description:
      'Для 2-6 игроков. Игра на угадывание объектов поп-культуры. Опиши загаданное, используя очень ограниченный набор слов!',
  },
  paper_pirates: {
    name: 'Бумажные пираты',
    tagline: 'Для 3-8 игроков.',
    smallDescription: 'Для 3-8 игроков.',
    description: 'Для 3-8 игроков. Пиратская игра на бумаге и смекалку.',
  },
  papas_quiz: { name: 'Papa\'s Quiz', tagline: 'Для 3-8 игроков.', smallDescription: 'Для 3-8 игроков.', description: 'Викторина от Papa.' },
};

const FORCE_OVERRIDES = new Set(['blatherround', 'use_your_words', 'rifftrax_the_game']);

const EXTRA_TITLE_MAP = {
  'Подозрективы': 'suspectives',
  'ГРОМИНАНТ': 'doominate',
  'Doominate': 'doominate',
  'Звук вслух': 'hearsay',
  'Hear Say': 'hearsay',
  'Дом печений': 'cookiehaus',
  'Cookie Haus': 'cookiehaus',
  'Футбол К.О. 2': 'teeko2',
  'Tee K.O. 2': 'teeko2',
  'Timejinx': 'timejinx',
  'Таймджинкс': 'timejinx',
  'FixyText': 'fixytext',
  'ФиксиТекст': 'fixytext',
  'Dodo Re Mi': 'dodoremi',
  'До-ре-ми': 'dodoremi',
  'Hypnotorious': 'hypnotorious',
  'Гипноториус': 'hypnotorious',
  'Mad Verse City': 'mad_verse_city',
  'Безумный Стихоград': 'mad_verse_city',
  'Zeeple Dome': 'zeeple_dome',
  'Trivia Murder Party 2': 'trivia_murder_party_2',
  'Role Models': 'role_models',
  'Анализ роли': 'rolemodels',
  'Fibbage XL': 'fibbagexl',
  'Quiplash 2 InterLASHional': 'quiplash2interlashional',
  'Fakin\' It All Night Long': 'fakinitanl',
  'Dirty Drawful': 'dirtydrawful',
  'Let Me Finish': 'letmefinish',
  'The Jackbox Survey Scramble': 'surveyscramble',
  'Legends of Trivia': 'legendsoftrivia',
  'Легенды викторины': 'legendsoftrivia',
};

const ALL_TITLE_MAP = { ...titleToId, ...EXTRA_TITLE_MAP };

const TAGS_RU = {
  talking: {
    name: 'Общение',
    description: 'Игры, где полезно или нужно обсуждать что-то вслух.',
  },
  drawing: {
    name: 'Рисование',
    description: 'В этих играх придётся рисовать.',
  },
  deduction: {
    name: 'Стратегия',
    description: 'В этих играх нужно хорошо продумывать свои действия.',
  },
  knowledge: {
    name: 'Викторина',
    description: 'Проверьте свои знания в этих играх.',
  },
  writing: {
    name: 'Письмо',
    description: 'В этих играх придётся писать.',
  },
};

const PHRASES_RU = [
  ['Year of release:', 'Год выхода:'],
  ['This game doesn\'t require moderation.', 'Модерация не требуется.'],
  ['Players can submit text.', 'Игроки могут отправлять текст.'],
  ['Players can submit text and drawings.', 'Игроки могут отправлять текст и рисунки.'],
  ['Players can submit text in the "Gibberish Question" sections.', 'Игроки могут отправлять текст в разделах «Бессмысленный вопрос».'],
  ['The audience can vote for their favorite answers.', 'Зрители могут голосовать за понравившиеся ответы.'],
  ['The audience can vote for a lie to appear on-screen along with the others. Then, they try to guess the truth, giving players points for choosing their lies, and giving likes to their favorite lies.', 'Зрители могут проголосовать, чтобы ложь появилась на экране вместе с остальными. Затем они пытаются угадать правду, давая игрокам очки за выбор их лжи и лайки за любимые варианты.'],
  ['The audience tries to guess the correct answer along with the other players, giving points to the players in case they choose their titles, and gives likes to their favorite titles.', 'Зрители угадывают правильный ответ вместе с игроками, дают очки, если выбрали их варианты, и лайки за любимые заголовки.'],
  ['With the "Manual Censoring" option enabled, the VIP can censor responses from players once they appear on-screen.', 'При включённой опции «Ручная цензура» VIP может скрывать ответы игроков после их появления на экране.'],
  ['With the "Moderation" option enabled, the mods that enter mod.jackbox.tv will be able to decide what\'s displayed on-screen. If necessary, it\'s recommended to enable the "Profanity Filter" option. This game also has the "Manual Censoring" option, allowing the VIP to censor the player\'s responses once they appear on-screen.', 'При включённой модерации модераторы на mod.jackbox.tv решают, что показывать на экране. При необходимости включите «Фильтр ненормативной лексики». Есть и «Ручная цензура» — VIP может скрывать ответы после появления на экране.'],
  ['With the "Moderation" option enabled, the mods that enter mod.jackbox.tv will be able to decide what\'s displayed on-screen.', 'При включённой модерации модераторы на mod.jackbox.tv решают, что показывать на экране.'],
  ['This game can only be played locally. It\'s played with a keyboard and no', 'Эту игру можно играть только локально. Управление с клавиатуры, без'],
  ['In the final round, the first player to see the correct answer on-screen and press the button will win points. Because of this, the player who is streaming their screen will have an unfair advantage over the other players.', 'В финальном раунде очки получает первый, кто увидит правильный ответ на экране и нажмёт кнопку. Из-за этого стример с трансляцией экрана получает нечестное преимущество.'],
  ['This game doesn\'t require moderation. However, with the "Moderation" option enabled, the mods that enter mod.jackbox.tv will be able to decide what\'s displayed on-screen.', 'Модерация не обязательна. При её включении модераторы на mod.jackbox.tv решают, что показывать на экране.'],
  ['The irreverent quiz show party game', 'Дерзкая викторина для вечеринки'],
  ['The Say-Anything Party Game', 'Игра для вечеринки «Говори что угодно»'],
  ['The hilarious bluffing party game', 'Весёлая игра-блеф для вечеринки'],
  ['Draw badly with style!', 'Рисуй плохо, но со стилем!'],
  ['Fixes the game not working in Windows 10/11 and Linux.', 'Исправляет запуск на Windows 10/11 и Linux.'],
  ['Fixes the game not working in Windows 10/11 and Linux.', 'Исправляет запуск на Windows 10/11 и Linux.'],
];

const NAME_OVERRIDES = {
  'Fibbage 2': 'Бредовуха 2',
  'Fibbage 4': 'Бредовуха 4',
  "You Don't Know Jack 2015": 'А голову ты не забыл? 2015',
};

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (r) => {
      if (r.statusCode === 404) {
        r.resume();
        resolve('');
        return;
      }
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

function stripHtml(s) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '…')
    .replace(/&#171;/g, '«')
    .replace(/&#187;/g, '»')
    .replace(/&#8212;/g, '—')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePackPage(html) {
  const games = [];
  const h2Re = /<h2(?: class="elementor-heading-title[^"]*")?[^>]*>([^<]+)<\/h2>/gi;
  let m;
  while ((m = h2Re.exec(html))) {
    const title = stripHtml(m[1]);
    const start = m.index;
    const chunk = html.slice(start, start + 5000);
    const imgMatch = chunk.match(/src="(https:\/\/jackboxgames\.ru\/wp-content\/uploads\/[^"]+)"/);
    const descMatch =
      chunk.match(/<div class="elementor-widget-container">\s*<p>([\s\S]*?)<\/p>/) ??
      chunk.match(/<\/h2>[\s\S]*?<div class="elementor-widget-container">\s*<p>([\s\S]*?)<\/p>/);
    games.push({
      image: imgMatch?.[1] ?? '',
      title,
      description: descMatch ? stripHtml(descMatch[1]) : '',
    });
  }
  return games;
}

function parsePackIntro(html) {
  const games = parsePackPage(html);
  const packBlock = games.find((g) => g.title.startsWith('The Jackbox Party'));
  return packBlock?.description ?? '';
}

const STANDALONE_PAGES = [
  ['drawful_2', '%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D1%87-2', 'Рисовач 2'],
  ['quiplash', '%D1%81%D0%BC%D0%B5%D1%85%D0%BB%D1%8B%D1%81%D1%82', 'Смехлыст'],
];

function parseStandalonePage(html, defaultName) {
  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter(
      (p) =>
        p.length > 25 &&
        !p.startsWith('ВАЖНО:') &&
        !p.startsWith('Правила') &&
        !p.startsWith('Наш перевод') &&
        !p.startsWith('На этой странице') &&
        !p.startsWith('Для скачивания') &&
        !p.includes('jackboxgames.ru') &&
        !p.startsWith('Игра поддерживает'),
    );
  const description = paragraphs[0] ?? '';
  const tagline = description.split(/\.(?=\s)/)[0] ?? description;
  const short =
    tagline && tagline !== '.'
      ? tagline.endsWith('.')
        ? tagline
        : `${tagline}.`
      : 'Для нескольких игроков.';
  const img =
    html.match(/src="(https:\/\/jackboxgames\.ru\/wp-content\/uploads\/[^"]+banner[^"]+)"/i)?.[1] ??
    html.match(/src="(https:\/\/jackboxgames\.ru\/wp-content\/uploads\/[^"]+)"/)?.[1] ??
    '';
  return {
    name: defaultName,
    background: img,
    tagline: short,
    smallDescription: short,
    description,
    images: img ? [img] : [],
  };
}

async function scrapeRuGames() {
  const out = {};
  const unmapped = [];

  for (const [, slug] of PACK_SLUGS) {
    const html = await get(`https://jackboxgames.ru/games/${slug}/`);
    if (!html) continue;
    for (const g of parsePackPage(html)) {
      if (!g.title || g.title === 'Меню') continue;
      if (g.title.startsWith('The Jackbox Party') || g.title === 'The Jackbox Party Starter') continue;
      if (['ТРЕЙЛЕР', 'ИНФОРМАЦИЯ ОБ ИГРЕ'].includes(g.title)) continue;
      const id = ALL_TITLE_MAP[g.title];
      if (!id) {
        unmapped.push({ title: g.title, slug });
        continue;
      }
      if (out[id] && g.title.includes(':')) continue;
      const name = NAME_OVERRIDES[g.title] ?? g.title;
      const tagline = g.description.split(/\.(?=\s)/)[0] ?? g.description;
      const short = tagline.endsWith('.') ? tagline : `${tagline}.`;
      out[id] = {
        name,
        background: g.image,
        tagline: short,
        smallDescription: short,
        description: g.description,
        images: g.image ? [g.image] : [],
      };
    }
  }

  for (const [id, slug, defaultName] of STANDALONE_PAGES) {
    const html = await get(`https://jackboxgames.ru/games/${slug}/`);
    if (html) out[id] = parseStandalonePage(html, defaultName);
  }

  for (const [id, data] of Object.entries(MANUAL_GAMES)) {
    if (!out[id] || FORCE_OVERRIDES.has(id)) out[id] = { ...out[id], ...data };
  }

  if (unmapped.length) {
    console.error('Не сопоставлено с jackboxgames.ru:');
    for (const u of unmapped) console.error(`  [${u.slug}] ${u.title}`);
  }
  return out;
}

function resolveRuId(id) {
  if (ruGames[id]) return id;
  const base = id
    .replace(/_ms$/, '')
    .replace(/_starter(_ms)?$/, '')
    .replace(/_standalone$/, '');
  if (ruGames[base]) return base;
  if (id === 'fibbagexl_standalone') return 'fibbagexl';
  if (id === 'role_models') return 'rolemodels';
  if (id === 'trivia_murder_party_2') return 'triviamurderparty2';
  if (id === 'quiplash3_starter' || id === 'quiplash3_starter_ms') return 'quiplash3';
  if (id === 'teeko_starter' || id === 'teeko_starter_ms') return 'teeko';
  if (id === 'trivia_murder_party_2_starter' || id === 'trivia_murder_party_2_starter_ms') return 'triviamurderparty2';
  if (id === 'the_wheel_of_enormous_proportions') return 'thewheel';
  if (MANUAL_GAMES[id]) return id;
  const manualBase = id.replace(/_ms$/, '');
  if (MANUAL_GAMES[manualBase]) return manualBase;
  return null;
}

function trPhrase(s) {
  if (!s) return s;
  let out = s;
  for (const [en, ru] of PHRASES_RU) out = out.split(en).join(ru);
  return out;
}

function buildEnGameMap(enPacks) {
  const map = new Map();
  for (const pack of enPacks.packs ?? []) {
    for (const game of pack.games ?? []) map.set(game.id, game);
  }
  return map;
}

function keepEnGameImages(game, enById) {
  const en = enById.get(game.id);
  if (!en?.game_info) return;
  if (en.background) game.background = en.background;
  if (en.game_info.images) game.game_info.images = en.game_info.images;
}

function applyRuToGame(game) {
  const ruId = resolveRuId(game.id);
  const ru = ruId ? ruGames[ruId] : null;
  if (ru) {
    game.name = ru.name;
    if (game.game_info) {
      if (ru.tagline) {
        game.game_info.tagline = ru.tagline;
        game.game_info.small_description = ru.smallDescription ?? ru.tagline;
      }
      if (ru.description) game.game_info.description = ru.description;
    }
  } else {
    game.name = trPhrase(game.name);
  }

  if (game.game_info) {
    for (const key of [
      'tagline',
      'small_description',
      'description',
      'moderation_description',
      'stream_friendly_description',
      'audience_description',
    ]) {
      if (game.game_info[key]) game.game_info[key] = trPhrase(game.game_info[key]);
    }
  }
}

function translatePatch(patch) {
  if (patch.name) patch.name = trPhrase(patch.name);
  if (patch.small_description) patch.small_description = trPhrase(patch.small_description);
  if (patch.description) patch.description = trPhrase(patch.description);
  for (const c of patch.components ?? []) {
    if (c.name) c.name = trPhrase(c.name);
    if (c.small_description) c.small_description = trPhrase(c.small_description);
    if (c.description) c.description = trPhrase(c.description);
  }
}

let ruGames = {};

async function main() {
  console.error('Скрапинг jackboxgames.ru...');
  ruGames = await scrapeRuGames();
  console.error(`Получено ${Object.keys(ruGames).length} игр`);

  const ruGamesPath = path.join(REPO_ROOT, 'jackbox_patcher/assets/data/ru_games.json');
  fs.writeFileSync(ruGamesPath, JSON.stringify(ruGames, null, 2), 'utf8');
  console.error(`Обновлён ${ruGamesPath}`);

  const packsPath = path.join(SERVER_ROOT, 'api/v2/packs.json');
  const data = JSON.parse(fs.readFileSync(packsPath, 'utf8'));
  const enPacks = JSON.parse(
    await get(
      'https://raw.githubusercontent.com/AkiraArtuhaxis/JackboxUtility-Server-en/main/api/v2/packs.json',
    ),
  );
  const enById = buildEnGameMap(enPacks);

  for (const tag of data.tags ?? []) {
    const ru = TAGS_RU[tag.id];
    if (ru) {
      tag.name = ru.name;
      tag.description = ru.description;
    }
  }

  const packIntros = {};
  for (const [packId, slug] of PACK_SLUGS) {
    const html = await get(`https://jackboxgames.ru/games/${slug}/`);
    if (html) packIntros[packId] = parsePackIntro(html);
  }

  for (const pack of data.packs ?? []) {
    pack.name = trPhrase(pack.name);
    pack.description = trPhrase(pack.description);
    const intro = packIntros[pack.id];
    if (intro) {
      const year = pack.description?.match(/\d{4}/)?.[0];
      pack.description = year ? `Год выхода: ${year}. ${intro}` : intro;
    }
    for (const patch of [...(pack.patchs ?? []), ...(pack.fixes ?? [])]) translatePatch(patch);
    for (const game of pack.games ?? []) {
      applyRuToGame(game);
      keepEnGameImages(game, enById);
    }
  }

  fs.writeFileSync(packsPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.error(`Локализован ${packsPath}`);

  const welcomePath = path.join(SERVER_ROOT, 'api/v2/welcome.json');
  fs.writeFileSync(
    welcomePath,
    JSON.stringify(
      {
        news: [
          {
            id: '2026-07-15',
            title: 'Jackbox Utility RU',
            smallDescription: 'Добро пожаловать в Jackbox Utility!',
            content:
              '# Русский сервер Jackbox Utility\n\nПереводы игр и патчи с [jackboxgames.ru](https://jackboxgames.ru/) и [dl.whatif.one](https://dl.whatif.one/).\n\nПриятной игры!',
            image: 'news_images/jackboxutility.png',
          },
          {
            id: '2026-07-15-discord',
            title: 'Discord-чат переводчиков',
            smallDescription: 'Присоединяйтесь к сообществу Jackbox RU!',
            content:
              '# Нужна помощь или хочется сыграть?\n\nЗаходите в Discord-чат русского сообщества:\n\n<https://discord.com/T3PKMAP>',
            image: 'news_images/discord.png',
          },
          {
            id: '2026-07-15-dl',
            title: 'Загрузки переводов',
            smallDescription: 'Официальные архивы русификаторов на dl.whatif.one',
            content:
              '# Скачать переводы\n\nАктуальные файлы русификаторов — на сайте What If:\n\n<https://dl.whatif.one/>\n\nТребуется лицензионная копия игры в Steam.',
            image: 'news_images/banner.png',
          },
        ],
      },
      null,
      4,
    ) + '\n',
    'utf8',
  );

  const messagesPath = path.join(SERVER_ROOT, 'api/v2/messages.json');
  fs.writeFileSync(
    messagesPath,
    JSON.stringify(
      {
        menuComponent: {
          type: 'column',
          children: [
            { type: 'text', text: '' },
            { type: 'text', text: 'Пользователям Microsoft Store:' },
            {
              type: 'text',
              text: 'Эти версии нужно добавить вручную в разделе «Настройки».',
            },
            {
              type: 'text',
              text: 'Выберите папку «Content» внутри папки каждой игры. Например:',
            },
            {
              type: 'text',
              text: 'C:/XboxGames/The Jackbox Party Pack 7/Content',
            },
          ],
        },
        gamesComponent: [],
        patchesComponent: [],
      },
      null,
      2,
    ) + '\n',
    'utf8',
  );

  console.error('Готово: welcome.json, messages.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
