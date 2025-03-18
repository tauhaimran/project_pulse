const mongoose = require('mongoose');
const User = require('./User');

const managerSchema = new mongoose.Schema({
    userID: { type: String, ref: 'User', required: true },
    projectIDs: [{ type: String }]
});

module.exports = mongoose.model('Manager', managerSchema);
