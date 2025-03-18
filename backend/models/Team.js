import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamID: String,
    lead: String,
    memberCount: Number,
    members: [String],
    projectID: String
});

export const Team = mongoose.model('Team', teamSchema);
