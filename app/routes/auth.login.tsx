import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { ActionFunction } from "@remix-run/node";
import { useState } from "react";
export const action: ActionFunction = async ({ request }) => {};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center h-screen on-screen">
      <Button variant="outlined">
        Login with Github
        <picture className="w-8 m-2">
          <source
            srcSet="/github-mark-white.png"
            media="(prefers-color-scheme: dark)"
          ></source>
          <img src="/github-mark.png" alt="The Github Invertocat Logo"></img>
        </picture>
      </Button>
      <TextField
        variant="outlined"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      ></TextField>
      <TextField
        variant="outlined"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></TextField>
    </div>
  );
}
