import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification, NotificationId } from './Notification';
import type { Review, ReviewId } from './Review';
import type { Shop, ShopId } from './Shop';

export interface ReReviewAttributes {
  id: number;
  review_id: number;
  shop_id: number;
  contents?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReReviewPk = "id";
export type ReReviewId = ReReview[ReReviewPk];
export type ReReviewOptionalAttributes = "id" | "contents" | "createdAt" | "updatedAt";
export type ReReviewCreationAttributes = Optional<ReReviewAttributes, ReReviewOptionalAttributes>;

export class ReReview extends Model<ReReviewAttributes, ReReviewCreationAttributes> implements ReReviewAttributes {
  id!: number;
  review_id!: number;
  shop_id!: number;
  contents?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // ReReview hasMany Notification via rereview_id
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
  // ReReview belongsTo Review via review_id
  review!: Review;
  getReview!: Sequelize.BelongsToGetAssociationMixin<Review>;
  setReview!: Sequelize.BelongsToSetAssociationMixin<Review, ReviewId>;
  createReview!: Sequelize.BelongsToCreateAssociationMixin<Review>;
  // ReReview belongsTo Shop via shop_id
  shop!: Shop;
  getShop!: Sequelize.BelongsToGetAssociationMixin<Shop>;
  setShop!: Sequelize.BelongsToSetAssociationMixin<Shop, ShopId>;
  createShop!: Sequelize.BelongsToCreateAssociationMixin<Shop>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ReReview {
    return ReReview.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Review',
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
    contents: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ReReview',
    timestamps: true,
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
        name: "fk_ReReview_Review1_idx",
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "fk_ReReview_Shop1_idx",
        using: "BTREE",
        fields: [
          { name: "shop_id" },
        ]
      },
    ]
  });
  }
}
