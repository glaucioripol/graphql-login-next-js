import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { mutations } from "client/graphql";
import { cookies } from "client/services";

import { CookiesKeys, LoginData } from "shared/types";
import { appStateContext } from "client/state";

export default function Index() {
  const { dispatch, actions } = useContext(appStateContext);
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [executeMutation, { data, loading, error }] = useMutation<LoginData>(
    mutations.LOGIN_MUTATION
  );

  const redirectToLoggedAreaAfterLogin = useCallback(() => {
    const userToken = data && data.login?.authToken;

    if (userToken) {
      dispatch(actions.setLoggedIn(data.login));
      cookies.set(CookiesKeys.AUTH_TOKEN, userToken);

      router.push("/authenticated/profile");
    }
  }, [data, router, dispatch, actions]);

  useEffect(redirectToLoggedAreaAfterLogin, [redirectToLoggedAreaAfterLogin]);

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
