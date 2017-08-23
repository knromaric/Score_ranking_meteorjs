import React from 'react';
import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Players} from './../imports/api/player';

// function thats converts js object into jsxml
const renderPlayers =  (playersList) => {
  return playersList.map((player) => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} point(s) .

         <button onClick={() => {
           Players.update({_id: player._id},{$inc:{score:+1}});
         }} >+1</button>

         <button onClick={() => {
           Players.update({_id: player._id},{$inc:{score:-1}});
         }} >-1</button>

         <button onClick={() => Players.remove({_id: player._id})}>X</button>
       </p>
     );
  });
};

const handleSubmit =  (e) => {
  var playerName = e.target.playerName.value;
  e.preventDefault();

  if(playerName){
    e.target.playerName.value = '';
    Players.insert({
      name: playerName,
      score: 0
    });
  }
};

Meteor.startup( () => {
  Tracker.autorun(() => {
    var players = Players.find().fetch();
    var title = 'Ranking Score';
    var jsx = (
      <div>
        <h1> {title} </h1>
        {renderPlayers(players)}
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player name"/>
          <button>Add player</button>
        </form>
      </div>
    );
    ReactDom.render(jsx, document.getElementById('app'));
  });
  //Players.remove({_id: "7byc7goX3YcNkexzz"});



});
