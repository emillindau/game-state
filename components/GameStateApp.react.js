var React = require('react');

var GameStateApp = React.createClass({
    getInitialState: function(props) {
        props = props || this.props;

        // Set initial application state
        return {
            name: '',
            team: '',
            health: 100,
            armor: 0,
            helmet: false,
            money: 800,
            round_kills: 0,
            round_killhs: 0,
            kills: 0,
            assists: 0,
            deaths: 0,
            mvps: 0,
            score: 0
        };
    },

    componentWillReceiveProps: function(newProps, oldProps) {
        this.setState(this.getInitialState(newProps));
    },

    render() {
        return (
            <div>
                <p>Name:         {this.state.name}</p>
                <p>Team:         {this.state.team}</p>
                <p>Health:       {this.state.health}</p>
                <p>Armor:        {this.state.armor}</p>
                <p>Helmet:       {this.state.helmet}</p>
                <p>Money:        {this.state.money}</p>
                <p>Round kills:  {this.state.round_kills}</p>
                <p>Round Killhs: {this.state.round_killhs}</p>
                <p>Kills:        {this.state.kills}</p>
                <p>Assists:      {this.state.assists}</p>
                <p>Deaths:       {this.state.deaths}</p>
                <p>Mvps:         {this.state.mvps}</p>
                <p>Score:        {this.state.score}</p>
            </div>
        );
    },

    componentDidMount: function() {
        var self = this;

        // Initialize socket.io
        var socket = io.connect();

        socket.on('state', function(data) {
            self.setState({
                name: data.player.name,
                team: data.player.team,
                health: data.player.state.health,
                armor: data.player.state.armor,
                helmet: data.player.state.helmet,
                money: data.player.state.money,
                round_kills: data.player.round_kills,
                round_killhs: data.player.state.round_killhs,
                kills: data.player.match_stats.kills,
                assists: data.player.match_stats.assists,
                deaths: data.player.match_stats.deaths,
                mvps: data.player.match_stats.mvps,
                score: data.player.match_stats.score
            });
        });
    }
});

module.exports = GameStateApp;