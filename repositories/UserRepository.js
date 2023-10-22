class UserRepository {
  constructor(sequelize, User) {
    this.sequelize = sequelize;
    this.User = User;
  }

  async getAllUsers() {
    try {
      const users = await this.User.findAll({
        attributes: ['id', 'name', 'pass', 'email'],
      });
      return users;
    } catch (error) {
      console.error(`Ошибка при получении данных из БД: ${error}`);
    }
  }
}

module.exports = UserRepository;
