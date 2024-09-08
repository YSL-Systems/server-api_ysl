import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN, CHAT_ID } from '../secrets.js';
import { SupportMobileScheme, SupportSiteScheme } from '../schema/users.js';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

export const supportUser = async (req, res) => {
  SupportMobileScheme.parse(req.body);
  const { value, type, name, phone } = req.body;

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

export const supportSite = async (req, res) => {
  SupportSiteScheme.parse(req.body);
  const { email, message, name, phone } = req.body;

  const messageChat = `
      Обратная связь с сайта.

      ФИО пользователя - ${name}
      Телефон - ${phone}
      Email - ${email}
      Сообщение - ${message}
      `;

  await bot.sendMessage(CHAT_ID, messageChat);
  return res.json({ success: true });
};
