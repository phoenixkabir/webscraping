const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function fetchWebpage(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching the webpage:', error);
    throw error;
  }
}

function extractContent(html) {
  const $ = cheerio.load(html);

  const text = $('body').text();
  const images = $('img').map((i, element) => $(element).attr('src')).get();
  const urls = $('a').map((i, element) => $(element).attr('href')).get();

  return { text, images, urls };
}

function ensureAbsoluteUrl(base, relativeUrl) {
  if (relativeUrl.startsWith('//')) {
    return `https:${relativeUrl}`;
  } else if (!relativeUrl.startsWith('http')) {
    const url = new URL(relativeUrl, base);
    return url.href;
  }
  return relativeUrl;
}

function saveContent(content, baseUrl) {
  const textDir = path.join(__dirname, 'output', 'text');
  const imagesDir = path.join(__dirname, 'output', 'images');
  const urlsDir = path.join(__dirname, 'output', 'urls');

  [textDir, imagesDir, urlsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  fs.writeFileSync(path.join(textDir, 'content.txt'), content.text);

  content.images.forEach((imgSrc, index) => {
    const imgUrl = ensureAbsoluteUrl(baseUrl, imgSrc);
    const imgPath = path.join(imagesDir, `image${index}.jpg`);
    axios.get(imgUrl, { responseType: 'arraybuffer' })
      .then(response => {
        fs.writeFileSync(imgPath, response.data);
      })
      .catch(err => console.error('Error saving image:', err));
  });

  fs.writeFileSync(path.join(urlsDir, 'urls.txt'), content.urls.join('\n'));
}

const wikipediaUrl = 'https://en.wikipedia.org/wiki/Node.js';
fetchWebpage(wikipediaUrl).then(html => {
  const content = extractContent(html);
  saveContent(content, wikipediaUrl);
});
