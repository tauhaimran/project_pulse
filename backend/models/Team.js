import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({
    projectID: String,
    teamLead: String,
    members: [String]
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
