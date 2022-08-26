'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: { name: 'order_id', allowNull: false },
        as: 'order',
      });
    }
  }
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    item_id: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};