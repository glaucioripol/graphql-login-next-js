import { FormEvent } from "react";

export default function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
        />

        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          aria-label="write your password"
          tabIndex={2}
        />

        <button
          className="button"
          aria-label="Button to submit your data"
          tabIndex={3}
        >
          Login
        </button>
      </form>
    </main>
  );
}
