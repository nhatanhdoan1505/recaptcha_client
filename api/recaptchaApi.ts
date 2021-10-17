import axiosClient from "./axiosClient";
import { IRespone } from "../model/common";
import { IRecaptcha } from "../model/recaptcha";

const recaptchaApi = {
  async uploadRecaptcha({ file, question }: { file: any; question: string }) {
    let fd = new FormData();
    fd.append("file", file, file.name);
    fd.append("question", question);

    const res = await axiosClient.post<IRespone<IRecaptcha>>(
      "/recaptcha/upload",
      fd,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  },

  async getRecaptcha(_id: string) {
    const res = await axiosClient.get<IRespone<IRecaptcha>>(
      `/recaptcha/${_id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data;
  },

  async submitAwnser({ answer, _id }: { answer: string[]; _id: string }) {
    const res = await axiosClient.put<IRespone<string>>(
      `/recaptcha/awnser/${_id}`,
      { answer },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data;
  },
};

export default recaptchaApi;
