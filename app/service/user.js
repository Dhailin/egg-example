'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;

class UserService extends Service {
  async createUser({ name, email, password }) {
    const user = await this.app.model.User.create({
      name, email, password,
    });

    return user;
  }

  /**
   * 根据用户名查找用户模糊搜索
   * @param {Array} name 用户名
   */
  async getUsersByName(name) {
    if (!name) {
      return [];
    }

    return await this.ctx.model.User.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
    });
  }

  /**
   * 根据完整的名称查找用户
   * @param {String} name 用户名
   */
  async getUserByCompleteName(name) {
    if (!name) {
      return null;
    }

    const user = await this.ctx.model.User.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  /**
   * 根据邮箱查找用户
   * @param {String} email 邮箱
   */
  async getUserByEmail(email) {
    if (!email) {
      return null;
    }

    return await this.ctx.model.User.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * 根据ID查找用户
   * @param {String} id 用户ID
   */
  async getUserById(id) {
    if (!id) {
      return null;
    }

    return await this.ctx.model.User.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 删除用户根据用户名和密码来判断
   * @param {String} name 用户名
   * @param {String} password 密码
   */
  async deleteUserByNameAndPassword(name, password) {
    if (!name || !password) {
      return null;
    }

    return await this.ctx.model.User.destroy({
      where: {
        [Op.and]: [{
          name,
          password,
        }],
      },
    });
  }
}

module.exports = UserService;
