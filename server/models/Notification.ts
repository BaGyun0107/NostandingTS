import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ReReview, ReReviewId } from './ReReview';
import type { Reservation, ReservationId } from './Reservation';
import type { Review, ReviewId } from './Review';
import type { User, UserId } from './User';

export interface NotificationAttributes {
  id: number;
  user_id: number;
  reservation_id?: number;
  review_id?: number;
  rereview_id?: number;
  contents?: string;
  read?: number;
  created_date?: Date;
  updated_date?: Date;
  review?: number;
}

export type NotificationPk = "id";
export type NotificationId = Notification[NotificationPk];
export type NotificationOptionalAttributes = "id" | "reservation_id" | "review_id" | "rereview_id" | "contents" | "read" | "created_date" | "updated_date" | "review";
export type NotificationCreationAttributes = Optional<NotificationAttributes, NotificationOptionalAttributes>;

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  id!: number;
  user_id!: number;
  reservation_id?: number;
  review_id?: number;
  rereview_id?: number;
  contents?: string;
  read?: number;
  created_date?: Date;
  updated_date?: Date;
  review?: number;

  // Notification belongsTo ReReview via rereview_id
  rereview!: ReReview;
  getRereview!: Sequelize.BelongsToGetAssociationMixin<ReReview>;
  setRereview!: Sequelize.BelongsToSetAssociationMixin<ReReview, ReReviewId>;
  createRereview!: Sequelize.BelongsToCreateAssociationMixin<ReReview>;
  // Notification belongsTo Reservation via reservation_id
  reservation!: Reservation;
  getReservation!: Sequelize.BelongsToGetAssociationMixin<Reservation>;
  setReservation!: Sequelize.BelongsToSetAssociationMixin<Reservation, ReservationId>;
  createReservation!: Sequelize.BelongsToCreateAssociationMixin<Reservation>;
  // Notification belongsTo Review via review_id
  review!: Review;
  getReview!: Sequelize.BelongsToGetAssociationMixin<Review>;
  setReview!: Sequelize.BelongsToSetAssociationMixin<Review, ReviewId>;
  createReview!: Sequelize.BelongsToCreateAssociationMixin<Review>;
  // Notification belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Notification {
    return Notification.init({
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
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Reservation',
        key: 'id'
      }
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Review',
        key: 'id'
      }
    },
    rereview_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ReReview',
        key: 'id'
      }
    },
    contents: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    read: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    review: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Notification',
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
        name: "fk_Notification_Reservation1_idx",
        using: "BTREE",
        fields: [
          { name: "reservation_id" },
        ]
      },
      {
        name: "fk_Notification_User1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_Notification_Review1_idx",
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "fk_Notification_ReReview1_idx",
        using: "BTREE",
        fields: [
          { name: "rereview_id" },
        ]
      },
    ]
  });
  }
}
