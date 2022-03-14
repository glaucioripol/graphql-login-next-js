import { gql } from "apollo-server-micro";

export const UserTypeDef = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    profile: Profile!
  }

  type Profile {
    id: ID!
    age: Int!
    full_name: String!
    image_url: String!
  }

  input UserCreate {
    email: String!
    password: String!
    full_name: String!
    age: Int!
    image_url: String!
  }

  type Query {
    userProfile(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(input: UserCreate): User
    login(email: String!, password: String!): User
  }
`;