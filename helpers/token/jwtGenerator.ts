import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const keyJWT: any = process.env.SECRETPRIVATEKEY;

export const jwtGenerator = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      keyJWT,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(`error with token ${err}`);
        }
        resolve(token);
      }
    );
  });
};
