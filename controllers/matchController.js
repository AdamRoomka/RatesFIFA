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

exports.createMatch = async (req, res) => {
    console.log('Match save request received')    

    var matchObject={}

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
            message:'time not defined',
        }
    }
    if(req.body.type === undefined) {
        var responseBody={
            status:'fail',
            message:'type not defined',
        }
    }

    if(responseBody.status==='fail') {
        console.log(responseBody.message)
        res.send(JSON.stringify(responseBody))
        return
    }

    var score1 = req.body.score1===undefined ? 0 : req.body.score1;
    var score2 = req.body.score2===undefined ? 0 : req.body.score2;

    matchObject.team1=team1._id
    matchObject.team2=team2._id
    matchObject.time=req.body.time
    matchObject.type=req.body.type
    matchObject.score1=score1
    matchObject.score2=score2

   
    var newMatch= new matchModel(matchObject)

    newMatch.save(function(err, team) {
        if (err) return console.error(err);
    });

    
    var responseBody={
        status:'success',
        message:'Match saved',
        data:{
            matches:{
                matchObject
            }
        }
    }
    res.statusCode=201
    res.send(JSON.stringify(responseBody))
    console.log('Match saved')
}

exports.updateMatch = async (req, res) => {
    console.log('Match update request received')
    var responseBody={}
    const match = await matchModel.findById(req.params.id);

    if( match ===null ){
        responseBody={
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
        responseBody={
            status:'fail',
            message:'Teams not found',
        }
    }

    if(team1===team2) {
        responseBody={
            status:'fail',
            message:'Teams cant be same',
        }
    }

    if(req.body.time === undefined) {
        responseBody={
            status:'fail',
            message:'time not definedd',
        }
    }
    if(req.body.type === undefined) {
        responseBody={
            status:'fail',
            message:'type not definedd',
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
    match.type=req.body.type
    match.score1 = req.body.score1===undefined ? 0 : req.body.score1;
    match.score2 = req.body.score2===undefined ? 0 : req.body.score2;


    match.save(function(err, team) {
        if (err) return console.error(err);
    });
    

    responseBody={
        status:'success',
        message:'Match updated',
        data:{
            matches:{
                matchId: match._id,
                team1:match.team1,
                team2:match.team2,
                score1:match.score1,
                score2:match.score2
            }
        }
        
    }
    res.statusCode=201
    res.send(JSON.stringify(responseBody))
    console.log('Match' + match._id+' updated')
}

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