const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql=require("mysql2");
const cors = require("cors");

const db= mysql.createPool({
    host:"remotemysql.com",
    user:"XW1b4VSlnE",
    password:"xkklxWRGxA",
    database:"XW1b4VSlnE"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/selectAllFromRoles",(req,res)=>{
    const query="Select * from roles";
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/",(req,res)=>{
    const query="Select * from roles;"
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
})

app.post("/addschedule", (req,res) => {
    //console.log(req.body.airlineName);
    var airlineName = req.body.airlineName;
    var airportCode = req.body.airportCode;
    var arrivaltime = req.body.arrivaltime;
    var gate_num = req.body.gate_num;
    var terminal_id = req.body.terminal_id;
    var flight_number_fk = req.body.flight_number_fk;
    var source = req.body.source;
    var destination = req.body.destination;

    console.log(airlineName + airportCode + arrivaltime + gate_num + terminal_id + flight_number_fk + source + destination);

    const query="INSERT INTO schedules (airlineName, airportCode, arrivaltime, gate_num, terminal_id, flight_number_fk, source , destination) Values (?,?,?,?,?,?,?,?)";
    db.query(query,[airlineName, airportCode, arrivaltime, gate_num, terminal_id, flight_number_fk, source , destination],(error,result)=>{
        if(error==null){
            //res.send(JSON.stringify(result));
            res.send("db record added");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.listen(5000, () => {
    console.log("Its running")
})