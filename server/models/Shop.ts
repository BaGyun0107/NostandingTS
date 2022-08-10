import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Bookmark, BookmarkId } from './Bookmark';
import type { Menu, MenuId } from './Menu';
import type { ReReview, ReReviewId } from './ReReview';
import type { Review, ReviewId } from './Review';
import type { User, UserId } from './User';

export interface ShopAttributes {
  id: number;
  user_id: number;
  business_hour?: string;
  image_src?: string;
  phone_number?: string;
  holiday?: string;
  contents?: string;
  x?: string;
  y?: string;
  place_url?: string;
  total_views?: number;
  score_average?: number;
}

export type ShopPk = 'id';
export type ShopId = Shop[ShopPk];
export type ShopOptionalAttributes =
  | 'id'
  | 'business_hour'
  | 'image_src'
  | 'phone_number'
  | 'holiday'
  | 'contents'
  | 'x'
  | 'y'
  | 'place_url'
  | 'total_views'
  | 'score_average';
export type ShopCreationAttributes = Optional<
  ShopAttributes,
  ShopOptionalAttributes
>;

export class Shop
  extends Model<ShopAttributes, ShopCreationAttributes>
  implements ShopAttributes
{
  id!: number;
  user_id!: number;
  business_hour?: string;
  image_src?: string;
  phone_number?: string;
  holiday?: string;
  contents?: string;
  x?: string;
  y?: string;
  place_url?: string;
  total_views?: number;
  score_average?: number;

  // Shop hasMany Bookmark via shop_id
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
  // Shop hasMany Menu via shop_id
  Menus!: Menu[];
  getMenus!: Sequelize.HasManyGetAssociationsMixin<Menu>;
  setMenus!: Sequelize.HasManySetAssociationsMixin<Menu, MenuId>;
  addMenu!: Sequelize.HasManyAddAssociationMixin<Menu, MenuId>;
  addMenus!: Sequelize.HasManyAddAssociationsMixin<Menu, MenuId>;
  createMenu!: Sequelize.HasManyCreateAssociationMixin<Menu>;
  removeMenu!: Sequelize.HasManyRemoveAssociationMixin<Menu, MenuId>;
  removeMenus!: Sequelize.HasManyRemoveAssociationsMixin<Menu, MenuId>;
  hasMenu!: Sequelize.HasManyHasAssociationMixin<Menu, MenuId>;
  hasMenus!: Sequelize.HasManyHasAssociationsMixin<Menu, MenuId>;
  countMenus!: Sequelize.HasManyCountAssociationsMixin;
  // Shop hasMany ReReview via shop_id
  ReReviews!: ReReview[];
  getReReviews!: Sequelize.HasManyGetAssociationsMixin<ReReview>;
  setReReviews!: Sequelize.HasManySetAssociationsMixin<ReReview, ReReviewId>;
  addReReview!: Sequelize.HasManyAddAssociationMixin<ReReview, ReReviewId>;
  addReReviews!: Sequelize.HasManyAddAssociationsMixin<ReReview, ReReviewId>;
  createReReview!: Sequelize.HasManyCreateAssociationMixin<ReReview>;
  removeReReview!: Sequelize.HasManyRemoveAssociationMixin<
    ReReview,
    ReReviewId
  >;
  removeReReviews!: Sequelize.HasManyRemoveAssociationsMixin<
    ReReview,
    ReReviewId
  >;
  hasReReview!: Sequelize.HasManyHasAssociationMixin<ReReview, ReReviewId>;
  hasReReviews!: Sequelize.HasManyHasAssociationsMixin<ReReview, ReReviewId>;
  countReReviews!: Sequelize.HasManyCountAssociationsMixin;
  // Shop hasMany Review via shop_id
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
  // Shop belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Shop {
    return Shop.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        business_hour: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        image_src: {
          type: DataTypes.STRING(10000),
          allowNull: true,
        },
        phone_number: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        holiday: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        contents: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        x: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        y: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        place_url: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        total_views: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        score_average: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Shop',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'fk_Shop_User1_idx',
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
        ],
      },
    );
  }
}
