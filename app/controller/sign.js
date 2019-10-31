'use strict';

const Controller = require('egg').Controller;
const validate = require('../util/validator');
const _ = require('lodash');

class SignController extends Controller {
  async signup() {
    const ctx = this.ctx;
    const {
      name,
      email,
      passport,
    } = ctx.request.body;

    let msg = '';
    let user;

    msg = validate.validUserName(name) ? validate.validUserName(name) : msg;
    msg = validate.validPassport(passport) ? validate.validPassport(passport) : msg;
    msg = validate.validEmail(email) ? validate.validEmail(email) : msg;

    const isValid = _.isEmpty(msg);

    if (!isValid) {
      ctx.body = {
        code: 'FAIL',
        msg,
      };
      return;
    }

    user = await ctx.service.user.getUserByCompleteName(name);

    if (user) {
      msg = '该用户已存在';

      ctx.body = {
        code: 'FAIL',
        msg,
      };

      return;
    }

    user = await ctx.service.user.getUserByEmail(email);

    if (user) {
      msg = '该邮箱已被注册';
      ctx.body = {
        code: 'FAIL',
        msg,
      };

      return;
    }

    await ctx.service.user.createUser({
      name,
      passport,
      email,
    });

    ctx.body = {
      code: 'SUCCESS',
      msg: '注册成功',
    };
  }

  async signin() {
    const ctx = this.ctx;
    const {
      name,
      passport,
    } = ctx.request.body;

    let msg = '';

    msg = validate.validUserName(name) ? validate.validUserName(name) : msg;
    msg = validate.validPassport(passport) ? validate.validPassport(passport) : msg;

    const isValid = _.isEmpty(msg);

    if (!isValid) {
      ctx.body = {
        code: 'FAIL',
        msg,
      };
      return;
    }

    const user = await ctx.service.user.getUserByCompleteName(name);

    if (user) {
      if (user.passport === passport) {
        ctx.body = {
          code: 'SUCCESS',
          msg: '登录成功',
        };

        ctx.session.user = {
          id: user.id,
          name: user.name,
        };
        return;
      }

      ctx.body = {
        code: 'FAIL',
        msg: '账号密码错误',
      };

      return;
    }

    ctx.body = {
      code: 'FAIL',
      msg: '没有该用户',
    };
  }

  async logout() {
    this.ctx.session = null;
    this.ctx.redirect('/');
  }
}

module.exports = SignController;
