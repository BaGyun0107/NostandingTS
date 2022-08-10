import type { Sequelize } from 'sequelize';
import { Bookmark as _Bookmark } from './Bookmark';
import type {
  BookmarkAttributes,
  BookmarkCreationAttributes,
} from './Bookmark';
import { Menu as _Menu } from './Menu';
import type { MenuAttributes, MenuCreationAttributes } from './Menu';
import { Notification as _Notification } from './Notification';
import type {
  NotificationAttributes,
  NotificationCreationAttributes,
} from './Notification';
import { ReReview as _ReReview } from './ReReview';
import type {
  ReReviewAttributes,
  ReReviewCreationAttributes,
} from './ReReview';
import { Reservation as _Reservation } from './Reservation';
import type {
  ReservationAttributes,
  ReservationCreationAttributes,
} from './Reservation';
import { Review as _Review } from './Review';
import type { ReviewAttributes, ReviewCreationAttributes } from './Review';
import { Shop as _Shop } from './Shop';
import type { ShopAttributes, ShopCreationAttributes } from './Shop';
import { User as _User } from './User';
import type { UserAttributes, UserCreationAttributes } from './User';

export {
  _Bookmark as Bookmark,
  _Menu as Menu,
  _Notification as Notification,
  _ReReview as ReReview,
  _Reservation as Reservation,
  _Review as Review,
  _Shop as Shop,
  _User as User,
};

export type {
  BookmarkAttributes,
  BookmarkCreationAttributes,
  MenuAttributes,
  MenuCreationAttributes,
  NotificationAttributes,
  NotificationCreationAttributes,
  ReReviewAttributes,
  ReReviewCreationAttributes,
  ReservationAttributes,
  ReservationCreationAttributes,
  ReviewAttributes,
  ReviewCreationAttributes,
  ShopAttributes,
  ShopCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Bookmark = _Bookmark.initModel(sequelize);
  const Menu = _Menu.initModel(sequelize);
  const Notification = _Notification.initModel(sequelize);
  const ReReview = _ReReview.initModel(sequelize);
  const Reservation = _Reservation.initModel(sequelize);
  const Review = _Review.initModel(sequelize);
  const Shop = _Shop.initModel(sequelize);
  const User = _User.initModel(sequelize);

  Reservation.belongsTo(Menu, { as: 'menu', foreignKey: 'menu_id' });
  Menu.hasMany(Reservation, { as: 'Reservations', foreignKey: 'menu_id' });
  Notification.belongsTo(ReReview, {
    as: 'rereview',
    foreignKey: 'rereview_id',
  });
  ReReview.hasMany(Notification, {
    as: 'Notifications',
    foreignKey: 'rereview_id',
  });
  Notification.belongsTo(Reservation, {
    as: 'reservation',
    foreignKey: 'reservation_id',
  });
  Reservation.hasMany(Notification, {
    as: 'Notifications',
    foreignKey: 'reservation_id',
  });
  Notification.belongsTo(Review, { as: 'reviews', foreignKey: 'review_id' });
  Review.hasMany(Notification, {
    as: 'Notifications',
    foreignKey: 'review_id',
  });
  ReReview.belongsTo(Review, { as: 'review', foreignKey: 'review_id' });
  Review.hasMany(ReReview, { as: 'ReReviews', foreignKey: 'review_id' });
  Bookmark.belongsTo(Shop, { as: 'shop', foreignKey: 'shop_id' });
  Shop.hasMany(Bookmark, { as: 'Bookmarks', foreignKey: 'shop_id' });
  Menu.belongsTo(Shop, { as: 'shop', foreignKey: 'shop_id' });
  Shop.hasMany(Menu, { as: 'Menus', foreignKey: 'shop_id' });
  ReReview.belongsTo(Shop, { as: 'shop', foreignKey: 'shop_id' });
  Shop.hasMany(ReReview, { as: 'ReReviews', foreignKey: 'shop_id' });
  Review.belongsTo(Shop, { as: 'shop', foreignKey: 'shop_id' });
  Shop.hasMany(Review, { as: 'Reviews', foreignKey: 'shop_id' });
  Bookmark.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Bookmark, { as: 'Bookmarks', foreignKey: 'user_id' });
  Notification.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Notification, { as: 'Notifications', foreignKey: 'user_id' });
  Reservation.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Reservation, { as: 'Reservations', foreignKey: 'user_id' });
  Review.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Review, { as: 'Reviews', foreignKey: 'user_id' });
  Shop.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Shop, { as: 'Shops', foreignKey: 'user_id' });

  return {
    Bookmark: Bookmark,
    Menu: Menu,
    Notification: Notification,
    ReReview: ReReview,
    Reservation: Reservation,
    Review: Review,
    Shop: Shop,
    User: User,
  };
}
