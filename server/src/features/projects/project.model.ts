import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

/* Project interface */
export interface IProject
  extends Document {

  name: string;

  user:
    mongoose.Types.ObjectId;

}

/* Schema */
const projectSchema =
  new Schema<IProject>(
    {
      name: {
        type: String,
        required: true,
      },

      user: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

    },
    {
      timestamps: true,
    }
  );

/* Model */
const Project: Model<IProject> =
  mongoose.model<IProject>(
    "Project",
    projectSchema
  );

export default Project;