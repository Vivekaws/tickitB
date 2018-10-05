module.exports=(function(){

    var today=new Date();
    var ticketModel=require('./model/ticketModel');
    var unlockSeats=function(id){
        ticketModel.findOne({_id:id},function(err,doc){
            if(err)
                console.log(err);
            else{
                if(doc.Status=="locked"){
                    doc.Status="discarded";
                    doc.save(function(err){
                        if(err)
                            console.log(err);
                    });
                }
            }
        })
            
    };


   
    
    return {
        lockSeats:function(req,res){
            var ownerInfo={
                name:req.body.name,
                id:req.body.id,
                
            }
            var ticket={
                numberOfSeats:req.body.seats.length,
                seats:req.body.seats,
                ownerInfo:ownerInfo,
                date:new Date(req.body.date),
                Status:"locked"
                
            };

            
            if(ticket.date.getFullYear()<ticket.date.getFullYear && ticket.date.getMonth()<date.getMonth() && ticket.date.getDay()<date.getDay() ){
                
                res.status(400).json({"error":"Invalid date"});
            }else{


                ticketModel.create(ticket,function(err,doc){
                    if(err)
                        res.send(err);
                    setTimeout(unlockSeats,60000,doc._id);
                    res.send(doc);
                });
                //console.log();
            }
            
        },

        getUnavailableTickets:function(req,res){
            //console.log(req.body.date);
            console.log(req.params.date);
            ticketModel.aggregate([{$match:{$or:[{Status:'booked'},{Status:'locked'}]}},
            {$match:{date:new Date(req.params.date)}},
            {$unwind:{path:"$seats"}},
            {$project:{_id:0,row:"$seats.row",number:"$seats.number"}}]
          ).exec( function(err,doc){
            if(err){
                res.status(500).json({error:err});
            }

            res.status(200).json({data:doc});
        });
           // console.log(doc);
            
            
        },

        bookTicket:function(req,res){
            ticketModel.findOne({_id:req.body.ticketId},function(err,doc){
                if(err)
                    console.log(err);
                else{
                    if(doc.Status=="discarded"){
                        res.status(504).json({msg:"Timeout"});
                    }else{
                        ticketModel.findOne({seats:{$exists:true,$in:doc.seats},date:doc.date,$or:[{Status:'booked'}]},function(err,docs){
                            if(err)
                                console.log(err);
                            else
                                if(docs){
                                    res.status(400).json({msg:"Seats are already booked"})
                                }else{
                                    doc.Status="booked";
                                    doc.save(function(err){
                                    if(err)
                                        res.status(500).json({msg:err});
                        
                                    res.status(200).json({docs:doc});
                        
                    });
                                }
                                
                        });
                    }
                    
                }
            });
        }
    };    
})();