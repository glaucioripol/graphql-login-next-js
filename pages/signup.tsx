import { useMutation } from "@apollo/client";
import { FormEvent, useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { mutations } from "client/graphql";
import { SignUpData } from "shared/types";

export default function SignUp() {
  const router = useRouter();

  const [executeMutation, { data, loading, error }] = useMutation<SignUpData>(
    mutations.CREATE_USER
  );

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    full_name: "",
    age: "",
    image_url: "",
  });

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;

      const isAge = name === "age";

      const regexToGetJustLetter = /[aA-zZ]/gi;
      const formattedValue = isAge
        ? value.replace(regexToGetJustLetter, "")
        : value;

      setSignUpData((previousData) => ({
        ...previousData,
        [name]: formattedValue,
      }));
    },
    [setSignUpData]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const variables = { input: signUpData };
      executeMutation({ variables });
    },
    [signUpData, executeMutation]
  );

  const redirectToLoggedAreaAfterLogin = useCallback(() => {
    const userIsLogged = data && data.createUser?.authToken;

    if (userIsLogged) {
      Cookies.set("auth-token", userIsLogged, {
        expires: 1,
        sameSite: "strict",
      });

      router.push("/authenticated/profile");
    }
  }, [data, router]);

  useEffect(redirectToLoggedAreaAfterLogin, [redirectToLoggedAreaAfterLogin]);

  if (error) {
    const [currentError] = error.graphQLErrors;

    return <div>Error: {currentError.message || "failed signUp"}</div>;
  }

  return (
    <main className="container">
      <h1>Sign Up</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>

        <input
          className="input"
          type="email"
          name="email"
          id="email"
          minLength={6}
          maxLength={255}
          onChange={handleChange}
          value={signUpData.email}
          disabled={loading}
        />

        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          minLength={8}
          maxLength={128}
          onChange={handleChange}
          value={signUpData.password}
          disabled={loading}
        />

        <label htmlFor="full_name">Full name</label>
        <input
          className="input"
          type="text"
          name="full_name"
          id="full_name"
          minLength={2}
          maxLength={255}
          onChange={handleChange}
          value={signUpData.full_name}
          disabled={loading}
        />

        <label htmlFor="age">Age</label>
        <input
          className="input"
          type="text"
          name="age"
          id="age"
          maxLength={3}
          onChange={handleChange}
          value={signUpData.age}
          disabled={loading}
        />

        <label htmlFor="url">Url</label>
        <input
          className="input"
          type="url"
          name="image_url"
          id="url"
          minLength={12}
          maxLength={500}
          onChange={handleChange}
          value={signUpData.image_url}
          disabled={loading}
        />

        <button className="button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
