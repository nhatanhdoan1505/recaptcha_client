import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: {
  loading: boolean;
  _id: string;
  answer: string[];
  isSuccess: boolean;
} = {
  loading: false,
  _id: "",
  answer: [],
  isSuccess: false,
};

const recaptchaSlice = createSlice({
  name: "recaptcha",
  initialState,
  reducers: {
    uploadRecaptcha(
      state,
      action: PayloadAction<{ file: any; question: string }>
    ) {
      state.loading = true;
      state.isSuccess = false;
    },
    uploadRecaptchaSuccessfully(state, action: PayloadAction<string>) {
      state.loading = false;
      state._id = action.payload;
      state.isSuccess = true;
    },
    uploadRecaptchaFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isSuccess = false;
    },
    setRecaptchaId(state, action: PayloadAction<string>) {
      state._id = action.payload;
    },
    submitAwnser(
      state,
      action: PayloadAction<{ answer: string[]; _id: string }>
    ) {
      state.loading = true;
      state.isSuccess = false;
    },
    submitAwnserSuccessfully(state) {
      state.loading = false;
      state.isSuccess = true;
    },
    submitAwnserFail(state) {
      state.loading = false;
      state.isSuccess = false;
    },
    choosePicture(state, action: PayloadAction<string>) {
      state.answer = !state.answer.includes(action.payload)
        ? [...state.answer, action.payload]
        : state.answer.filter((a) => a !== action.payload);
    },
  },
});

export const recaptchaAction = recaptchaSlice.actions;

export const selectAnswer = (rootState: RootState) =>
  rootState.recaptcha.answer;
export const selectLoading = (rootState: RootState) =>
  rootState.recaptcha.loading;
export const selectId = (rootState: RootState) => rootState.recaptcha._id;
export const selectIsSuccess = (rootState: RootState) =>
  rootState.recaptcha.isSuccess;

const recaptchaReducer = recaptchaSlice.reducer;
export default recaptchaReducer;
