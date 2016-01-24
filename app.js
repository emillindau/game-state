var React = require('react');
var GameStateApp = require('./components/GameStateApp.react');

// Get the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, picking up where react left off on the server
React.renderComponent(
    <GameStateApp matches={initialState} />,
    document.getElementById('react-app')
);