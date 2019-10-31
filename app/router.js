'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/users/createUser', controller.user.createUser);
  router.post('/users/getUsers', controller.user.getUsers);

  // 注册
  router.post('/sign/signUp', controller.sign.signup);
  router.post('/sign/signIn', controller.sign.signin);
  router.get('/sign/logout', controller.sign.logout);
  router.post('/sign/logout', controller.sign.logout);
};
