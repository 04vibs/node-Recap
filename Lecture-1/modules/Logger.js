const EventEmitter = require('events');
const emitter = new EventEmitter();


console.log(__filename)
console.log(__dirname)
var url ='http://mylogger.io/log';

class Logger extends EventEmitter{

    log(message) {
        //send an HTTP request
        console.log(message);
    
        //Raise an event
    this.emit('messageLogged',{id:1, url:'http://'})
    
   
    
    }
    
}
module.exports = Logger;