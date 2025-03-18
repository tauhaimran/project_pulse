import { User } from '../models/User.js';

export const loginUser = async (req, res) => {
    try {
        const { userID, name, email, role } = req.body;
        const user = new User({ userID, name, email, role });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// This controller function handles the login operation for a user.