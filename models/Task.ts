import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../dto';

const TaskSchema: Schema = new Schema({
    taskID: {
        type: Number,
        required: true,
        unique: true,
    },
    title: { type: String, required: true },
    description: { type: String },

    dueDate: { type: Date },
    state: {
        type: String,
        enum: ["New", "Commited", "Done"],
        required: [true, "Please provide correct State"],
        default: "New"
    },
    substatus: {
        type: String,
        enum: ["Not Started", "code Review", "Completed"],
        required: [true, "Please provide correct State"],
        default: "Not Started"
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

});



const Task = mongoose.model<ITask>('Task', TaskSchema);
export { Task }
