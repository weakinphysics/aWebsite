const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');
const user = require('../models/User');
const tableData = require('../models/Tabla');
const PORT = process.env.PORT || 5000;

router.post("/register", (req, res)=>{
    const {errors, isValid} = validateRegisterInput((req.body));
    if(!isValid){
        return res.status(400).json(errors);
    }
    user.findOne({
        email: req.body.email
    }).then((person)=>{
        if(person) return res.status(400).json({
            email: "email already exists! "
        })
        else{
            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err=>console.log(err));
                });
            });
        }
        
    });  
});

router.post("/login", (req, res) => {
 
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(403).json(errors);
    }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
    user.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(402).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 10 // 1 year in seconds
            },
            (err, token) => {
              res.status(200).json({
                success: true,
                token: token
              });
            }
          );
        }
        else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

router.post("/cookieCookie", (req, res)=>{
  console.log(req.body);
  if(req.body.searchParams !== "") tableData.find({Name: new RegExp(req.body.searchParams, "i")}).sort({[req.body.order] : 1}).limit(Number.parseInt(req.body.perPage)).then((recvd)=>{
    res.send([[...recvd], 1]);
  }).catch((err)=>console.log(err));
  else tableData.find().sort({[req.body.order] : 1}).skip((Number.parseInt(req.body.thePage) - 1)*Number.parseInt(req.body.perPage)).limit(Number.parseInt(req.body.perPage)).then((recvd)=>res.send([[...recvd], 4])).catch((err)=>console.log(err));
  //JWT validation
})

module.exports = router;



