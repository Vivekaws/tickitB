var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var config=require('./config/config');
var router=require('./routes/routes');
var app=express()

//********Static***********//
//app.use(express.static('public'));

//*************************//

//********Mongo Configuration*****************//

mongoose.connect(config.mongoUrl,function(err,database){
    if(err)
     {
         console.log(err);
        process.exit(1);
    }
    db=database;
    console.log("database connected");
})



//********MiddleWare***********//
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods",'GET,PUT,POST,X-Access-Token,X-KEY');
    res.header("Access-Control-Allow-Headers",'Content-type,Accept,X-Acces-Tocken,X-Key');
    if(req.method=='OPTIONS'){
        res.status(200).end();
    }else{
        next();
    }
});
app.use(express.static('client'));
app.use('/',router);

//*************************//
//***********Server Started***************//
app.listen(config.port);
console.log("Server started");