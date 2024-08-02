const axios = require('axios');
const cheerio = require('cheerio');

async function fetchNews(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // Змінюйте вибір селекторів в залежності від структури сайту
    return $('.news-item').map((i, el) => {
      return {
        title: $(el).find('h2').text(),
        link: $(el).find('a').attr('href')
      };
    }).get();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
