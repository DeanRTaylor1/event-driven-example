"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("baskets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      status: {
        type: Sequelize.ENUM("active", "cleared", "checked-out"),
        allowNull: false,
        default: "active",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("baskets");
  },
};
