// 6369814035:AAFSNj1X7t247nUA9BOIoHAgW_ZlTBfzuQs 6498144305

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const cors = require('cors'); // Импортируйте пакет cors

const botToken = '6369814035:AAFSNj1X7t247nUA9BOIoHAgW_ZlTBfzuQs'; // Замените на токен вашего бота
const chatId = '6498144305'; // Замените на Chat ID вашего бота

const bot = new TelegramBot(botToken, { polling: true });

const app = express();

app.use(cors()); // Используйте пакет cors для разрешения CORS

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const { Name, Email, Comment } = req.body;
  const message = `
    Новая заявка с сайта:
    Имя: ${Name}
    Email: ${Email}
    Сообщение: ${Comment}
  `;
  
  bot.sendMessage(chatId, message)
    .then(() => {
      res.send('Заявка успешно отправлена.');
    })
    .catch(error => {
      console.error('Ошибка при отправке сообщения:', error);
      res.status(500).send('Произошла ошибка при отправке заявки.');
    });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000.');
});
