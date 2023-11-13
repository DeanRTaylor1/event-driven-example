"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("order_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
        field: "order_id",
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        field: "product_id",
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
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

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable("order-details");
  },
};
