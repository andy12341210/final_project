import { gql } from '@apollo/client';

export const ROOM_QUERIES = gql`
  query ($_id:ID!){
    Room(_id:$_id) {
      _id
      }
    }
  }
`;
