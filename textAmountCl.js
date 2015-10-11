
var textAmount = require('../textAmount');
var args = process.argv.slice(2);

for (var i = 0; i < args.length; i++){
	try {
		console.log(textAmount(Number(args[i])));	
	} catch(e){
		console.log('Error converting value "' + args[i] + '": ' + e.message);
	}
	
}
