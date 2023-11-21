import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const rootReducer = combineReducers({
  login: LoginReducer,
});

export default persistReducer(persistConfig, rootReducer);
