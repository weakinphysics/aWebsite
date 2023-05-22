const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/users')
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); 
const mySecret = require("./config/keys").secretOrKey;

app.use(bodyParser.urlencoded({
    extended: false
}));

const dburl = require("./config/keys").mongoURI;

const store = new MongoDBStore({
    uri: dburl,
    collection: "sessions"
});

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: mySecret,
    resave: false,
    saveUninitialized: false,
    store: store,
}));


mongoose.connect(dburl, {useNewUrlParser: true}).then(()=>{
    console.log("Connexion established! ");
}).catch((err)=>console.error(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Backend running at port: ${port}`));
