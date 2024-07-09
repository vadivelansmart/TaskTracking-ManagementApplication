import mongoose, { Schema, Document } from 'mongoose';
import { IComment } from '../dto';

const CommentSchema: Schema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    comment: { type: String, required: true },
    attachments: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment, IComment };
