module.exports=(function(){
    var mongoose=require('mongoose');
    var Schema=mongoose.Schema;
    var ticket=new Schema({
        numberOfSeats:Number,
        seats:Array,
        ownerInfo:{name:String,id:String},
        Status:String,
        date:Date
    });    

    return mongoose.model('ticket',ticket);
})();