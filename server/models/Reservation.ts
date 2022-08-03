import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Menu, MenuId } from './Menu';
import type { Notification, NotificationId } from './Notification';
import type { User, UserId } from './User';

export interface ReservationAttributes {
  id: number;
  user_id: number;
  menu_id: number;
  date?: Date;
}

export type ReservationPk = "id";
export type ReservationId = Reservation[ReservationPk];
export type ReservationOptionalAttributes = "id" | "date";
export type ReservationCreationAttributes = Optional<ReservationAttributes, ReservationOptionalAttributes>;

export class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> implements ReservationAttributes {
  id!: number;
  user_id!: number;
  menu_id!: number;
  date?: Date;

  // Reservation belongsTo Menu via menu_id
  menu!: Menu;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<Menu>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<Menu, MenuId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<Menu>;
  // Reservation hasMany Notification via reservation_id
  Notifications!: Notification[];
  getNotifications!: Sequelize.HasManyGetAssociationsMixin<Notification>;
  setNotifications!: Sequelize.HasManySetAssociationsMixin<Notification, NotificationId>;
  addNotification!: Sequelize.HasManyAddAssociationMixin<Notification, NotificationId>;
  addNotifications!: Sequelize.HasManyAddAssociationsMixin<Notification, NotificationId>;
  createNotification!: Sequelize.HasManyCreateAssociationMixin<Notification>;
  removeNotification!: Sequelize.HasManyRemoveAssociationMixin<Notification, NotificationId>;
  removeNotifications!: Sequelize.HasManyRemoveAssociationsMixin<Notification, NotificationId>;
  hasNotification!: Sequelize.HasManyHasAssociationMixin<Notification, NotificationId>;
  hasNotifications!: Sequelize.HasManyHasAssociationsMixin<Notification, NotificationId>;
  countNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // Reservation belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Reservation {
    return Reservation.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menu',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Reservation',
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
        name: "fk_Reservation_Menu1_idx",
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
      {
        name: "fk_Reservation_User1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
