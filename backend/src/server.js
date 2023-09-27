const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
//app.use(bodyParser.json());

const app = express();

app.get('/',(req,res)=>{
    console.log('welcome to leased fibe test')
})

app.listen(8080, ()=>{
    console.log("server is listening on port 8080")
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Moraa2019*",
    database:"leased fiber tracker"
})

db.connect((err)=>{
    if(err){
        console.log('Error connecting to Database');
    }else{
    console.log("connection successful to database");
}
});

// create the record
app.post('/api/leased fiber tracker/add', (req, res)=>{
    let details={
        partner:req.body.partner,
        customerName:req.body.customerName,
        customerID: req.body.customerID,
        bandwidthCapacity:req.body.bandwidthCapacity,
        dateConnected:req.body.dateConnected,
        amount:req.body.amount,
    };
    let sql ='INSERT INTO leased fiber tracker SET?';
    db.query(sql, details,(error)=>{
        if (error){
            res.send({status:false, message: "leased fiber tracker creation failed"});
        }else{
            res.send({status:true, message: "leased fiber tracker creation sucessfully"});
        }
    });
});