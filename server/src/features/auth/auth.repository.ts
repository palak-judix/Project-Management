import User, {
  IUser,
} from "../user/user.model";

export const findUserByEmailRepo =
  async (
    email: string
  ): Promise<IUser | null> => {

    return await User.findOne({
      email,
    });

};

export const createUserRepo =
  async (
    name: string,
    email: string,
    password: string
  ): Promise<IUser> => {

    return await User.create({
      name,
      email,
      password,
    });

};