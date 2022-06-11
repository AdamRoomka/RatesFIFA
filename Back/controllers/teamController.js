const teams = require('../models/teamModel');


exports.getAllTeams = async (req, res) => {
    try {
        const results = await teams.find();

        res.status(200).json({
            results: teams.length,
            data: {
                teams: results
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTeamById= async (req,res)=>{
    try {
        const results = await teams.findById(req.params.id);

        res.status(200).json({
            data: {
                teams: results
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}