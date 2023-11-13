"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "order_number",
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
      basketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "basket_id",
        references: {
          model: "baskets",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      status: {
        type: Sequelize.ENUM("pending", "paid", "cancelled", "fulfilled"),
        allowNull: false,
        defaultValue: "pending",
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: "total_amount",
      },
      expectedDeliveryTime: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "expected_delivery_time",
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
    return await queryInterface.dropTable("orders");
  },
};
