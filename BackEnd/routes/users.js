const express = require('express');
const router = express.Router();

const session = require("express-session");

const createUser = require("../controllers/createUser");
const loginUser = require("../controllers/loginUser");
const tableOperator = require("../controllers/sendTableData");


router.post("/register", (req, res)=>{
  createUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});


router.post("/cookieCookie", (req, res)=>{
  console.log(req.body);
  tableOperator.getsData(req, res);
})


router.post("/createEntry", (req, res)=>{
  tableOperator.createsEntry(req, res);
});




module.exports = router;



