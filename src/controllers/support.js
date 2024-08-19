import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN, CHAT_ID } from '../secrets.js';
import { SupportScheme } from '../schema/users.js';

export const supportUser = async (req, res) => {
  SupportScheme.parse(req.body);
  const { value, type, name, phone } = req.body;

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });
  const messageChat = `
      Обратная связь с мобильного приложения.

      Пользователь - ${name}
      Телефон - ${phone}
      Тип сообщения - ${type}
      Сообщение - ${value}
      `;

  await bot.sendMessage(CHAT_ID, messageChat);
  return res.json({ success: true });
};
