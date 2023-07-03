import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
export const action: ActionFunction = async ({ request }) => {};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center h-screen on-screen">
      <button className="rounded-lg primary-container hover:drop-shadow-lg duration-200 flex flex-row justify-center items-center p-2">
        <p className="">Login with Github</p>
        <img
          src="/github-mark-white.png"
          alt="The Github Invertocat logo"
          className="w-8 m-2"
        ></img>
      </button>
      <Form className="flex-col flex justify-center items-center text-center">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="p-2 m-2 w-auto border-black dark:border-white border-solid border-1 rounded"
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="p-2 m-2"
          required
        ></input>
        <button>Login</button>
      </Form>
    </div>
  );
}
