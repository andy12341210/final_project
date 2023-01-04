import { gql } from '@apollo/client';

const PLAYER_UPDATE_SUBSCRIPTION = gql`
  subscription playerUpdate($_id:ID!){
    playerUpdate(_id:$_id) {
      _id
      name
      isPrepared
      character
      money
      position
      isStop
    }
  }
`;

const ROOM_UPDATE_SUBSCRIPTION = gql`
subscription roomStateUpdate($_id:ID!){
  roomStateUpdate(_id:$_id) {
    isFull
    isStarted
    playerAmount
    currentDice
    currentPlayer
    mapStatus
  }
}
`

export {PLAYER_UPDATE_SUBSCRIPTION,ROOM_UPDATE_SUBSCRIPTION}