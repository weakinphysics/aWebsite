const bcrypt = require("bcrypt");

const validateRegisterInput = require("../validation/register");
const user = require("../models/User");

const createUser = (req, res)=>{
    const {error, isValid} = validateRegisterInput(req.body);
    if(!isValid) return res.status(400).json(error);
    user.findOne({
        email: req.body.email
    }).then((person)=>{
        if(person) return res.status(400).json({
            email: "email already exists"
        })
        else{
            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((x)=>res.json(x)).catch((err)=>console.error(err));

                })
            })
        }
    })
}

module.exports = createUser;