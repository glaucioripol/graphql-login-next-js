import { FormEvent } from "react";

export default function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          aria-label="write your email"
          autoComplete="off"
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          aria-label="write your password"
        />
        <button className="button" aria-label="Button to submit your data">
          Login
        </button>
      </form>
    </main>
  );
}
