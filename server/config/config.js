module.exports=(function(){
   var host="localhost";
    var port=1234;
    var mongoPort=27017;
    var dbName="TicketDB";
    return {
        host:host,
        port:port,
        mongoUrl:"mongodb://"+host+":"+mongoPort+"/"+dbName
    };
})();