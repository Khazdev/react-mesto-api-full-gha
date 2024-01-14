// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto.khazanov.nomoredomainsmonster.ru',
  'http://mesto.khazanov.nomoredomainsmonster.ru',
  'localhost:3000'
];

module.exports = (req, res, next) => {
  // Сохраняем источник запроса в переменную origin
  const {origin} = req.headers;
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const {method} = req;
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method==='OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
}