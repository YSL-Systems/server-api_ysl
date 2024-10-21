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
  SCENARIO_UNVALID: 4008,
  SENSORS_UNVALID: 4014,
  SCENARIO_NOT_FOUND: 5002,
  FILE_NOT_FOUND: 4007,
  USER_ALREADY_EXISTS: 1002,
  REQUIRED_FIELDS_NOT_FOUND: 4000,
  FIELDS_UNVALID: 4004,
  CONFLICT_USER: 4009,
  CONFLICT_SYSTEM: 4010,
  CONFLICT_CATEGORY: 4011,
  CONFLICT_SENSOR: 4013,
  CONFLICT_SENSOR_TYPE: 4012,
  CONFLICT_OUTPUTS: 4014,
  INTERNAL_EXCEPTION: 5001,
  SERVER_EXCEPTION: 5003,
  CONTROLLER_EXCEPTION: 5004,
};

export const ErrorMessage = {
  UNAUTHORIZED: 'Не авторизован',
  AUTH_UNVALID: 'Неверный логин или пароль',
  TOKEN_UNVALID: 'Токен авторизации не валиден',
  ADMIN_UNVALID: 'Зпрешено (нет доступа)',
  FILE_UNVALID: 'Неверный формат загружаемого файла',
  SCENARIO_UNVALID: 'Превышено максимальное количество сценариев',
  SENSORS_UNVALID: 'Превышено максимальное количество датчиков',
  SCENARIO_NOT_FOUND: 'Сценария не существует',
  USER_ALREADY_EXISTS: 'Пользователь с таким номером телефона уже существует',
  REQUIRED_FIELDS_NOT_FOUND: 'В теле запроса (или в параметрах) отсутствуют обязательные поля',
  FIELDS_UNVALID: 'Какое-то из полей или параметр имеет недопустимое значение (не валидирован)',
  CONFLICT_USER: 'Пользователь уже существует',
  CONFLICT_SYSTEM: 'Система у данного пользователя уже существует',
  CONFLICT_CATEGORY: 'Категория уже существует',
  CONFLICT_SENSOR: 'Датчик с таким id в контроллере уже существует',
  CONFLICT_SENSOR_TYPE: 'Датчик с таким типом уже существует',
  CONFLICT_OUTPUTS: 'Выходной пин в данной системе уже существует',
  FILE_NOT_FOUND: 'Ошибка загрузки фото. Повторите позже',
  INTERNAL_EXCEPTION: 'Необработанная сущность',
  SERVER_EXCEPTION: 'Что-то пошло не так... Попробуйте перезагрузить приложение или повторите попытку позже',
  CONTROLLER_EXCEPTION: 'Контроллер недоступен. Проверьте подключение контроллера или повторите попытку позже',
};

export const ErrorMessageController = {
  0: {
    code: 5100,
    message: 'Ошибка парсинга. Неправильный вид посылки.',
  },
  1: {
    code: 5101,
    message: 'Неизвестная команда.',
  },
  2: {
    code: 5102,
    message: 'Неполная посылка. Не хватает переменных, для успешного выполнения.',
  },
  3: {
    code: 5103,
    message: 'Ошибка, связанная с неправильным типом или значением присланного значения.',
  },
  4: {
    code: 5104,
    message: 'Сценарий уже существует.',
  },
  5: {
    code: 5105,
    message: 'Сценарий еще не существует.',
  },
  6: {
    code: 5106,
    message: 'На линии не обнаружен новый датчик.',
  },
  7: {
    code: 5107,
    message: 'Недопустимый тип датчика.',
  },
  8: {
    code: 5108,
    message: 'Адрес не валиден или не подключен к контроллеру.',
  },
  9: {
    code: 5109,
    message: 'Превышен лимит датчиков.',
  },
  10: {
    code: 5110,
    message: 'Ошибка flash-накопителя.',
  },
  41: {
    code: 5141,
    message: 'Ошибка, связанная с аппаратной частью контроллера.',
  },
  84: {
    code: 5184,
    message: 'Url для удаленной прошивки не валиден.',
  },
  999: {
    code: 5199,
    message: 'Неизвестная ошибка.',
  },
};
