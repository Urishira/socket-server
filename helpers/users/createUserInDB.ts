import Users from "../../models/Users";
import bcrypt from "bcrypt";

export const createUserInDB = async ({ ...userData }) => {
  const { email, password } = userData;

  const isUser = await Users.findOne({ email });
  if (!isUser) {
    const createUser = new Users({ ...userData });
    const salt = bcrypt.genSaltSync();
    createUser.password = bcrypt.hashSync(password, salt);
    const user = await createUser.save();
    return user;
  }
};
