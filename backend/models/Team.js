const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamID: { type: String, required: true, unique: true },
    lead: { type: String, required: true },
    memberCount: { type: Number, required: true },
    members: [{ type: String }],
    projectID: { type: String, required: true }
});

module.exports = mongoose.model('Team', teamSchema);
