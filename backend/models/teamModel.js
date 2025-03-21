const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
