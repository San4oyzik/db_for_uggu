const express = require('express');
const { Sequelize } = require('sequelize'); // библиотека ORM для JS
const UserModel = require('./models/User');
const UserRepository = require('./repositories/UserRepository');
const port = 3006;
const app = express();

app.use(express.json())

const sequelize = new Sequelize('sql11655358', 'sql11655358', 'SAPqwm6S4M', {
  dialect: 'mysql',
  host: 'sql11.freemysqlhosting.net',
});

const User = UserModel(sequelize);
const userRepository = new UserRepository(sequelize, User);

// REST API роуты для работы с пользователями
app.post('/users', async (req, res) => {
  try {
    const newUser = await userRepository.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userRepository.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userRepository.updateUser(userId, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedCount = await userRepository.deleteUser(userId);
    if (deletedCount) {
      res.json({ message: 'Пользователь успешно удален' });
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
  }
});

app.listen(port, () => {
  console.log(`REST API запущен на порту ${port}`);
});


// const main = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Соединение с базой данных установлено.');

//     const users = await userRepository.getAllUsers();
//     console.log('Список пользователей из базы данных:');
//     users.forEach(user => {
//       console.log(`ID: ${user.id}, Имя: ${user.name}, Пароль: ${user.pass}, Email: ${user.email}`);
//     });
//   } catch (error) {
//     console.error(`Ошибка при взаимодействии с базой данных: ${error}`);
//   } finally {
//     await sequelize.close();
//   }
// };

// main();