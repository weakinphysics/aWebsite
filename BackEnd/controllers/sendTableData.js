const tableData = require('../models/Tabla');

const tdHandler = (req, res)=>{
    if(req.body.searchParams !== "") tableData.find({Name: new RegExp(req.body.searchParams, "i")}).sort({[req.body.order] : 1}).limit(Number.parseInt(req.body.perPage)).then((recvd)=>{
        res.send([[...recvd], 1]);
      }).catch((err)=>console.log(err));
    else tableData.find().sort({[req.body.order] : [Number.parseInt(req.body.dir)]}).skip((Number.parseInt(req.body.thePage) - 1)*Number.parseInt(req.body.perPage)).limit(Number.parseInt(req.body.perPage)).then((recvd)=>res.send([[...recvd], 4])).catch((err)=>console.log(err));
}

const createEntryHandler = (req, res)  => {
    const newguy = new tableData({  
        Name : req.body.name,
        Position: req.body.position,
        Office: req.body.office,
        Age: Number.parseInt(req.body.age),
        "Start date": (req.body.date).substring(0, 10),
        Salary: "$" + req.body.salary
    })
  
    newguy.save().then((emp)=>res.json(emp)).catch((err)=>console.log(err));
    res.send({
        message: "ice-cream"
    })
}

module.exports = {
    createsEntry: createEntryHandler,
    getsData: tdHandler
}