const navToggle = document.getElementById('nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav?.classList.remove('open');
  });
});

if (document.title.startsWith('Becky Dalton')) {
  const bioCopy = document.querySelector('.staff-bio-copy');
  const backLink = bioCopy?.querySelector('.staff-bio-back');

  if (bioCopy && backLink) {
    bioCopy.querySelectorAll(':scope > p:not(.staff-bio-role)').forEach((paragraph) => paragraph.remove());
    [
      'Becky holds a Master’s Degree in Social Work from the University of Utah and has trained in a variety of therapeutic approaches, including Cognitive Behavioral Therapy (CBT), Child-Centered Play Therapy, and Jungian Therapy. She continues to expand her knowledge of different therapeutic modalities to best serve her clients.',
      'With experience as a Mental Health Coordinator working with children in school settings and volunteering as a domestic violence advocate at the hospital, Becky has developed a passion for helping people of all ages, especially children. She believes in the power of creating a safe space for healing and growth.',
      'Outside of work, Becky enjoys life on her farm with her husband and four children or attending local rodeos. She loves hosting events, exploring the beauty of Southern Utah, and connecting with family and friends. Becky offers both telehealth and in-person sessions in Panguitch, UT.',
    ].forEach((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      bioCopy.insertBefore(paragraph, backLink);
    });
  }
}

if (document.title.startsWith('Sabrina Evans')) {
  document.body.classList.add('sabrina-page');
  const sabrinaPhoto = document.querySelector('.staff-bio-photo');
  if (sabrinaPhoto) {
    sabrinaPhoto.src = 'Sabrina%20Evans%20new%20headshot.JPG';
    sabrinaPhoto.alt = 'Sabrina Evans';
  }
}

if (document.title.startsWith('Alicia Hill')) {
  const aliciaPhoto = document.querySelector('.staff-bio-photo');
  if (aliciaPhoto) {
    aliciaPhoto.src = 'Alicia%20Hill%20headshot%202.JPG';
    aliciaPhoto.alt = 'Alicia Hill';
  }
}

if (document.title.startsWith('Justin Larson')) {
  const justinPhoto = document.querySelector('.staff-bio-photo');
  if (justinPhoto) {
    justinPhoto.src = 'Justin%20Larson%20Headshot.jpg';
    justinPhoto.alt = 'Justin Larson';
  }
}

if (document.title.startsWith('Derek Wolfgramm')) {
  const derekPhoto = document.querySelector('.staff-bio-photo');
  if (derekPhoto) {
    derekPhoto.src = 'Derek%20Wolfgramm%20Headshot%201.jpg';
    derekPhoto.alt = 'Derek Wolfgramm';
  }
}

if (document.title.startsWith('Sarah Cowley')) {
  document.body.classList.add('sarah-page');
  const sarahPhoto = document.querySelector('.staff-bio-photo');
  if (sarahPhoto) {
    sarahPhoto.src = 'Sarah%20Cowley%20headshot.JPG';
    sarahPhoto.alt = 'Sarah Cowley';
  }
}

const localStaffPhotos = {
  'Sariah Hunt': 'assets/employee-images/Sariah-scaled.jpg',
  'Weston Hunt': 'assets/employee-images/Weston-scaled.jpg',
  'Jennifer McIff': 'assets/employee-images/JenMcIff-scaled.jpg',
  'Lorna Olson': 'assets/employee-images/LornaOlson-scaled.jpg',
  'Jenny Livingston': 'assets/employee-images/JennyLivingston-scaled.jpg',
  'Cecilia Trujillo': 'assets/employee-images/Cecilia-scaled.jpg',
  'Colton Jones': 'assets/employee-images/Colton-scaled.jpg',
  'Lichelle Fewkes': 'assets/employee-images/Lichelle-scaled.jpg',
  'Bradyn Hattendorf': 'assets/employee-images/Bradyn.jpg',
  'Becky Dalton': 'assets/employee-images/Becky-scaled.jpg',
  'Sydney Rasmussen': 'assets/employee-images/Sydney-scaled.jpg',
  'April Laupapa': 'assets/employee-images/April.jpg',
  'Renee Madsen': 'assets/employee-images/Renee-scaled.jpg',
  'Lexi Murray': 'assets/employee-images/Lexi-scaled.jpg',
};

const localStaffPhoto = Object.entries(localStaffPhotos)
  .find(([name]) => document.title.startsWith(name));
const staffBioPhoto = document.querySelector('.staff-bio-photo');
if (localStaffPhoto && staffBioPhoto) {
  staffBioPhoto.src = localStaffPhoto[1];
  staffBioPhoto.alt = localStaffPhoto[0];
}

function updateFooterYear() {
  const currentYear = new Date().getFullYear();
  const copyrightNodes = document.querySelectorAll('.footer-bottom p:first-child');

  copyrightNodes.forEach((node) => {
    const text = node.textContent || '';
    node.textContent = text.replace(/\b\d{4}\b/, String(currentYear));
  });
}

// Fetch employee data from a published Google Sheet CSV and feed the team carousel
let _teamCarouselInterval = null;
let teamItems = [];

function normalizeDriveUrl(rawUrl) {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  const toProxyUrl = (sourceUrl) => `https://wsrv.nl/?url=${encodeURIComponent(sourceUrl)}&w=1200&output=jpg`;

  const fileIdMatch = trimmed.match(/\/d\/([A-Za-z0-9_-]+)/);
  if (fileIdMatch) {
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    return toProxyUrl(directUrl);
  }
  const idParamMatch = trimmed.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if (idParamMatch) {
    const directUrl = `https://drive.google.com/uc?export=view&id=${idParamMatch[1]}`;
    return toProxyUrl(directUrl);
  }

  if (trimmed.includes('googleusercontent.com')) {
    return toProxyUrl(trimmed);
  }

  if (trimmed.includes('drive.google.com')) {
    return toProxyUrl(trimmed);
  }

  return trimmed;
}

function parseCsvRow(line) {
  const values = [];
  let current = '';
  let insideQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }
    if (char === ',' && !insideQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values;
}

function getFallbackTeamItems() {
  const imageNodes = Array.from(document.querySelectorAll('.team-image-list img'));
  return imageNodes
    .map((img) => ({
      url: img.dataset.src || img.src,
      alt: img.alt || '',
      label: img.alt || '',
    }))
    .filter((item) => item.url);
}

function initTeamCarousel(items = null) {
  const cards = Array.from(document.querySelectorAll('.team-card'));
  if (cards.length !== 3) return;

  const data = Array.isArray(items) && items.length > 0
    ? items
    : getFallbackTeamItems();

  if (data.length === 0) return;

  const defaultCopyTexts = cards.map((card) => {
    const span = card.querySelector('.team-card-copy span');
    return span ? span.textContent.trim() : '';
  });

  if (_teamCarouselInterval) {
    clearInterval(_teamCarouselInterval);
    _teamCarouselInterval = null;
  }

  let currentIndices = [0, 1, 2].map((index) => index % data.length);
  let nextIndex = 3 % data.length;
  const intervalMs = 10000;

  const updateCardImages = (indices) => {
    cards.forEach((card, index) => {
      const media = card.querySelector('.team-card-media');
      const copySpan = card.querySelector('.team-card-copy span');
      if (!media) return;

      const item = data[indices[index] % data.length];
      const imageUrl = item?.url || '';
      const imageAlt = item?.label || item?.alt || '';

      media.classList.remove('zoomed', 'active');
      card.classList.toggle('centered', index === 1);
      card.setAttribute('aria-label', imageAlt || `Meet our team member group ${index + 1}`);

      media.style.backgroundImage = imageUrl ? `url('${imageUrl}')` : 'none';
      media.style.backgroundSize = 'cover';
      media.style.backgroundPosition = 'center';

      if (copySpan) {
        copySpan.textContent = index === 1 && imageAlt ? imageAlt : defaultCopyTexts[index];
      }

      media.getBoundingClientRect();

      requestAnimationFrame(() => {
        media.classList.add('active');

        if (index === 1) {
          window.setTimeout(() => {
            media.classList.add('zoomed');
          }, 700);
        }
      });
    });
  };

  updateCardImages(currentIndices);

  if (data.length <= 1) return;

  _teamCarouselInterval = setInterval(() => {
    currentIndices = [nextIndex, currentIndices[0], currentIndices[1]];
    updateCardImages(currentIndices);
    nextIndex = (nextIndex + 1) % data.length;
  }, intervalMs);
}

function fetchSheetImages(sheetId, gid = '0') {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  return fetch(csvUrl)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch sheet. Ensure it is published or shared (Anyone with the link).');
      return res.text();
    })
    .then((csv) => {
      const rows = csv.trim().split(/\r?\n/)
        .slice(1) // drop header row
        .map((line) => {
          const cols = parseCsvRow(line);
          const orderValue = Number.parseInt(cols[2], 10);
          return {
            url: normalizeDriveUrl(cols[0]),
            alt: cols[1] || '',
            label: cols[1] || '',
            order: Number.isNaN(orderValue) ? Number.MAX_SAFE_INTEGER : orderValue,
          };
        })
        .filter((r) => r.url);

      rows.sort((a, b) => a.order - b.order);

      if (rows.length === 0) {
        throw new Error('No valid team rows found in the sheet.');
      }

      teamItems = rows;
      initTeamCarousel(teamItems);
    })
    .catch((err) => {
      console.warn('fetchSheetImages error:', err);
      initTeamCarousel();
    });
}

// If you want this sheet loaded automatically, set SHEET_ID below.
const SHEET_ID = '1CiiGbA-7AhVrH6a1uxJe0COzX4QfVKzjOYSYfZJaLd8';
const SHEET_GID = '0';

window.addEventListener('DOMContentLoaded', () => {
  updateFooterYear();

  // try to load images from the provided sheet id; if it fails, the existing static images remain
  if (SHEET_ID) {
    fetchSheetImages(SHEET_ID, SHEET_GID).then(() => {
      // no-op
    });
  } else {
    initTeamCarousel();
  }
});
