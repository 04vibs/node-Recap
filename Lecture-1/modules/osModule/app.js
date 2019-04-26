const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: '+ totalMemory);

// Template string
// ES6 / ES2015 : ECMAScript 6 

console.log(`free Memory: ${freeMemory}`);