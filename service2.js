const express = require('express');

const app = express();
const port = 3001;

app.use(express.json());

// Симулируем информацию о товарах на складе (просто для примера)
const warehouse = {
  product1: 10,
  product2: 20,
  product3: 30,
  product4: 0
};

app.get('/', (req, res) => {
  res.send('Сервис 2: Хранилище товаров работает!')
})

const pendingRequests = {}; // Переменная определена здесь


app.post('/check_availability', async (req, res) => {
  const { requestId, data } = req.body;

  try {
    // Имитация асинхронной операции
    await performAsyncOperation();

    if (data && data.productName && data.quantity && warehouse[data.productName] >= data.quantity) {
      // Обновляем статус запроса на Сервисе 1
      if (requestId && pendingRequests[requestId]) {
        pendingRequests[requestId].status = 'completed';
      }
      res.json({ available: true });
    } else {
      // Обновляем статус запроса на Сервисе 1
      if (requestId && pendingRequests[requestId]) {
        pendingRequests[requestId].status = 'failed';
      }
      res.json({ available: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обработке запроса' });
  }
});




// Функция, имитирующая асинхронную операцию
async function performAsyncOperation() {
  return new Promise((resolve) => {
    setTimeout(resolve, 20000); // Имитация задержки в 1 секунду
  });
}


app.listen(port, () => {
  console.log(`Сервис 2 запущен на порту ${port}`);
});
