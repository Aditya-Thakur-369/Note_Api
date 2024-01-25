// Requir Modules are imported here 
const UserModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SECRETKEY = "Secretkey";

const signup = async (req , res) => {

    const {username , email , password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email : email})
        if(existingUser){
            return res.status(400).json({messagae : " User Already Registered"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await UserModel.create({username: username , email : email, password : hashPassword});

        const token = jwt.sign({email : result.email , id: result._id},SECRETKEY);
        res.status(201).json({user: result, token : token})

    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

const signin = async  (req , res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email : email})
        if(!existingUser){
            return res.status(404).json({messagae : " User Not Found"})
        }
        const matchpassword = await bcrypt.compare(password, existingUser.password);
        if(!matchpassword){
            res.status(400).json({messagae : "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email , id: existingUser._id},SECRETKEY);
        res.status(201).json({user: existingUser, token : token})


    } catch (error) {

        res.status(500).json({message: "Something went wrong", error: error.message});
        
    }
}

// Module are exported here 
module.exports = {
    signup,
    signin
}

