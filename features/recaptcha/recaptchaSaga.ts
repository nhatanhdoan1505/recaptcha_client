import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { recaptchaAction } from "./recaptchaSlice";
import recaptchaApi from "../../api/recaptchaApi";
import { IRespone } from "../../model/common";
import { IRecaptcha } from "../../model/recaptcha";

function* uploadRecaptcha(
  action: PayloadAction<{ file: any; question: string }>
) {
  try {
    const respone: IRespone<IRecaptcha> = yield call(
      recaptchaApi.uploadRecaptcha,
      action.payload
    );
    if (respone.status === "FAIL") {
      yield
    } else {
      yield put(recaptchaAction.uploadRecaptchaSuccessfully(respone.data._id));
    }
  } catch (error) {
    console.error(error);
  }
}

function* submitAnswer(
  action: PayloadAction<{ answer: string[]; _id: string }>
) {
  try {
    const respone: IRespone<string> = yield call(
      recaptchaApi.submitAwnser,
      action.payload
    );
    if (respone.status === "FAIL") {
      yield put(recaptchaAction.submitAwnserSuccessfully());
    } else yield put(recaptchaAction.submitAwnserSuccessfully());
  } catch (error) {
    console.error(error);
  }
}

export default function* auth() {
  yield takeLatest(recaptchaAction.uploadRecaptcha, uploadRecaptcha);
  yield takeLatest(recaptchaAction.submitAwnser, submitAnswer);
}
