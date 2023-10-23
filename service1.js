const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!')
})

// Обработка запроса на получение заявки
app.post('/request', async (req, res) => {
  const requestData = req.body;

  // Отправляем запрос на сервис 2 для проверки наличия товара
  try {
    const response = await axios.post('http://localhost:3001/check_availability', requestData);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при проверке наличия товара' });
  }
});

app.listen(port, () => {
  console.log(`Сервис 1 запущен на порту ${port}`);
});
