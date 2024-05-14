import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN, CHAT_ID } from '../secrets.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';

export const supportUser = async (req, res) => {
  try {
    const { value, type } = req.body;
    const bot = new TelegramBot(BOT_TOKEN, { polling: true });
    const messageChat = `
      Обратная связь с мобильного приложения.

      Тип сообщения - ${type}
      Сообщение - ${value}
      `;

    await bot.sendMessage(CHAT_ID, messageChat);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};
