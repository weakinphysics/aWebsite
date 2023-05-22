const bcrypt = require("bcrypt");
const user = require("../models/User");
const keys = require("../config/keys");

const validateLoginInput = require("../validation/login");


const loginUser = (req, res) => {
    console.log(req , req.session.isLoggedIn);
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) return res.status(403).json(errors);
    const email = req.body.email
    user.findOne({ email }).then((person) => {
        console.log(person);
        //let response = 
        if (!person) return res.status(402).json({ error: "email not found" });
        bcrypt.compare(req.body.password, person.password).then((match) => {
            if (match) {
                req.session.isLoggedIn = true;
                console.log(req.session);
                return res.status(200).json({
                    success: true,
                    token: "jolkien rolkien rolkien tolkien",
                 
                })
            }
            else {
                return res.status(402).json({
                    error: "wrong password"
                })
            }
        })
    })
}

module.exports = loginUser;