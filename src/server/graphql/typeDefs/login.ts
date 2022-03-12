import { gql } from "apollo-server-micro";

export const loginTypeDef = gql`
  type Login {
    token: String
  }

  type Query {
    login(email: String!, password: String!): Login
  }
`;
