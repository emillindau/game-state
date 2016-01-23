var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    playerid: String
});

schema.statics.getStates = function(callback) {
    State.find({}).exec(function(err, docs) {
        callback(docs);
    });
};

module.exports = State = mongoose.model('State', schema);