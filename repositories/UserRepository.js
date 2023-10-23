class UserRepository {
  constructor(sequelize, User) {
    this.sequelize = sequelize;
    this.User = User;
  }

  async createUser(userData) {
    return this.User.create(userData);
  }

  async getAllUsers() {
      const users = await this.User.findAll({
        attributes: ['id', 'name', 'pass', 'email'],
      });
      return users;
  }

  async getUserById(userId) {
    return this.User.findByPk(userId, {
      attributes: ['id', 'name', 'pass', 'email'],
    });
  }

  async updateUser(userId, userData) {
    const user = await this.User.findByPk(userId);
    if (!user) {
      return null;
    }

    await user.update(userData);
    return user;
}

  async deleteUser(userId) {
    const deletedCount = await this.User.destroy({
      where: { id: userId },
    });
    return deletedCount;
  }
}
module.exports = UserRepository;