import React from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import Player from './Player';

export default class PlayerList extends React.Component{
    renderPlayers() {
        let playerList = this.props.players;
        if (playerList.length === 0) {
            return(
                <div className="item">
                    <p className="item__message">Add your first player to get started.</p>
                </div>
            );
        } else {
            return playerList.map((player) => {
                return <Player key={player._id} player={player}/>;
            });
        }
    }

    render() {
        return(
            <div>
                <FlipMove maintainContainerHeight={true} easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
                    {this.renderPlayers()}
                </FlipMove>
            </div>
        );
    }
}

PlayerList.PropTypes = {
    players: PropTypes.array.isRequired
};
