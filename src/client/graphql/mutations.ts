import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      password
      full_name
      age
      image_url
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation singIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authToken
      id
      email
      profile {
        id
        age
        full_name
        image_url
      }
    }
  }
`;
