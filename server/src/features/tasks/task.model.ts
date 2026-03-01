import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

/* Task interface */
export interface ITask
  extends Document {

  title: string;

  completed: boolean;

  project:
    mongoose.Types.ObjectId;

}

/* Schema */
const taskSchema =
  new Schema<ITask>(
    {
      title: {
        type: String,
        required: true,
      },

      completed: {
        type: Boolean,
        default: false,
      },

      project: {
        type:
          Schema.Types.ObjectId,

        ref: "Project",

        required: true,
      },

    },
    {
      timestamps: true,
    }
  );

/* Model */
const Task: Model<ITask> =
  mongoose.model<ITask>(
    "Task",
    taskSchema
  );

export default Task;