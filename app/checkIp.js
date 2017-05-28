var Poll = require('./models/polls.model');

function checkIp(pollId, ipAddress) {
    return new Promise(function (resolve, reject) {
        
        Poll.findById(pollId, function (err, poll) {
            
            var ipIsNew = poll.votedIp.every(function(ip) { return ip !== ipAddress + pollId });
            if (ipIsNew) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
}

module.exports = checkIp;