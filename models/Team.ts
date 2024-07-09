import mongoose, { Schema } from 'mongoose';
import {ITeam} from '../dto'

const TeamSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const Team = mongoose.model<ITeam>('Team', TeamSchema);
export {Team};
