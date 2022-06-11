const matchModel = require('../models/matchModel');
const teamModel = require('../models/teamModel');

const teamController=require('../controllers/teamController')

exports.getAllMatches= async (req,res)=>{
    try {
        const results = await matchModel.find();

        res.status(200).json({
            data: {
                matches: results
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.saveMatch = async (req, res) => {
    console.log('Match save request received')    

    let team1=await teamModel.findById(req.body.team1)
    let team2=await teamModel.findById(req.body.team2)

    responseBody={
        status:'success',
        message:''
    }
    
    if(team1 === null || team2 ===null) {
        var responseBody={
            status:'fail',
            message:'Teams not found',
        }
    }

    if(team1===team2) {
        var responseBody={
            status:'fail',
            message:'Teams cant be same',
        }
    }

    if(req.body.time === undefined) {
        var responseBody={
            status:'fail',
            message:'time not definedd',
        }
    }

    if(responseBody.status==='fail') {
        console.log(responseBody.message)
        res.send(JSON.stringify(responseBody))
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

exports.updateMatch = async (req, res) => {
    console.log('Match update request received')

    const match = await matchModel.findById(req.params.id);

    if( match ===null ){
        var responseBody={
            status:'fail',
            message:'Match not found',
        }
    }
    let team1=await teamModel.findById(req.body.team1)
    let team2=await teamModel.findById(req.body.team2)

    responseBody={
        status:'success',
        message:''
    }
    
    if(team1 === null || team2 ===null) {
        var responseBody={
            status:'fail',
            message:'Teams not found',
        }
    }

    if(team1===team2) {
        var responseBody={
            status:'fail',
            message:'Teams cant be same',
        }
    }

    if(req.body.time === undefined) {
        var responseBody={
            status:'fail',
            message:'time not definedd',
        }
    }

    if(responseBody.status==='fail') {
        console.log(responseBody.message)
        res.send(JSON.stringify(responseBody))
        return
    }

    match.team1=req.body.team1
    match.team2=req.body.team2
    match.time=req.body.time

    match.save(function(err, team) {
        if (err) return console.error(err);
    });
    

    var responseBody={
        status:'success',
        message:'Match updated',
        matchId: match._id
    }
    res.statusCode=201
    res.send(JSON.stringify(responseBody))
    console.log('Match' + match._id+' updated')
};

exports.getMatchById= async (req,res)=>{
    try {
        const results = await matchModel.findById(req.params.id);

        res.status(200).json({
            data: {
                matches: results
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}