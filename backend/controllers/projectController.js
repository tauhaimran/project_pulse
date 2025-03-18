const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const { projectID } = req.params;
        const updatedProject = await Project.findOneAndUpdate({ projectID }, req.body, { new: true });
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
