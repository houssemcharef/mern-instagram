import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js"

//app config
const app = express();
const port =process.env.PORT || 8080;


const pusher = new Pusher({
  appId: "1116569",
  key: "33e2c2e111297d4d2b15",
  secret: "aef4013c2a3360d405e6",
  cluster: "eu",
  useTLS: true
});



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

    const changeStream = mongoose.connection.collection('posts').watch();

    changeStream.on('change', (change) => {
        console.log('change triggered on pusher ...');
        console.log(change);
        console.log('end of change');
        if(change.operationType === 'insert'){
            console.log('Triggring pusher ***IMG UPLOD**');
            const postDetails = change.fullDocument;
            pusher.trigger('post', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDeatails.image
            })
        }else {
            console.log('unkonwn triggre from pushr');
        }
    })
})


//api routes
app.get('/',(req,res)=>res.status(200).send("ello word"));

app.post('/upload',(req, res) => {
     const body = req.body; 
     console.log(body)
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