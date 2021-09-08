import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongonAtlas: any = process.env.MONGODB_ATLAS;
export const connectDataBase = async () => {
  try {
    await mongoose.connect(mongonAtlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
    throw new Error("error in database");
  }
};
