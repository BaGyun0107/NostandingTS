import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Bookmark, BookmarkId } from './Bookmark';
import type { Notification, NotificationId } from './Notification';
import type { Reservation, ReservationId } from './Reservation';
import type { Review, ReviewId } from './Review';
import type { Shop, ShopId } from './Shop';

export interface UserAttributes {
  id: number;
  user_salt?: string;
  user_name?: string;
  password?: string;
  nickname?: string;
  phone_number?: string;
  shop_name?: string;
  shop_category?: string;
  shop_category_city?: string;
  address_line1?: string;
  address_line2?: string;
  postal_code?: string;
  email?: string;
  is_master?: number;
  email_key?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserOptionalAttributes =
  | 'id'
  | 'user_salt'
  | 'user_name'
  | 'password'
  | 'nickname'
  | 'phone_number'
  | 'shop_name'
  | 'shop_category'
  | 'shop_category_city'
  | 'address_line1'
  | 'address_line2'
  | 'postal_code'
  | 'email'
  | 'is_master'
  | 'email_key'
  | 'createdAt'
  | 'updatedAt';
export type UserCreationAttributes = Optional<
  UserAttributes,
  UserOptionalAttributes
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  user_salt?: string;
  user_name?: string;
  password?: string;
  nickname?: string;
  phone_number?: string;
  shop_name?: string;
  shop_category?: string;
  shop_category_city?: string;
  address_line1?: string;
  address_line2?: string;
  postal_code?: string;
  email?: string;
  is_master?: number;
  email_key?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // User hasMany Bookmark via user_id
  Bookmarks!: Bookmark[];
  getBookmarks!: Sequelize.HasManyGetAssociationsMixin<Bookmark>;
  setBookmarks!: Sequelize.HasManySetAssociationsMixin<Bookmark, BookmarkId>;
  addBookmark!: Sequelize.HasManyAddAssociationMixin<Bookmark, BookmarkId>;
  addBookmarks!: Sequelize.HasManyAddAssociationsMixin<Bookmark, BookmarkId>;
  createBookmark!: Sequelize.HasManyCreateAssociationMixin<Bookmark>;
  removeBookmark!: Sequelize.HasManyRemoveAssociationMixin<
    Bookmark,
    BookmarkId
  >;
  removeBookmarks!: Sequelize.HasManyRemoveAssociationsMixin<
    Bookmark,
    BookmarkId
  >;
  hasBookmark!: Sequelize.HasManyHasAssociationMixin<Bookmark, BookmarkId>;
  hasBookmarks!: Sequelize.HasManyHasAssociationsMixin<Bookmark, BookmarkId>;
  countBookmarks!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Notification via user_id
  Notifications!: Notification[];
  getNotifications!: Sequelize.HasManyGetAssociationsMixin<Notification>;
  setNotifications!: Sequelize.HasManySetAssociationsMixin<
    Notification,
    NotificationId
  >;
  addNotification!: Sequelize.HasManyAddAssociationMixin<
    Notification,
    NotificationId
  >;
  addNotifications!: Sequelize.HasManyAddAssociationsMixin<
    Notification,
    NotificationId
  >;
  createNotification!: Sequelize.HasManyCreateAssociationMixin<Notification>;
  removeNotification!: Sequelize.HasManyRemoveAssociationMixin<
    Notification,
    NotificationId
  >;
  removeNotifications!: Sequelize.HasManyRemoveAssociationsMixin<
    Notification,
    NotificationId
  >;
  hasNotification!: Sequelize.HasManyHasAssociationMixin<
    Notification,
    NotificationId
  >;
  hasNotifications!: Sequelize.HasManyHasAssociationsMixin<
    Notification,
    NotificationId
  >;
  countNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Reservation via user_id
  Reservations!: Reservation[];
  getReservations!: Sequelize.HasManyGetAssociationsMixin<Reservation>;
  setReservations!: Sequelize.HasManySetAssociationsMixin<
    Reservation,
    ReservationId
  >;
  addReservation!: Sequelize.HasManyAddAssociationMixin<
    Reservation,
    ReservationId
  >;
  addReservations!: Sequelize.HasManyAddAssociationsMixin<
    Reservation,
    ReservationId
  >;
  createReservation!: Sequelize.HasManyCreateAssociationMixin<Reservation>;
  removeReservation!: Sequelize.HasManyRemoveAssociationMixin<
    Reservation,
    ReservationId
  >;
  removeReservations!: Sequelize.HasManyRemoveAssociationsMixin<
    Reservation,
    ReservationId
  >;
  hasReservation!: Sequelize.HasManyHasAssociationMixin<
    Reservation,
    ReservationId
  >;
  hasReservations!: Sequelize.HasManyHasAssociationsMixin<
    Reservation,
    ReservationId
  >;
  countReservations!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Review via user_id
  Reviews!: Review[];
  getReviews!: Sequelize.HasManyGetAssociationsMixin<Review>;
  setReviews!: Sequelize.HasManySetAssociationsMixin<Review, ReviewId>;
  addReview!: Sequelize.HasManyAddAssociationMixin<Review, ReviewId>;
  addReviews!: Sequelize.HasManyAddAssociationsMixin<Review, ReviewId>;
  createReview!: Sequelize.HasManyCreateAssociationMixin<Review>;
  removeReview!: Sequelize.HasManyRemoveAssociationMixin<Review, ReviewId>;
  removeReviews!: Sequelize.HasManyRemoveAssociationsMixin<Review, ReviewId>;
  hasReview!: Sequelize.HasManyHasAssociationMixin<Review, ReviewId>;
  hasReviews!: Sequelize.HasManyHasAssociationsMixin<Review, ReviewId>;
  countReviews!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Shop via user_id
  Shops!: Shop[];
  getShops!: Sequelize.HasManyGetAssociationsMixin<Shop>;
  setShops!: Sequelize.HasManySetAssociationsMixin<Shop, ShopId>;
  addShop!: Sequelize.HasManyAddAssociationMixin<Shop, ShopId>;
  addShops!: Sequelize.HasManyAddAssociationsMixin<Shop, ShopId>;
  createShop!: Sequelize.HasManyCreateAssociationMixin<Shop>;
  removeShop!: Sequelize.HasManyRemoveAssociationMixin<Shop, ShopId>;
  removeShops!: Sequelize.HasManyRemoveAssociationsMixin<Shop, ShopId>;
  hasShop!: Sequelize.HasManyHasAssociationMixin<Shop, ShopId>;
  hasShops!: Sequelize.HasManyHasAssociationsMixin<Shop, ShopId>;
  countShops!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_salt: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        user_name: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        nickname: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        phone_number: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        shop_name: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        shop_category: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        shop_category_city: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        address_line1: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        address_line2: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        postal_code: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        is_master: {
          type: DataTypes.TINYINT,
          allowNull: true,
        },
        email_key: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'User',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
