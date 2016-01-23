var JSX = require('node-jsx').install(),
    React = require('react'),
    State = require('./models/State'),
    GameStateApp = require('./components/GameStateApp.react');

module.exports = function(app, io) {
    app.post('/csgo', function(req, res) {

        var data = {
            playerid: 'something'
        };
        // On state data
        io.emit('state', data);
    });

    app.get('/', function(req, res) {
        State.getStates(function(states) {
            // Render React to a string, passing in our fetched states
            var markup = React.renderComponentToString(
                GameStateApp({
                    states: states
                })
            );

            // Render our 'home' template
            res.render('home', {
                markup: markup, // Pass rendered react markup
                state: JSON.stringify(states)
            });
        });
    });
}
