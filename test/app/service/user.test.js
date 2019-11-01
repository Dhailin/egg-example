'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
  const name = 'name_service_user_test';
  const password = '123456';
  const email = `${name}@test.com`;

  before(async function() {
    const ctx = app.mockContext();


    const result = await ctx.service.user.createUser({
      name,
      email,
      password,
    });

    assert(result.name === name);
  });

  // 模糊搜索
  it('method getUsersByName should be ok', async function() {
    const ctx = app.mockContext();

    let users = await ctx.service.user.getUsersByName('');
    assert(users.length === 0);

    users = await ctx.service.user.getUsersByName('name');
    assert(users.length >= 1);

    const user = users[users.length - 1];
    assert(user.name === name);
  });

  // 按照用户名查找
  it('method getUserByCompleteName should be ok', async function() {
    const ctx = app.mockContext();

    let user = await ctx.service.user.getUserByCompleteName('');
    assert(user === null);

    user = await ctx.service.user.getUserByCompleteName(name);
    assert(user.name === name);

  });

  // 按照邮箱查找
  it('method getUserByEmail should be ok', async function() {
    const ctx = app.mockContext();

    let user = await ctx.service.user.getUserByEmail('');
    assert(user === null);

    user = await ctx.service.user.getUserByEmail(email);
    assert(user.name === name);

  });

  it('method deleteUserByNameAndPassword should be ok', async function() {
    const ctx = app.mockContext();

    await ctx.service.user.deleteUserByNameAndPassword(name, password);

    const user = await ctx.service.user.getUserByCompleteName('');
    assert(user === null);
  });
})
;
