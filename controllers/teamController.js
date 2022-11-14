const teams = require('../models/teamModel');

exports.getAllTeams = async (req, res) => {
    try {
        console.log("GET /teams")
        const results = await teams.find().sort({'score':'desc'});
        console.log("Teams found")

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

exports.getTeamById = async (req,res)=>{
    try {
        const results = await teams.findById(req.params.id);

        // res.setHeader('Access-Control-Allow-Origin', '*')

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