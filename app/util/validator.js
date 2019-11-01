'use strict';

const validator = require('validator');
const _ = require('lodash');

module.exports = {
  /**
   * 是否为空
   * @param {String} value 输入值
   */
  isEmpty(value) {
    return _.isEmpty(_.trim(value));
  },

  /**
   * 验证用户名
   * @param {String} userName 用户名
   */
  validUserName(userName) {
    const reg = /^[a-zA-Z0-9_-]{3,16}$/;

    if (this.isEmpty(userName)) {
      return '用户名不能为空';
    }

    if (!reg.test(_.trim(userName))) {
      return '用户名不符合规则';
    }

    return '';
  },

  /**
   * 验证密码
   * @param {String} password 密码
   */
  validPassword(password) {
    password = _.trim(password);

    if (this.isEmpty(password)) {
      return '密码不能为空';
    }

    if (password.length < 6 || password.length > 16) {
      return '密码长度为6-16位';
    }

    return '';
  },

  validEmail(email) {
    email = _.trim(email);

    if (this.isEmpty(email)) {
      return '邮箱不能为空';
    }

    if (!validator.isEmail(email)) {
      return '邮箱不正确';
    }

    return '';
  },
};
