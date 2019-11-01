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
    password: STRING,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  }, {
    timestamps: true,
  });

  return User;
};
