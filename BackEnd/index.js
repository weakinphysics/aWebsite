const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/users')
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
const xyz = 4;
const db = require("./config/keys").mongoURI;

mongoose.connect(db, {useNewUrlParser: true}).then(()=>{
    console.log("Connexion established! ");
}).catch((err)=>console.error(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Backend running at port: ${port}`));

