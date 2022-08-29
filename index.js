const express= require('express');
const bodyparser=require('body-parser');
const mongoose= require('mongoose');
const app = express();
require("dotenv").config();
const AuthRoute= require('./routers/AuthRoute.js');
const userRoutes=require('./routers/UserRoutes.js')
const PORT= 5000;

//Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({limit:"30mb",extended:true}))

//Connexon à la DB
require('./config/connexion.js');

//routes
app.use('/auth',AuthRoute)
app.use('/user',userRoutes)

//Serveur
app.listen(PORT,()=>{
    console.log(`En attente de requette sur le 
    port: ${PORT} `)
})