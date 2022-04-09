import { gql } from "@apollo/client";

const LOGGED_USER_FRAGMENT = gql`
  fragment loggedUser on UserLogin {
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
`;

export const CREATE_USER = gql`
  mutation signUp($input: UserCreate!) {
    createUser(input: $input) {
      ...loggedUser
    }
  }

  ${LOGGED_USER_FRAGMENT}
`;

export const LOGIN_MUTATION = gql`
  mutation singIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...loggedUser
    }
  }

  ${LOGGED_USER_FRAGMENT}
`;
