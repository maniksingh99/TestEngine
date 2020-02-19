const express=require('express');
const app=express();
const cors=require('cors');

//var bodyParser=require('body-parser');

app.use(cors());


app.use(express.json());

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use('/',require('./controllers/user'));

app.use((res,req,next)=>{
    res.send('U type something wrong');
})

app.listen(process.env.PORT||1234,()=>{
    console.log('Server Start');
})