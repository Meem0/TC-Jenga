import React from 'react';
import PlayerInfo from './PlayerInfo';

function PlayerList(props) {
  const listItems = props.players.map(player =>
    <li key={player.id}>
      <PlayerInfo playerName={player.name} />
    </li>
  );
  return (
    <ul>
    {listItems}
    </ul>
  );
}

export default PlayerList;
