const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();

// Настройки Telegram Bot
const TELEGRAM_BOT_TOKEN = "7751318450:AAFw1-uglEAtHdycDoJjRPyI0gfR2L9vasI";
const CHAT_ID = "773314711";

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Инициализация Telegram Bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Обработка маршрута для отправки сообщений
app.post("/send-message", async (req, res) => {
  const { name, phone, id, color, size } = req.body;

  // Проверка обязательных данных
  if (!name || !phone || !id || !color || !size) {
    return res.status(400).send({
      success: false,
      message: "Все поля формы обязательны для заполнения.",
    });
  }

  // Формирование сообщения для Telegram
  const telegramMessage = `
<b>Новое сообщение с формы:</b>
Имя: ${name}
Номер: ${phone}
ID товара: ${id}
Цвет: ${color}
Размер: ${size}
  `;

  try {
    // Отправка сообщения через Telegram API
    await bot.sendMessage(CHAT_ID, telegramMessage, { parse_mode: "HTML" });
    res.status(200).send({ success: true, message: "Сообщение отправлено." });
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error.message);
    res.status(500).send({
      success: false,
      message: "Не удалось отправить сообщение.",
    });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});





