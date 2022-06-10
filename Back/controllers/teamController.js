const teams = require('../models/teamModel');


exports.getAllTeams = async (req, res) => {
    try {
        const teams = await teams.find();
        res.status(200).json({
            status: 'success',
            results: teams.length,
            data: {
                teams: teams
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};