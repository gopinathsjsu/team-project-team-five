const express = require("express");
var session = require('express-session');
const flash = require('express-flash');
const app = express();
const bodyParser = require("body-parser");
const mysql=require("mysql2");
const cors = require("cors");
const passport = require("passport");
var bcrypt = require('bcrypt');

const db= mysql.createPool({
    host:"remotemysql.com",
    user:"XW1b4VSlnE",
    password:"xkklxWRGxA",
    database:"XW1b4VSlnE"
});

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
    optionSuccessStatus: 200
  };

const initializePassport = require('./passport-config');
initializePassport(db, passport);

app.use(cors(corsOptions));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/login', passport.authenticate('local'), (req, res) => {
    // console.log("here");
    res.send("success")
});

app.get('/logout', (req, res) => {
    req.logout(req.user, err => {
    if(err) return next(err);
        res.send("success");    
    });
});

app.get('/user', (req, res) => {
    res.send(req.user)
});

app.get("/api/getUsers", (req,res)=>{
    const query="select username,password from temp_accounts;"
    db.query(query,(error,result)=>{
        res.send(JSON.stringify(result));
    });
});

app.get("/api/get",(req,res)=>{
    const query="Select * from city Limit 100;"
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

app.get("/api/getAllAirlineInfo",(req,res)=>{
    const query = "select distinct airlineId_pk,airlineName from airlines;"
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

app.get("/api/getAirlineInfo/:ID",(req,res)=>{
    const airlineid_pk=req.params.ID;
    const query = "select distinct airlineName,website,phoneNumber from airlines where airlineId_pk="+airlineid_pk+";";
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

app.get("/api/getArrivalFligts",(req,res)=>{
    const query="select airlinename_fk,airline_fk,scheduledTime,status,terminalId_fk,gateId_fk,arrivalId";
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

app.get("/api/getDepartureFligts",(req,res)=>{
    const query="select airlineId_dept_fk,scheduledTime,status,terminalId_fk,gateId_fk";
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

// app.post("/api/post",(req,res)=>{
//     const {roleId_pk,name} = req.body;
//     const query = "INSERT INTO roles (roleId_pk,name) values (?, ?, ?);"
//     db.query(query,[roleId_pk,name],(error,result) => {
//         if(error){
//             console.log(error);
//         }
//     });
// });

app.post("/api/addNewAirline",(req,res)=>{
    
    const airlineName=req.body.airlineName;
    const website=req.body.website;
    const phoneNumber=req.body.phoneNumber;
    
    const query= "insert into airlines (airlineName,website,phoneNumber) values ('"+airlineName+"','"+website+"','"+phoneNumber+"');"
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/addNewUser",(req,res)=>{
    
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const address = req.params.address;
    const zipcode = req.params.zipcode;
    const phoneNumber = req.params.phoneNumber;
    const nationality = req.params.nationality;
    const city = req.params.city;
    const state = req.params.state;
    const gender = req.params.gender;
    const country = req.params.country;

    if(selectedRole=="Ariport Employee"){
        roleId=3
    }
    else if(selectedRole=="Airline Employee"){
        roleId=2
    }
    else if(selectedRole=="Customer"){
        roleId=1
    }
    else{
        res.send("error");
    }

    const query= "insert into users (firstName,lastName,address,zipcode,phoneNumber,nationality,city,state,gender,country,roleId_fk) values ('"+firstName+"','"+lastName+"','"+address+"','"+zipcode+"','"+phoneNumber+"','"+nationality+"','"+city+"','"+state+"','"+gender+"','"+country+"',"+roleId+");"
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/updateAirlineInfo",(req,res)=>{
    
    const airlineName=req.params.airlineName;
    const website=req.params.website;
    const phoneNumber=req.params.phoneNumber;
    const airlineId_pk=req.params.airlineId_pk;
    
    const query= "update airlines set airlineName='"+airlineName+"',website='"+website+"',phoneNumber='"+phoneNumber+"' where airlineId_pk="+airlineId_pk;
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/updateUserInfo",(req,res)=>{
    
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const address = req.params.address;
    const zipcode = req.params.zipcode;
    const phoneNumber = req.params.phoneNumber;
    const nationality = req.params.nationality;
    const city = req.params.city;
    const state = req.params.state;
    const gender = req.params.gender;
    const country = req.params.country;
    
    const userId_pk = req.params.userId_pk;

    const query= "update users set firstName='"+firstName+"',lastName='"+lastName+"',address='"+address+"',zipcode='"+zipcode+"',phoneNumber='"+phoneNumber+"',nationality='"+nationality+"',city='"+city+"',state='"+state+"',gender='"+gender+"',country='"+country+"' where userId_pk="+userID+";";
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});


app.listen(8000, () => {
    console.log("Server running on port 8000");

})