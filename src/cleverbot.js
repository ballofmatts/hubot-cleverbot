// Description:
//   Turns your bot into a snarky little shit
//   Responds when it sees a set keyword (crow in this example). Set keyword is stripped out of sentence before being sent to cleverbot.
//   Replaces cleverbot's use of the word 'computer' or 'robot' with 'pingas', since it seems to fixate on that topic a lot.
//   Adds random preset emoji face at the end of responses.
//
// Dependencies:
//   "cleverbot-node": "0.3.3"
//
// Configuration:
//   Environment variable CLEVERBOT_API_KEY needs to be set
//
// Commands:
//   any sentence with the word 'crow'
//
// Author:
//   lucasvanhalst
//   ballofmatts
var Cleverbot = require("cleverbot-node");

module.exports = function(robot) {
	var cleverbot = new Cleverbot();
	var apiKey = process.env.CLEVERBOT_API_KEY;
	if (!apiKey){
		throw Error('You need to set the CLEVERBOT_API_KEY environment variable.')
	}
	var crowFaces = Array(':crowbot:',':crowbot1:',':crowbot2:',':crowbot3:',':crowbot4:',':crowbot5:',':crowbot6:',':crowbot7:',':crowbot8:',':crowbot9:');
	cleverbot.configure({botapi: apiKey})
	return robot.hear(/((.*\bcrow\b.*))/i, function(msg) {
		var data = msg.match[1].trim().replace(/\bcrow\b/gi,'');
		var crowFace = crowFaces[Math.floor(Math.random()*crowFaces.length)];
		cleverbot.write(data, function(response){
			msg.send(response.output.replace(/\bcomputer|robot\b/gi,'pingas') + crowFace);
		});
	});
};
