'use strict';
/**
 * @param {Egg.Application} app Application
 */
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    email: STRING,
    passport: STRING,
    createdAt: { type: DATE },
    updatedAt: { type: DATE },
  }, {
    timestamps: true,
  });

  return User;
};
