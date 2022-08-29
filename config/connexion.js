const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://josias:hmAYVFeiq4nyJSQQ@cluster0.ps1gmqq.mongodb.net/jostack?retryWrites=true&w=majority",
{useNewUrlParser:true, useUnifiedTopology:true}

)
.then(()=>{console.log("Connected to Mongodb")})
.catch((err)=>{console.log("Failed to connected " + err)})