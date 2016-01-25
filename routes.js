'use strict';

var JSX = require('node-jsx').install(),
    React = require('react'),
    Match = require('./models/Match'),
    ReactDOMServer = require('react-dom/server'),
    GameStateApp = React.createFactory(require('./components/GameStateApp.react'));


const EXAMPLE_DATA = {
        "provider": {
                "name": "Counter-Strike: Global Offensive",
                "appid": 730,
                "version": 13519,
                "steamid": "76561197960574906",
                "timestamp": 1453562301
        },
        "map": {
                "mode": "casual",
                "name": "de_dust2",
                "phase": "live",
                "round": 4,
                "team_ct": {
                        "score": 0
                },
                "team_t": {
                        "score": 4
                }
        },
        "round": {
                "phase": "freezetime"
        },
        "player": {
                "steamid": "76561197960574906",
                "name": "magic twist",
                "team": "T",
                "activity": "textinput",
                "state": {
                        "health": 100,
                        "armor": 100,
                        "helmet": true,
                        "flashed": 0,
                        "smoked": 0,
                        "burning": 0,
                        "money": 8800,
                        "round_kills": 0,
                        "round_killhs": 0
                },
                "weapons": {
                        "weapon_0": {
                                "name": "weapon_knife_karambit",
                                "paintkit": "aq_steel_knife",
                                "type": "Knife",
                                "state": "holstered"
                        },
                        "weapon_1": {
                                "name": "weapon_glock",
                                "paintkit": "gs_glock18_wrathys",
                                "type": "Pistol",
                                "ammo_clip": 20,
                                "ammo_clip_max": 20,
                                "ammo_reserve": 120,
                                "state": "holstered"
                        },
                        "weapon_2": {
                                "name": "weapon_c4",
                                "paintkit": "default",
                                "type": "C4",
                                "state": "active"
                        },
                        "weapon_3": {
                                "name": "weapon_ak47",
                                "paintkit": "cu_panther_ak47",
                                "type": "Rifle",
                                "ammo_clip": 30,
                                "ammo_clip_max": 30,
                                "ammo_reserve": 90,
                                "state": "holstered"
                        },
                        "weapon_4": {
                                "name": "weapon_hegrenade",
                                "paintkit": "default",
                                "type": "Grenade",
                                "ammo_reserve": 1,
                                "state": "holstered"
                        }
                },
                "match_stats": {
                        "kills": 2,
                        "assists": 0,
                        "deaths": 0,
                        "mvps": 2,
                        "score": 7
                }
        },
        "previously": {
                "player": {
                        "activity": "playing"
                }
        },
        "auth": {
                "token": "CCWJu64ZV3JHDT8hZc"
        }
};

module.exports = function(app, io) {
    app.post('/csgo', function(req, res) {

        // Save match in model
        console.log('Received post to /csgo');
        console.log(req.data);

        res.writeHead(200, {'Content-Type': 'text/html'});

        let body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            console.log('POST payload: ' + body);
            res.end();
        });

        // On state data
        io.emit('state', EXAMPLE_DATA);
    });

    app.get('/', function(req, res) {
        Match.getMatches(function(matches) {
            // Render React to a string, passing in our fetched states
            var markup = ReactDOMServer.renderToString(
                GameStateApp({
                    matches: matches
                })
            );

            // Render our 'home' template
            res.render('home', {
                markup: markup, // Pass rendered react markup
                state: JSON.stringify(matches)
            });
        });
    });
}