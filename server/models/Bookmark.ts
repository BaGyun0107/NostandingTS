import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Shop, ShopId } from './Shop';
import type { User, UserId } from './User';

export interface BookmarkAttributes {
  id: number;
  user_id: number;
  shop_id: number;
  is_marked?: number;
}

export type BookmarkPk = "id";
export type BookmarkId = Bookmark[BookmarkPk];
export type BookmarkOptionalAttributes = "id" | "is_marked";
export type BookmarkCreationAttributes = Optional<BookmarkAttributes, BookmarkOptionalAttributes>;

export class Bookmark extends Model<BookmarkAttributes, BookmarkCreationAttributes> implements BookmarkAttributes {
  id!: number;
  user_id!: number;
  shop_id!: number;
  is_marked?: number;

  // Bookmark belongsTo Shop via shop_id
  shop!: Shop;
  getShop!: Sequelize.BelongsToGetAssociationMixin<Shop>;
  setShop!: Sequelize.BelongsToSetAssociationMixin<Shop, ShopId>;
  createShop!: Sequelize.BelongsToCreateAssociationMixin<Shop>;
  // Bookmark belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Bookmark {
    return Bookmark.init({
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
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Shop',
        key: 'id'
      }
    },
    is_marked: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Bookmark',
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
        name: "fk_Bookmark_Shop1_idx",
        using: "BTREE",
        fields: [
          { name: "shop_id" },
        ]
      },
      {
        name: "fk_Bookmark_User1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
