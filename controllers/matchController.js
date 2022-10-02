const matchModel = require('../models/matchModel');
const teamModel = require('../models/teamModel');
const guessModel = require('../models/guessModel');
const userModel = require('../models/userModel');

const {calculateMatchGuesses,calculateUserGainedPoints} = require ('../scripts/matchGuessScoreCalculator')
const {calculateTeamPoints} = require ('../scripts/teamPointsCalculator')


exports.getAllMatches= async (req,res)=>{
    try {

        if(req.header('authorization')!== undefined) {
            console.log("authorization defined")
            const token=req.header('authorization').split(" ")[1]
            console.log("token received")
            var user = await userModel.findOne({token:token});
            if( user !== null ){
                console.log("user found")
            } else {
                res.status(400).json({ message: "User not found",status:'fail',code:'WRONG_TOKEN'});
                return
            }
        }

        var allMatchUserGuesses=[]

        console.log("GET all matches:")

        var matches = await matchModel.find(req.query).sort({'date':1,'time':1}).lean().populate('team1').populate("team2");

        for(var match of matches) {

            const date=match.date.split("-")
            const time =match.time.split(":")

            const minutesInMilisecondsBeforeMatch=process.env.SHOW_USER_RESULTS_MINUTES_BEFORE_MATCH*60000;

            match.due=Date.parse(new Date(date[0], date[1]-1, date[2], time[0], time[1], 0))/1000 - minutesInMilisecondsBeforeMatch;
            
            var isFirstMatchStartsSoon= (match.due - Date.now()) >=  minutesInMilisecondsBeforeMatch ? true : false;

            allMatchUserGuesses=[]

            var matchGuesses= await guessModel.find({matchId:match._id}).populate('userId')

            for(var guess of matchGuesses) {

                var guessObject={userName:guess.userId.name,score1:guess.score1,score2:guess.score2,"points":""}


                if(match.completed) {
                    var scoredPoints=calculateUserGainedPoints(match.score1,match.score2,guess.score1,guess.score2)
                    guessObject.points=scoredPoints;
                }

                if(guess.userId.equals(user._id)) {
                    match.currentUserGuess={"score1":guess.score1,"score2":guess.score2,"points":""}
                    if(match.completed) {
                        match.currentUserGuess.points=scoredPoints;
                    }
                }
                allMatchUserGuesses.push(guessObject)
            }
        
            if(isFirstMatchStartsSoon){
                match.guesses=allMatchUserGuesses;
            }
        }

        res.status(200).json({
            data: {
                matches: matches
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

    
    if(team1 === null || team2 ===null) {
        res.status(400).json({ message: "Wrong team1 or team2 ID",status:'fail',code:'WRONG_TEAM_ID'});
        return
    }

    if(team1===team2) {
        res.status(400).json({ message: "Teams are same",status:'fail',code:'WRONG_TEAM_ID'});
        return
    }

    if(req.body.time === undefined) {
        res.status(400).json({ message: "Time not defined",status:'fail',code:'TIME_NOT_DEFINED'});
        return
    }
    if(req.body.date === undefined) {
        res.status(400).json({ message: "Date not defined",status:'fail',code:'DATE_NOT_DEFINED'});
        return
    }

    if(req.body.type !== undefined) {
        matchObject.type=req.body.type
    }

    matchObject.team1=team1._id
    matchObject.team2=team2._id
    matchObject.time=req.body.time
    matchObject.date=req.body.date
    matchObject.type=req.body.type
    matchObject.score1=req.body.score1===undefined ? 0 : req.body.score1;
    matchObject.score2=req.body.score2===undefined ? 0 : req.body.score2;

   
    var newMatch= new matchModel(matchObject)

    newMatch.save(function(err, team) {
        if (err) return console.error(err);
    });

    var responseBody={
        status:'success',
        message:'Match saved',
        data:{
            match:newMatch
        }
    }
    res.statusCode=201
    res.send(JSON.stringify(responseBody))
    console.log('Match saved: '+newMatch._id)
}

exports.updateMatch = async (req, res) => {
    console.log('Match update request received')

    var match = await matchModel.findById(req.params.id);

    if( match ===null ){
        res.status(400).json({ message: "Wrong match ID",status:'fail',code:'WRONG_MATCH_ID'});
        return
    }
    if(match.completed) {
        res.status(400).json({ message: "Match completed",status:'fail',code:'MATCH_COMPLETED'});
        return
    }

    match.score1 = req.body.score1;
    match.score2 = req.body.score2;

    if (req.body.completed !== undefined) {
        await calculateMatchGuesses(match)
        await calculateTeamPoints(match)
        match.completed=true;
    }
    match.save(function(err, team) {
        if (err) return console.error(err);
    });

    //add team points
    
    
    var responseBody={
        status:'success',
        message:'Match updated',
        data:{
            match:match
        }
    }

    res.statusCode=201
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(JSON.stringify(responseBody))
    console.log('Match updated: '+match._id)
}

exports.getMatchById= async (req,res)=>{
    try {
        var results = await matchModel.findById(req.params.id).populate('team1').populate("team2");;
        res.setHeader('Access-Control-Allow-Origin', '*')
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

exports.deleteMatch = async (req,res) => {

    await matchModel.findById(req.params.id,async function(err, match) {
  
        if (!match) {
            res.status(400).json({ message: "Wrong match ID",status:'fail',code:'WRONG_MATCH_ID'});
            return
        }
        await guessModel.find({matchId: match._id}).deleteMany();
        match.remove();
    });
    res.status(200).json({ message: "Match deleted",status:'success'});
}
