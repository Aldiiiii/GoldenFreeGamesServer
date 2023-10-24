'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      GamesId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnai: {
        type: Sequelize.STRING
      },
      short_description: {
        type: Sequelize.STRING
      },
      game_url: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      developer: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      freetogame_profile_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Collections');
  }
};