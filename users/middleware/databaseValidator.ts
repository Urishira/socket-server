import Users from "../../models/Users";
import Role from "../../role/model/Role";

export const roleValidator = async (role: string) => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`role ${role} is not registered in DB`);
};

export const emailValidator = async (email: string) => {
  const emailAlreadyExist = await Users.findOne({ email });
  if (emailAlreadyExist) throw new Error(`email ${email} already exists`);
};

export const idValidator = async (id: string) => {
  const isId = await Users.findOne({ _id: id });
  console.log(isId);
  if (!isId) throw new Error(`user by ${id} not exists`);
};
