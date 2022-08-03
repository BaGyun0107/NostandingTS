import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage"; //로컬스토리지 사용
import storage from "redux-persist/lib/storage/session"; //세션스토리지 사용

const alarmState = createSlice({
  name: "alarm",
  initialState: [],
  reducers: {
    getAlarm: (state, action) => {
      return action.payload;
    },
  },
});

const checkLoginHold = createSlice({
  name: "holdLogin",
  initialState: false,
  reducers: {
    clickCheckBox: (state) => {
      return (state = !state);
    },
  },
});

const loginInfo = createSlice({
  name: "userInfo",
  initialState: { userInfo: {} },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUserInfo: (state) => {
      state.userInfo = {};
    },
  },
});

const loginState = createSlice({
  name: "userLogin",
  initialState: { userLoginState: false },
  reducers: {
    getUserLogin: (state) => {
      state.userLoginState = true;
    },
    getUserLogout: (state) => {
      state.userLoginState = false;
    },
  },
});

const shopSearch = createSlice({
  name: "searchInfo",
  initialState: { shopSearchInfo: "" },
  reducers: {
    getShopSearch: (state, action) => {
      state.shopSearchInfo = action.payload;
    },
  },
});

const persistConfig = {
  key: "root", // reducer 객체가 어디서 부터 저장될 것인지 설정하는 key, root부터 시작한다고 지정해준다.
  storage, // 어느 storage를 사용할 것인지 설정해준다. 위에서 import해온 local, session storage 중 선택하여 설정했다.
  whitelist: ["loginInfo", "loginState", "checkLoginHold"]
};

const rootReducer = combineReducers({
  loginInfo: loginInfo.reducer,
  loginState: loginState.reducer,
  shopSearch: shopSearch.reducer,
  checkLoginHold: checkLoginHold.reducer,
  alarmState: alarmState.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const { getUserLogout, getUserLogin } = loginState.actions;
export const { getShopSearch } = shopSearch.actions;
export const { getUserInfo, deleteUserInfo } = loginInfo.actions;
export const { clickCheckBox } = checkLoginHold.actions;
export const { isRead, getAlarm } = alarmState.actions;
