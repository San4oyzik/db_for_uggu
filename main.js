const { Sequelize } = require('sequelize'); // библиотека ORM для JS
const UserModel = require('./models/User');
const UserRepository = require('./repositories/UserRepository');

const sequelize = new Sequelize('sql11655358', 'sql11655358', 'SAPqwm6S4M', {
  dialect: 'mysql',
  host: 'sql11.freemysqlhosting.net',
});

const User = UserModel(sequelize);
const userRepository = new UserRepository(sequelize, User);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено.');

    const users = await userRepository.getAllUsers();
    console.log('Список пользователей из базы данных:');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Имя: ${user.name}, Пароль: ${user.pass}, Email: ${user.email}`);
    });
  } catch (error) {
    console.error(`Ошибка при взаимодействии с базой данных: ${error}`);
  } finally {
    await sequelize.close();
  }
};

main();
