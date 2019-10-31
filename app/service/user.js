'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;

class UserService extends Service {
  async createUser({ name, email, passport }) {
    const user = await this.app.model.User.create({
      name, email, passport,
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

    return await this.ctx.model.User.findOne({
      where: {
        name,
      },
    });
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
}

module.exports = UserService;
