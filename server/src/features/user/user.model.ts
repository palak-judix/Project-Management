import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

/* User interface */
export interface IUser
  extends Document {

  name: string;

  email: string;

  password: string;

}

/* Schema */
const userSchema =
  new Schema<IUser>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

    },
    {
      timestamps: true,
    }
  );

/* Model */
const User: Model<IUser> =
  mongoose.model<IUser>(
    "User",
    userSchema
  );

export default User;