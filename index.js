const TelegramBot = require('node-telegram-bot-api');
const { fetchNews } = require('./newsScraper'); // Підключіть свій файл скрапінгу новин

const token = '7416615344:AAHoSyQ9-vbt2tFQ9CHlOrzQz7hXC9Th5ag';
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привіт! Я новинний бот про криптовалюти. Я повідомлю про новини кожного дня.');
});

// Функція для надсилання новин
async function sendNews(chatId) {
  const news = await fetchNews('URL_OF_THE_CRYPTO_NEWS_SITE');
  let message = 'Ось останні новини:\n';
  news.forEach((item) => {
    message += `${item.title}\n${item.link}\n\n`;
  });
  bot.sendMessage(chatId, message);
}

// Щоденне надсилання новин
setInterval(() => {
  bot.getUpdates().then(updates => {
    updates.forEach(update => {
      if (update.message) {
        sendNews(update.message.chat.id);
      }
    });
  });
}, 86400000); // Кожні 24 години
