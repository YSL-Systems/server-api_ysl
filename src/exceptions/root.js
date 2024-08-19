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
  UNAUTHORIZED: 4001,
  AUTH_UNVALID: 3000,
  TOKEN_UNVALID: 4002,
  ADMIN_UNVALID: 4005,
  FILE_UNVALID: 4006,
  FILE_NOT_FOUND: 4007,
  USER_ALREADY_EXISTS: 1002,
  REQUIRED_FIELDS_NOT_FOUND: 4000,
  FIELDS_UNVALID: 4004,
  CONFLICT_USER: 4009,
  INTERNAL_EXCEPTION: 5001,
};

export const ErrorMessage = {
  UNAUTHORIZED: 'Не авторизован',
  AUTH_UNVALID: 'Неверный логин или пароль',
  TOKEN_UNVALID: 'Токен авторизации не валиден',
  ADMIN_UNVALID: 'Зпрешено (нет доступа)',
  FILE_UNVALID: 'Неверный формат загружаемого файла',
  USER_ALREADY_EXISTS: 'Пользователь с таким номером телефона уже существует',
  REQUIRED_FIELDS_NOT_FOUND: 'В теле запроса (или в параметрах) отсутствуют обязательные поля',
  FIELDS_UNVALID: 'Какое-то из полей или параметр имеет недопустимое значение (не валидирован)',
  CONFLICT_USER: 'Пользователь уже существует',
  FILE_NOT_FOUND: 'Ошибка загрузки фото. Повторите позже',
  INTERNAL_EXCEPTION: 'Необработанная сущность',
};
