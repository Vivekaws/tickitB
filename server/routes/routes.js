module.exports=(function(){
    var express=require('express');
    var ticket=require('./../DBProc/ticket');
    var router=express.Router();
    
    router
    .post('/bookTicket',ticket.bookTicket)
    .post('/lockSeat',ticket.lockSeats)
    .get('/getUnavailableSeats/:date',ticket.getUnavailableTickets);
    return router;
})();








