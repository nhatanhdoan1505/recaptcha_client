import { combineReducers } from "@reduxjs/toolkit";
import recaptchaReducer from "../features/recaptcha/recaptchaSlice";

const rootReducer = combineReducers({ recaptcha: recaptchaReducer });

export type typeRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
