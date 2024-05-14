export class HttpException extends Error {
  constructor(message, errorCode, statusCode, errors) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const ErrorCode = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  UNPROCESSABLE_ENTITY: 2001,
  INTERNAL_EXCEPTION: 3001,
  UNAUTHORIZED: 4001,
  UNVALID_TOKEN: 4002,
  UNVALID_FILE: 4003,
  FILE_NOT_FOUND: 4004,
};

export const ErrorMessage = {
  USER_NOT_FOUND: 'Пользователя с таким номером телефона не существует',
  USER_ALREADY_EXISTS: 'Пользователь с таким номером телефона уже существует',
  INCORRECT_PASSWORD: 'Неверный логин или пароль',
  UNPROCESSABLE_ENTITY: 'Необработанная сущность',
  INTERNAL_EXCEPTION: 'Что-то пошло не так...',
  UNAUTHORIZED: 'Нет авторизации',
  UNVALID_TOKEN: 'Токен невалиден',
  UNVALID_FILE: 'Неверный формат загружаемого файла',
  FILE_NOT_FOUND: 'Ошибка загрузки фото. Повторите позже',
};
