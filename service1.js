const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!')
})

const pendingRequests = {};

// Генерация уникального идентификатора запроса
function generateRequestId() {
  return Date.now().toString();
}

// Обработка запроса на получение заявки
app.post('/request', async (req, res) => {
  const requestData = req.body;
  const requestId = generateRequestId();

  // Отправляем запрос на сервис 2 для проверки наличия товара
  try {
    pendingRequests[requestId] = { data: requestData, status: 'pending' };

    await axios.post('http://localhost:3001/check_availability', { requestId, requestData });
    res.json({ requestId });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при отправке заявки' });
  }
});

app.get('/status/:requestId', (req, res) => {
  const requestId = req.params.requestId;

  // Проверяем статус запроса
  if (pendingRequests[requestId]) {
    res.json({ status: pendingRequests[requestId].status });
  } else {
    res.status(404).json({ error: 'Запрос с данным ID не найден' });
  }
});


app.listen(port, () => {
  console.log(`Сервис 1 запущен на порту ${port}`);
});
