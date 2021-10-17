import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

type Data = {
  name: string;
};

export function googleAuthenticate() {
  const oauth2CLient = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

  oauth2CLient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const drive = google.drive({ version: "v3", auth: oauth2CLient });

  return drive;
}

const drive = googleAuthenticate();

export type Drive = typeof drive;

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const infor = {
    CLIENT_ID:
      "706791207242-4rmreh52976hcvsp65b8snp9fpd9lttf.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REFRESH_TOKEN:
      "1//0419m6uU7naPMCgYIARAAGAQSNwF-L9Irte8f8bajUisg4YaSI4zAlKy9-xqhrTMgXO_xGW6VoAyGwYKf2g973TWprMzEe8sqems",
  };

  const oauth2CLient = new google.auth.OAuth2(
    infor.CLIENT_ID,
    infor.CLIENT_SECRET
  );

  oauth2CLient.setCredentials({ refresh_token: infor.REFRESH_TOKEN });

  const drive = google.drive({ version: "v3", auth: oauth2CLient });

  const filePath = "/Users/doannhatanh/code/captcha/client/1.png";

  const respone = await drive.files.create({
    requestBody: {
      name: "1.png",
      parents: ["1jz0ekih5mEAQN0TwmiUzlZqoOyvms09z"],
    },
    media: {
      mimeType: "image/png",
      body: fs.createReadStream(filePath),
    },
    fields: "id",
  });

  console.log(respone.data);
  return res.status(200).json({ name: "" });
};
