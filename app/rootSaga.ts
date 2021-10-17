import { all } from "redux-saga/effects";
import recaptchaSaga from "../features/recaptcha/recaptchaSaga";

export default function* rootSaga() {
  yield all([recaptchaSaga()]);
}
