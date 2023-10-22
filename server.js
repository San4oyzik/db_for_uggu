const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3006;

// Настройка подключения к БД
const db = mysql.createConnection({
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11655358',
  password: 'SAPqwm6S4M',
  database: 'sql11655358'
})

// Подключение к БД 

db.connect(err => {
  if (err) {
    console.error(`Ошибка подключения к базе данных: ${err.stack}`);
    return
  }
  console.log('Успешное подключение к базе данных!');
})

app.get('/', (req, res) => {
  res.send('Сервер запущен! Введи в адресную строку /api/getdata для получения данных из базы данных')
})

app.get('/api/getdata', (req, res) => {
  const query = 'SELECT * FROM `users`'

  db.query(query, (err, result) => {
    if (err) {
      console.error(`Ошибка выполнения запроса: ${err}`);
      res.status(500).json({error: 'Ошибка при запросе к базе данных'})
    } else {
      res.json(result)
    }
  })
})

app.listen(port, () => {
  console.log(`Сервер успешно запущен на порту ${port}`);
})