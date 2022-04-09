import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";

import { mutations } from "client/graphql";
import { LoginData } from "shared/types";

export default function Index() {
  const router = useRouter();

  const [executeMutation, { data, loading, error }] = useMutation<LoginData>(
    mutations.LOGIN_MUTATION
  );

  const redirectToLoggedAreaAfterLogin = useCallback(() => {
    const userIsLogged = data && data.login?.authToken;

    if (userIsLogged) {
      Cookies.set("auth-token", userIsLogged, {
        expires: 1,
        sameSite: "strict",
      });

      router.push("/authenticated/profile");
    }
  }, [data, router]);

  useEffect(redirectToLoggedAreaAfterLogin, [redirectToLoggedAreaAfterLogin]);

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

  if (error) {
    const [currentError] = error.graphQLErrors;

    return <div>Error: {currentError.message || "failed login"}</div>;
  }

  return (
    <main className="container">
      <h1>Login with graphql</h1>

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
          readOnly={loading}
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
          readOnly={loading}
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
