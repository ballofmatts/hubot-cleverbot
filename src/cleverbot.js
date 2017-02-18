// Description:
//   Turns your bot into a snarky little shit
//
// Dependencies:
//   "cleverbot-node": "0.3.3"
//
// Configuration:
//   Environment variable CLEVERBOT_API_KEY needs to be set
//
// Commands:
//   hubot c <input>
//
// Author:
//   lucasvanhalst
var Cleverbot = require("cleverbot-node");

module.exports = function(robot) {
	var cleverbot = new Cleverbot();
	var apiKey = process.env.CLEVERBOT_API_KEY;
	if (!apiKey){
		throw Error('You need to set the CLEVERBOT_API_KEY environment variable.')
	}
	cleverbot.configure({botapi: apiKey})
	return robot.respond(/c (.*)/i, function(msg) {
		var data = msg.match[1].trim();
		cleverbot.write(data, function(response){
			msg.send(response.output);
		});
	});
};
