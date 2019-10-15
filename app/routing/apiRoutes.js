var friends = require("../data/friends");
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        var newFriendScores = req.body.scores;
        var friendsArray = [];
        var friendMatch = 0;
        for (var i = 0; i < friends.length; i++) {
            var scoresDiff = 0;
            for (var j = 0; j < newFriendScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
            }
            friendsArray.push(scoresDiff);
        }
        for (var i = 0; i < friendsArray.length; i++) {
            if (friendsArray[i] <= friendsArray[friendMatch]) {
                friendMatch = i;
            }
        }
        var newBestFriend = friends[friendMatch];
        res.json(newBestFriend);
        friends.push(req.body);
    });
};