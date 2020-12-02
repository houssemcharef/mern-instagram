import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js"

//app config
const app = express();
const port =process.env.PORT || 8080;

//midelwares
app.use(express.json());
app.use(cors());

//DB config
const connection_url='mongodb+srv://admin:Yuok4v4NgeLHgozf@cluster0.u5fp8.mongodb.net/instagrem-clone?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
});

mongoose.connection.once('open',()=>{
    console.log('db connected');
})


//api routes
app.get('/',(req,res)=>res.status(200).send("ello word"));

app.post('/upload',(req, res) => {
     const body = req.body; 
     dbModel.create(body, (err, data) => {
         if (err) {
             res.status(500).send(err);
         } else {
             res.status(201).send(data);
         }
     }) ; 
});

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

//listen
app.listen(port,()=> console.log(`listenning on port ${port}`));