import { Document, LeanDocument, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string;
  state: boolean;
  google: boolean;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, "name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_FREE",
    emun: ["USER_FREE", "USER_PREMIUM"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, password, google, state, role, ...user } =
    this.toObject() as Partial<LeanDocument<IUser & Document>>;
  user.id = _id;
  return user;
};
export default model<IUser>("User", UserSchema);
