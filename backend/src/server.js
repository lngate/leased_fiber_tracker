const express = require('express');


const app = express();

app.get('/',(req,res)=>{
    console.log('welcome to leased fibe test')
})

app.listen(8080, ()=>{
    console.log("server is listening on port 8080")
});
