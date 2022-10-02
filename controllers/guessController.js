const matchModel = require('../models/matchModel');
const userModel = require('../models/userModel');
const guessModel = require('../models/guessModel');

exports.createOrUpdateGuesses=async (req,res)=>{

    if(req.header('authorization')=== undefined) {
        res.status(400).json({ message: "Wrong user token",status:'fail',code:'WRONG_USER_TOKEN'});
        return
    }

    const token=req.header('authorization').split(" ")[1]
    var user = await userModel.find({token:token});

    if( user.length === 0 ){
        res.status(400).json({ message: "Wrong user token",status:'fail',code:'WRONG_USER_TOKEN'});
        return
    }
    user=user[0]

    if( req.body.guesses === undefined ){
        res.status(400).json({ message: "Guesses not defined",status:'fail',code:'GUESSES_NOT_DEFINED'});
        return
    }

    req.body.guesses.forEach(async (guess) => {

        if( guess.matchId === undefined || guess.matchId===''){
            res.status(400).json({ message: "MatchId not defined",status:'fail',code:'MATCHID_NOT_DEFINED'});
            return
        }

        const match = await matchModel.findById(guess.matchId);
        
        if( match === null ){
            res.status(400).json({ message: "Wrong match ID",status:'fail',code:'WRONG_MATCH_ID'});
            return
        }

        var matches = await matchModel.find({type:match.type}).sort({'date':1,'time':1});

        var date=matches[0].date.split('-')
        var time=matches[0].time.split(':')
        const minutesForPlacingBetsBeforeFirstMatch=process.env.DISALLOW_USER_PLACE_GUESSES_MINUTES_BEFORE_FIRST_MATCH;
        var isFirstMatchStartsSoon= (Date.now() - Date.parse(new Date(Date.UTC(date[0], date[1]-1, date[2], time[0]-3, time[1], 0)))/1000)<=minutesForPlacingBetsBeforeFirstMatch*60000 ? true : false;
        
        if(isFirstMatchStartsSoon){
            res.status(400).json({ message: `Placing bets for matches in ${match.type} is not longer possible`,status:'fail',code:'WRONG_GUESS'});
            return
        }
        
        if(guess.score1 === undefined) {
            console.log("Score1 not defined")

            res.status(400).json({ message: "Score1 not defined",status:'fail',code:'SCORE_NOT_DEFINED'});
            return
        }
        if(guess.score2 === undefined) {
            console.log("Score2 not defined")
            res.status(400).json({ message: "Score2 not defined",status:'fail',code:'SCORE_NOT_DEFINED'});
            return
        }
        
        var existingGuess=await guessModel.findOne({userId:user._id,matchId:guess.matchId})
        
        var newOrUpdatedGuess= existingGuess===null ? new guessModel() : existingGuess;
        
        newOrUpdatedGuess.score1=guess.score1;
        newOrUpdatedGuess.score2=guess.score2;
        newOrUpdatedGuess.matchId=guess.matchId;
        newOrUpdatedGuess.userId=user._id;
        
        await newOrUpdatedGuess.save();

    })    
    res.status(201).json({message:"Guesses saved",status:"success",code:"GUESSES_SAVED"});
}

exports.getAllUserGuesses = async (req,res) => {
    if(req.header('authorization')=== undefined) {
        res.status(400).json({ message: "Wrong user token",status:'fail',code:'WRONG_USER_TOKEN'});
        return
    }
    const token=req.header('authorization').split(" ")[1]
    var user = await userModel.find({token:token});

    if( user.length === 0 ){
        res.status(400).json({ message: "Wrong user token",status:'fail',code:'WRONG_USER_TOKEN'});
        return
    }
    user=user[0]

    
    try {
        var guesses=await guessModel.find({userId:user._id}).populate('matchId')

        res.status(200).json({
            data: {
                guesses: guesses
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}