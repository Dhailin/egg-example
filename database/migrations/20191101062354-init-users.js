'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { STRING, INTEGER, DATE } = Sequelize;

    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      email: STRING,
      password: STRING,
      createdAt: { type: DATE, field: 'created_at' },
      updatedAt: { type: DATE, field: 'updated_at' },
    }, {
      timestamps: true,
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('users');
  },
};
