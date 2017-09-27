import React from 'react';
import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players, calculatePlayersPositions} from './../imports/api/players';
import App from './../imports/ui/App';


Meteor.startup( () => {
  Tracker.autorun(() => {
    let players = Players.find({}, {sort: {score: -1}}).fetch();
    let positionedPlayers = calculatePlayersPositions(players);
    let title = 'Ranking Score';
    ReactDom.render(<App title={title} players={positionedPlayers}/>, document.getElementById('app'));
  });
});
