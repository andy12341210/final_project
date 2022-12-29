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
        money
        position
      }
    }
  }
`;


export {CREATE_PLAYER_MUTATION, JOIN_ROOM_MUTATION};