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
    const query="Select * fr om roles;"
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

app.listen(5000, () => {
    console.log("Its running")
})