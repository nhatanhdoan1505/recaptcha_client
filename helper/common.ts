import axios from "axios";
import fs from "fs";
import path from "path";

export const downloadImage = (url: string) => {
  axios({ url, responseType: "stream" }).then(
    (response: any) =>
      new Promise((resolve, reject) => {
        console.log(__dirname);
        response.data
          .pipe(fs.createWriteStream(__dirname + "../public"))
          .on("finish", () => resolve("OK"))
          .on("error", (e: any) => reject(e));
      })
  );
};
