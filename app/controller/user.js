'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async createUser() {
    const ctx = this.ctx;
    const { name, email } = ctx.request.body;

    const user = await this.service.user.createUser({
      name,
      email,
    });

    ctx.status = 200;
    ctx.body = user;
  }

  async getUsers() {
    const ctx = this.ctx;
    const { name } = ctx.request.body;

    const user = await this.service.user.getUsersByName(name);

    ctx.status = 200;
    ctx.body = user;
  }

}

module.exports = UserController
;
