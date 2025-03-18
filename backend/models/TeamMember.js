const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    taskIDs: [{ type: String }],
    teamID: { type: String, required: true },
    isTeamLead: { type: Boolean, default: false }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
