import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification, NotificationId } from './Notification';
import type { ReReview, ReReviewId } from './ReReview';
import type { Shop, ShopId } from './Shop';
import type { User, UserId } from './User';

export interface ReviewAttributes {
  id: number;
  user_id: number;
  shop_id: number;
  image_src?: string;
  score?: number;
  contents?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReviewPk = "id";
export type ReviewId = Review[ReviewPk];
export type ReviewOptionalAttributes = "id" | "image_src" | "score" | "contents" | "createdAt" | "updatedAt";
export type ReviewCreationAttributes = Optional<ReviewAttributes, ReviewOptionalAttributes>;

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  id!: number;
  user_id!: number;
  shop_id!: number;
  image_src?: string;
  score?: number;
  contents?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Review hasMany Notification via review_id
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
  // Review hasMany ReReview via review_id
  ReReviews!: ReReview[];
  getReReviews!: Sequelize.HasManyGetAssociationsMixin<ReReview>;
  setReReviews!: Sequelize.HasManySetAssociationsMixin<ReReview, ReReviewId>;
  addReReview!: Sequelize.HasManyAddAssociationMixin<ReReview, ReReviewId>;
  addReReviews!: Sequelize.HasManyAddAssociationsMixin<ReReview, ReReviewId>;
  createReReview!: Sequelize.HasManyCreateAssociationMixin<ReReview>;
  removeReReview!: Sequelize.HasManyRemoveAssociationMixin<ReReview, ReReviewId>;
  removeReReviews!: Sequelize.HasManyRemoveAssociationsMixin<ReReview, ReReviewId>;
  hasReReview!: Sequelize.HasManyHasAssociationMixin<ReReview, ReReviewId>;
  hasReReviews!: Sequelize.HasManyHasAssociationsMixin<ReReview, ReReviewId>;
  countReReviews!: Sequelize.HasManyCountAssociationsMixin;
  // Review belongsTo Shop via shop_id
  shop!: Shop;
  getShop!: Sequelize.BelongsToGetAssociationMixin<Shop>;
  setShop!: Sequelize.BelongsToSetAssociationMixin<Shop, ShopId>;
  createShop!: Sequelize.BelongsToCreateAssociationMixin<Shop>;
  // Review belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Review {
    return Review.init({
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
    image_src: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contents: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Review',
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
        name: "fk_Review_Shop1_idx",
        using: "BTREE",
        fields: [
          { name: "shop_id" },
        ]
      },
      {
        name: "fk_Review_User1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
