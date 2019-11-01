'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/sign.test.js', () => {
  const name = 'name_c_test';
  const password = '123456';
  const email = `${name}@test.com`;

  it('should POST /sign/signUp 字段验证', async () => {
    app.mockCsrf();

    let res;
    res = await app.httpRequest()
      .post('/sign/signUp')
      .send({
        name,
        email,
      });
    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '密码不能为空');

    res = await app.httpRequest()
      .post('/sign/signUp')
      .send({
        name,
        password,
      });

    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '邮箱不能为空');

    res = await app.httpRequest()
      .post('/sign/signUp')
      .send({
        email,
        password,
      });

    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '用户名不能为空');
  });

  it('should POST /sign/signUp', async () => {
    app.mockCsrf();
    const res = await app.httpRequest()
      .post('/sign/signUp')
      .send({
        name,
        email,
        password,
      });

    assert(res.statusCode === 200);
    assert(res.body.code === 'SUCCESS');
    assert(res.body.msg === '注册成功');
  });

  it('should POST /sign/signUp 注册用户检查是否存在', async () => {
    app.mockCsrf();
    let res = await app.httpRequest()
      .post('/sign/signUp')
      .send({
        name,
        email: 'fjdkalj@jdkfa.com',
        password,
      });

    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '该用户已存在');

    res = await app.httpRequest()
      .post('/sign/signUp')
      .send({
        name: 'hfjdkafh',
        email,
        password,
      });

    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '该邮箱已被注册');
  });

  it('should POST /sign/signIn', async () => {
    app.mockCsrf();
    let res = await app.httpRequest()
      .post('/sign/signIn')
      .send({
        name,
        password: 'fjdasklfjakl',
      });

    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '账号或密码错误');

    res = await app.httpRequest()
      .post('/sign/signIn')
      .send({
        name: 'jifodlajsklgh',
        password,
      });

    assert(res.body.code === 'FAIL');
    assert(res.body.msg === '没有该用户');

    res = await app.httpRequest()
      .post('/sign/signIn')
      .send({
        name,
        password,
      });

    assert(res.body.code === 'SUCCESS');
    assert(res.body.msg === '登录成功');
  });

  it('should POST /sign/logout 注销账户', async () => {
    await app.httpRequest()
      .post('/sign/logout');
  });

  after(() => {
    const ctx = app.mockContext();

    ctx.service.user.deleteUserByNameAndPassword(name, password);
  });
});
