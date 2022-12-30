import { gql } from '@apollo/client';

export const ROOM_QUERIES = gql`
  query Room($_id:ID!){
    Room(_id:$_id) {
      _id
      players{
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
