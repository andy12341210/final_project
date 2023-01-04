import { gql } from '@apollo/client';

const CREATE_PLAYER_MUTATION = gql`
  mutation createChatBox($name: String!) {
    createPlayer(name: $name) {
      _id
      name
    }
  }
`;

const JOIN_ROOM_MUTATION = gql`
  mutation joinRoom($name: String!,$_id: ID! ) {
    joinRoom( name: $name, _id: $_id) {
      _id
      players {
        _id
        name
        isPrepared
        character
        money
        position
        isStop
      }
    }
  }
`;

const LEAVE_ROOM_MUTATION = gql`
  mutation leaveRoom($pos: Int!,$_id: ID! ) {
    leaveRoom( pos: $pos, _id: $_id) {
      _id
      players {
        _id
        name
        isPrepared
        character
        money
        position
        isStop
      }
    }
  }
`;

const UPDATE_PLAYERS_MUTATION = gql`
  mutation upDatePlayers($players: [PlayersInput!],$_id: ID! ) {
    upDatePlayers( players: $players, _id: $_id) {
      _id
    }
  }
`
const UPDATE_ROOM_MUTATION = gql`
  mutation upDateRoomState($currentPlayer: Int ,$_id: ID! ) {
    upDateRoomState( currentPlayer: $currentPlayer, _id: $_id) {
      isFull
      isStarted
      playerAmount
      currentDice
      currentPlayer
    }
  }
`


export {CREATE_PLAYER_MUTATION, JOIN_ROOM_MUTATION,UPDATE_PLAYERS_MUTATION,LEAVE_ROOM_MUTATION,UPDATE_ROOM_MUTATION};