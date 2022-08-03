import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Reservation, ReservationId } from './Reservation';
import type { Shop, ShopId } from './Shop';

export interface MenuAttributes {
  id: number;
  shop_id: number;
  image_src?: string;
  name?: string;
  price?: string;
}

export type MenuPk = "id";
export type MenuId = Menu[MenuPk];
export type MenuOptionalAttributes = "id" | "image_src" | "name" | "price";
export type MenuCreationAttributes = Optional<MenuAttributes, MenuOptionalAttributes>;

export class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  id!: number;
  shop_id!: number;
  image_src?: string;
  name?: string;
  price?: string;

  // Menu hasMany Reservation via menu_id
  Reservations!: Reservation[];
  getReservations!: Sequelize.HasManyGetAssociationsMixin<Reservation>;
  setReservations!: Sequelize.HasManySetAssociationsMixin<Reservation, ReservationId>;
  addReservation!: Sequelize.HasManyAddAssociationMixin<Reservation, ReservationId>;
  addReservations!: Sequelize.HasManyAddAssociationsMixin<Reservation, ReservationId>;
  createReservation!: Sequelize.HasManyCreateAssociationMixin<Reservation>;
  removeReservation!: Sequelize.HasManyRemoveAssociationMixin<Reservation, ReservationId>;
  removeReservations!: Sequelize.HasManyRemoveAssociationsMixin<Reservation, ReservationId>;
  hasReservation!: Sequelize.HasManyHasAssociationMixin<Reservation, ReservationId>;
  hasReservations!: Sequelize.HasManyHasAssociationsMixin<Reservation, ReservationId>;
  countReservations!: Sequelize.HasManyCountAssociationsMixin;
  // Menu belongsTo Shop via shop_id
  shop!: Shop;
  getShop!: Sequelize.BelongsToGetAssociationMixin<Shop>;
  setShop!: Sequelize.BelongsToSetAssociationMixin<Shop, ShopId>;
  createShop!: Sequelize.BelongsToCreateAssociationMixin<Shop>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Menu {
    return Menu.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Shop',
        key: 'id'
      }
    },
    image_src: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_Menu_Shop1_idx",
        using: "BTREE",
        fields: [
          { name: "shop_id" },
        ]
      },
    ]
  });
  }
}
