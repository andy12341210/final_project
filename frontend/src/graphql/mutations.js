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


export {CREATE_PLAYER_MUTATION, JOIN_ROOM_MUTATION,UPDATE_PLAYERS_MUTATION,LEAVE_ROOM_MUTATION};