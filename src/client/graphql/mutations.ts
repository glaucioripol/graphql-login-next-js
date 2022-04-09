import { gql } from "@apollo/client";

// const LOGGED_USER_FRAGMENT = gql`
//   interface LoggedUser {
//     id: ID!
//   }

//   fragment LoggedUser on User {
//     authToken
//     id
//     email
//     profile {
//       id
//       age
//       full_name
//       image_url
//     }
//   }
// `;

// const CREATE_USER = gql`
//   mutation createUser($input: CreateUserInput!) {
//     createUser(input: $input) {
//       email
//       password
//       full_name
//       age
//       image_url
//     }
//   }
// `;

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

// export const PERSIST_USER_MUTATION = gql`
//   mutation persistUser($input: PersistUserInput!) {
//     persistUser(input: $input) {}
//   }
// `;
