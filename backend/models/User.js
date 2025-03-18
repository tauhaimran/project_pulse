const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['User', 'Manager', 'Executive', 'TeamMember'] }
});

module.exports = mongoose.model('User', userSchema);
// The User model is defined in the User.js file. It contains the schema for the user data and exports the User model using mongoose.model. This model is used in the userController.js file to interact with the MongoDB database.
