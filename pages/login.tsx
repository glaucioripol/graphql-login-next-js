import { FormEvent, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

import { UserLogged } from "shared/types";
import { mutations } from "client/graphql";

type LoginData = { login: UserLogged };

export default function Login() {
  const [executeMutation, { data, loading, error }] = useMutation<LoginData>(
    mutations.LOGIN_MUTATION
  );

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;

      setLoginData((previousData) => ({ ...previousData, [name]: value }));
    },
    [setLoginData]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      executeMutation({ variables: loginData });
    },
    [executeMutation, loginData]
  );

  return (
    <main className="container">
      <h1>Login with graphql</h1>
      <pre>
        <code>{JSON.stringify(data?.login.email, null, 2)}</code>
      </pre>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          aria-label="write your email"
          autoComplete="off"
          tabIndex={1}
          value={loginData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          aria-label="write your password"
          tabIndex={2}
          value={loginData.password}
          onChange={handleChange}
        />

        <button
          className="button"
          aria-label="Button to submit your data"
          tabIndex={3}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </main>
  );
}
