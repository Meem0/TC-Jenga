import React, { Component } from 'react';
import './App.css';
import './PlayerInfo'
import {db, dateToTimestamp} from './firebase';
import update from 'immutability-helper';
import SeasonPane from './SeasonPane';
import TowerPane from './TowerPane';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {players: []};

    this.addPlayer = this.addPlayer.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.toppleTower = this.toppleTower.bind(this);
  }

  render() {
    let currentSeason = this.getCurrentSeason();
    if (currentSeason) {
      Object.assign(
        currentSeason,
        {number: this.state.seasons.length}
      );
    }

    let playerSeasons = currentSeason ? this.getPlayerSeasonsForSeason(currentSeason.id) : [];

    let currentGame = this.getCurrentGame();
    if (currentGame && currentSeason) {
      Object.assign(
        currentGame,
        {number: this.getGamesInSeason(currentSeason.id).length}
      );
    }

    let lastMovePlayer = null;
    if (currentGame) {
      lastMovePlayer = this.getLastMovePlayer(currentGame.id);
    }

    return (
      <div className="App">
        <TowerPane
          toppleTower={this.toppleTower}
          makeMove={this.makeMove}
          addPlayer={this.addPlayer}
          currentGame={currentGame}
          lastMovePlayer={lastMovePlayer}
          players={this.state.players}
        />
        <SeasonPane
          players={this.state.players}
          season={currentSeason}
          playerSeasons={playerSeasons}
        />
      </div>
    );
  }

  addPlayer(name) {
    db.collection('players').add({name: name})
    .then((playerDocRef) => {
      let currentSeason = this.getCurrentSeason();
      if (currentSeason) {
        this.getDocRefById('seasons', currentSeason.id)
        .then(seasonDocRef => {
          db.collection('player_season').add({
            player: playerDocRef,
            season: seasonDocRef,
            tower_points: 0
          });
        });
      }
    });
  }

  toppleTower() {
    let currentGame = this.getCurrentGame();
    if (currentGame) {
      db.collection('games').doc(currentGame.id).set(
        {end_time: dateToTimestamp(new Date())},
        {merge: true}
      );

      let lastMovePlayer = this.getLastMovePlayer(currentGame.id);
      if (lastMovePlayer) {
        let lastMovePlayerSeason = this.state.playerSeasons.find(
          playerSeason => playerSeason.playerId === lastMovePlayer.id
        );
        if (lastMovePlayerSeason) {
          db.collection('player_season').doc(lastMovePlayerSeason.id).set(
            {tower_points: lastMovePlayerSeason.towerPoints + 1},
            {merge: true}
          );
        }
      }
    }

    let currentSeason = this.getCurrentSeason();
    if (currentSeason) {
      this.getDocRefById('seasons', currentSeason.id)
      .then(seasonDocRef => {
        db.collection('games').add({
          season: seasonDocRef,
          start_time: dateToTimestamp(new Date())
        });
      });
    }
  }

  makeMove(playerId) {
    let currentGame = this.getCurrentGame();
    if (currentGame) {
      this.getDocRefById('games', currentGame.id)
      .then(gameDocRef => {
        this.getDocRefById('players', playerId)
        .then(playerDocRef => {
          db.collection('moves').add({
            game: gameDocRef,
            player: playerDocRef,
            time: dateToTimestamp(new Date())
          });
        });
      });
    }
  }

  getElementWithLargestValue(elements, valueName) {
    if (elements && elements.length > 0) {
      return elements.reduce(
        (largestElement, element) => element[valueName] > largestElement[valueName] ? element : largestElement,
        elements[0]
      );
    }
    return null;
  }

  getLastMovePlayer(gameId) {
    let lastMovePlayer = null;
    if (this.state.moves) {
      let movesInGame = this.state.moves.filter(move => move.gameId === gameId);
      let lastMove = this.getElementWithLargestValue(movesInGame, 'time');
      if (lastMove && this.state.players) {
        lastMovePlayer = this.state.players.find(player => player.id === lastMove.playerId);
      }
    }
    return lastMovePlayer;
  }

  getCurrentGame() {
    return this.getElementWithLargestValue(this.state.games, 'startTime');
  }

  getGamesInSeason(seasonId) {
    if (this.state.games) {
      return this.state.games.filter(game => game.seasonId === seasonId);
    }
    return [];
  }
  
  getCurrentSeason() {
    return this.getElementWithLargestValue(this.state.seasons, 'startTime');
  }

  getPlayerSeasonsForSeason(seasonId) {
    if (this.state.playerSeasons) {
      return this.state.playerSeasons.filter(playerSeason => playerSeason.seasonId === seasonId);
    }
    return [];
  }

  getDocRefById(collectionName, id) {
    return new Promise((resolve, reject) => {
      let docRef = db.collection(collectionName).doc(id);
      docRef.get().then(doc => {
        if (doc.exists) {
          resolve(docRef);
        }
        else {
          reject();
        }
      });
    });
  }

  dbToState(docDataToState, collectionName, stateName = '') {
    stateName = stateName.length > 0 ? stateName : collectionName;
    return db.collection(collectionName).onSnapshot(snapshot => {
      let newEntries = [];
      snapshot.forEach(doc => {
        newEntries.push(Object.assign({id: doc.id}, docDataToState(doc.data())));
      });

      this.setState((prevState, props) => ({
        [stateName]: newEntries.map(newEntry => {
          let oldEntry = {};
          if (prevState[stateName]) {
            oldEntry = prevState[stateName].find(oldEntry => oldEntry.id === newEntry.id) || {};
          }
          return update(oldEntry, {$merge: newEntry});
        })
      }));
    });
  }

  componentDidMount() {
    this.unsubscribePlayers = this.dbToState(
      docData => ({
        name: docData.name
      }),
      'players'
    );
    
    this.unsubscribeSeasons = this.dbToState(
      docData => ({
        startTime: docData.start_time.toDate(),
        endTime: docData.end_time.toDate()
      }),
      'seasons'
    );

    this.unsubscribeGames = this.dbToState(
      docData => {
        let result = {
          seasonId: docData.season.id,
          startTime: docData.start_time.toDate()
        };
        if (docData.end_time) {
          Object.assign(result, {
            endTime: docData.end_time.toDate()
          });
        }
        return result;
      },
      'games'
    );

    this.unsubscribeMoves = this.dbToState(
      docData => ({
        gameId: docData.game.id,
        playerId: docData.player.id,
        time: docData.time.toDate()
      }),
      'moves'
    );

    this.unsubscribePlayerSeason = this.dbToState(
      docData => {
        return {
          playerId: docData.player.id,
          seasonId: docData.season.id,
          towerPoints: docData.tower_points
        };
      },
      'player_season',
      'playerSeasons'
    );
  }

  componentWillUnmount() {
    this.unsubscribePlayers();
    this.unsubscribeSeasons();
    this.unsubscribeGames();
    this.unsubscribeMoves();
    this.unsubscribePlayerSeason();
  }
}

export default App;
