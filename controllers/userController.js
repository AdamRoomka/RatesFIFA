const userModel = require('../models/userModel')


exports.getUserById = async (req,res)=>{
    try {
        const results = await userModel.findById(req.params.id);

        res.status(200).json({
            data: {
                users: results
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.createUser = async (req, res) => {
    console.log('User save request received')    

    responseBody={
        status:'success',
        message:''
    }

    if(req.body.name === undefined) {
        var responseBody={
            status:'fail',
            message:'name not defined',
        }
    }
    if(req.body.login === undefined) {
        var responseBody={
            status:'fail',
            message:'password not defined',
        }
    }
    if(req.body.password === undefined) {
        var responseBody={
            status:'fail',
            message:'password not defined',
        }
    }

    const user = await userModel.find({login: req.params.login});

    if( user !== null ){
        var responseBody={
            status:'fail',
            message:'login already exists',
        }
    }

    if(responseBody.status==='fail') {
        console.log(responseBody.message)
        res.send(JSON.stringify(responseBody))
        return
    }

    var newUserObject={
        login: req.body.login,
        name: req.body.name,
        password: req.body.password
    }

    var newUser= new userModel(newUserObject)

    newUser.save(function(err, team) {
        if (err) return console.error(err);
    });

    var responseBody={
        status:'success',
        message:'User saved',
        data:{
            users:{
                newUserObject
            }
        }
    }
    res.statusCode=201
    res.send(JSON.stringify(responseBody))
    console.log('Match saved')
}