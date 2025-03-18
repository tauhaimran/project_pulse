import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userID: String,
    name: String,
    email: String,
    role: String
});

export const User = mongoose.model('User', userSchema);
// This model defines the structure of the User object in the database.
// It includes fields for the user's ID, name, email, and role
// The model is exported so that it can be used in other parts of the application, such as routes and controllers.