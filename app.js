require('dotenv').config();
const express = require('express');
const getMetaData = require('metadata-scraper')
const cors = require('cors');


const PORT = process.env.PORT;

//create  a app
const app = express();

//add middleware for handing cors and json
app.use(express.json());
app.use(cors())

//route gives all the meta data
app.post('/meta-data',(req,res)=>{
 const {url} = req.body;
 const payload = {"status":1,"message":"success"};

 //get the necessary meta data
 getMetaData(url).then((response)=>{
     const {title,icon,description,image,url} = response; 
     payload.data = {title,icon,description,image,url};
     return res.status(200).json({"result" : payload});
 }).catch((err)=>{
     payload.status = 0;
     payload.message = String(err);
     return res.status(500).json({"result" : payload});
})
});

//start the server 
app.listen(PORT,()=>{
 console.log(`Server is listening at PORT ${PORT}`)   
})

