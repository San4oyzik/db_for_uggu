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
  res.send('Server is running!')
})

// Обработка запроса на проверку наличия товара
app.post('/check_availability', (req, res) => {
  const requestData = req.body;

  const { productName, quantity } = requestData;

  if (warehouse[productName] && warehouse[productName] >= quantity) {
    res.json({ available: true });
  } else {
    res.json({ available: false });
  }
});

app.listen(port, () => {
  console.log(`Сервис 2 запущен на порту ${port}`);
});
