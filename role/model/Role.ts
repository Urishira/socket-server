import { Document, model, Schema } from "mongoose";

export interface InterfaceRole extends Document {
  role: string;
}

const RoleSchema: Schema = new Schema({
  role: {
    type: String,
    require: [true, "Role is required"],
  },
});

export default model<InterfaceRole>("Role", RoleSchema);
