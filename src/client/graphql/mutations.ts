import { gql } from "@apollo/client";

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
