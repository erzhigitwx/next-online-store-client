import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"
import loginReducer from "./login";
import user from "./User";
import order from "./order";

const rootReducer = combineReducers({
    authorization: authReducer,
    login: loginReducer,
    user: user,
    order: order
})

export const store = configureStore({
    reducer: rootReducer,
});