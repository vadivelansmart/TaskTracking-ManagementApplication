import mongoose, { Schema, Document } from 'mongoose';
import { ITeamMember } from '../dto';
const TeamMembershipSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
});

const TeamMember = mongoose.model<ITeamMember>('TeamMember', TeamMembershipSchema);
export {TeamMember};