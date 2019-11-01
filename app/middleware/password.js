'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const url = ctx.url;

    if (url === '/') {
      return await next();
    }

    if (url.indexOf('/sign') !== -1) {
      return await next();
    }

    const session = ctx.session;

    if (!session.user) {
      ctx.body = {
        code: 'FAIL',
        msg: '没有登录',
      };
      return;
    }

    const user = await ctx.service.user.getUserById(session.user.id);

    if (!user) {
      ctx.body = {
        code: 'FAIL',
        msg: '没有登录',
      };
      return;
    }

    await next();

  };
};

