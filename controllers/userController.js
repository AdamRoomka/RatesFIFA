const userModel = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.getAllUsers = async (req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        if(req.header('authorization')=== undefined) {
            res.status(400).json({ message: "Wrong user token",status:'fail',code:'WRONG_USER_TOKEN'});
            return
        }
        const token=req.header('authorization').split(" ")[1]
        
        var currentUser=await userModel.findOne({token:token})
        var selectColumnsFromUserTable="name score -_id"
        if(currentUser.role==="admin") {
            selectColumnsFromUserTable="-token -password"
        }

        var results = await userModel.find().select(selectColumnsFromUserTable).sort({'score':'desc'});
    
        res.status(200).json({
            data: {
                users: results,
                name: currentUser.name,
                currentUserRole: currentUser.role
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'NOT_FOUND',
            message: err
        });
    }
}

exports.createUser = async (req, res) => {
    
    console.log('User save request received')
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    if(req.body.name === undefined) {
        res.status(400).json({ message: "Name not defined",status:'fail',code:'NANE_NOT_DEFINED'});
        console.log('Name not defined')
        return
    }

    if(req.body.email === undefined) {
        res.status(400).json({ message: "Email not defined",status:'fail',code:'EMAIL_NOT_DEFINED'});
        console.log('Email not defined')
        return
    }

    if(req.body.login === undefined) {
        res.status(400).json({status:'fail',code: 'LOGIN_NOT_DEFINED',message:'login not defined'});
        console.log('Login not defined')
        return
    }
    if(req.body.password === undefined) {
        res.status(400).json({status:'fail',code: 'PASSWORD_NOT_DEFINED',message:'password not defined'});
        console.log('Password not defined')
        return
    }

    const salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(req.body.password,salt);

    var newUserObject={
        login: req.body.login,
        name: req.body.name,
        email: req.body.email,
        password: password
    }

    if(req.body.role!==undefined) {
        newUserObject.role=req.body.role
    }
    
    user = await userModel.create(newUserObject);
    


    const token = await jwt.sign(
        { role: user.role, login: req.body.login },
        process.env.TOKEN_KEY
    );
    
    user.token=token

    user.save(function(err, user) {
        if (err) return console.error(err);
    });

    res.statusCode=200
    res.send(JSON.stringify({status:'success',code: 'USER_CREATED',message:'User created'}))
    console.log('User created: '+user.login)
}

exports.loginUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if(req.body.login===undefined || req.body.password===undefined) {
        res.status(400).json({
            status:'fail',
            code: 'NAME_OR_PASSWORD_NOT_DEFINED',
            message:'name or password not defined',
        });
        console.log('Name or password not defined')
        return
    }

    var user = await userModel.find({login: req.body.login});

    if( user.length===0 ){
        res.status(400).json({
            status:'fail',
            code: 'LOGIN_DO_NOT_EXISTS',
            message:'login do not exists',
        });
        console.log('Login do not exists')
        return
    }
    user=user[0]

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        res.status(400).json({ message: "Invalid Password",status:'fail',code:'INVALID_PASSWORD'});
        console.log('Invalid password')
        return
    }
    res.status(200).json({status:'success',message:'Login successful',token:user.token,code:'LOGIN_SUCCESSFUL',role:user.role})
    console.log('Login successful: '+user.login,user)
}

exports.updateUser= async (req,res) => {
    if(req.header('authorization')=== undefined) {
        res.status(400).json({ message: "Wrong user token",status:'fail',code:'WRONG_USER_TOKEN'});
        return
    }
    const token=req.header('authorization').split(" ")[1]

    var currentUser = await userModel.findOne({token:token})

    if(currentUser !== null && currentUser.role!=="admin") {
        res.status(400).json({ message: "Wrong access rights",status:'fail',code:'WRONG_ACCESS_RIGHTS'});
        return
    }
    var user = await userModel.findById(req.params.id);

    if(req.body.name !== undefined) {
        user.name=req.body.name;
    }
    if(req.body.password !== undefined) {
        const salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash(req.body.password,salt);
        user.password=password;
    }
    if(req.body.role !== undefined) {
        user.role=req.body.role;
    }

    user.save(function(err, team) {
        if (err) return console.error(err);
    });
    res.status(200).json({ message: "User updated",status:'success'});
}