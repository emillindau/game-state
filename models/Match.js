var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    playerid: String,
    name: String,
    mode: String,
    round: Number,
    team_ct_score: Number,
    team_t_score: Number
});

schema.statics.getMatches = function(callback) {
    Match.find({}).exec(function(err, docs) {
        callback(docs);
    });
};

module.exports = Match = mongoose.model('Match', schema);