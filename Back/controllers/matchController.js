const matchModel = require('../models/matchModel');
const teamModel = require('../models/teamModel');

const teamController=require('../controllers/teamController')


exports.saveMatch = async (req, res) => {
    console.log('Match save request received')    

    let team1=await teamModel.findById(req.body.team1)
    let team2=await teamModel.findById(req.body.team2)

    
    if(team1 === null || team2 ===null) {
        var responseBody={
            status:'fail',
            message:'Teams not found',
        }
        res.statusCode=404
        res.send(JSON.stringify(responseBody))
        console.log('Teams not found')
        return
    }

    if(req.body.time === undefined) {
        var responseBody={
            status:'fail',
            message:'time not definedd',
        }
        res.statusCode=404
        res.send(JSON.stringify(responseBody))
        console.log('Match time not found')
        return
    }

    var newMatch= new matchModel({
        team1: team1._id,
        team2: team2._id,
        time: req.body.time
    })

    newMatch.save(function(err, team) {
        if (err) return console.error(err);
    });
    

    var responseBody={
        status:'success',
        message:'Match saved',
        matchId: newMatch._id
    }
    res.statusCode=201
    res.send(JSON.stringify(responseBody))
    console.log('Match saved')
};