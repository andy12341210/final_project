import { gql } from '@apollo/client';

const CREATE_PLAYER_MUTATION = gql`
  mutation createChatBox($name: String!) {
    createPlayer(name: $name) {
      _id
      name
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($name: String!, $to: String!, $body: String!) {
    createMessage(name: $name, to: $to, body: $body) {
      sender
      to
      body
    }
  }
`;


export {CREATE_PLAYER_MUTATION, CREATE_MESSAGE_MUTATION};