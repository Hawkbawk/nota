import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { ActionFunction } from "@remix-run/node";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useOutletContext } from "@remix-run/react";
import type { AppContext } from "~/globals";
export const action: ActionFunction = async ({ request }) => {};

export default function Login() {
  const { supabase } = useOutletContext<AppContext>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert(`There was an error signing in with Github ${error}`);
    }
  };

  const handleEmailLogin = async () => {
    if (email === "" || password === "") {
      setShowErrors(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(`There was an error signing in with password: ${error}`);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignContent="center">
      <Stack spacing={2} justifyItems="center" alignItems="center">
        <Button variant="contained" onClick={handleGithubLogin}>
          Login with Github
          <img
            src="/github-mark.png"
            alt="The Github Invertocat Logo"
            className="ml-2 p-2 w-10"
          ></img>
        </Button>
        <TextField
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={showErrors}
          helperText={
            email === "" && showErrors ? "Please provide an email" : undefined
          }
        />
        <TextField
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={showErrors}
          helperText={
            password === "" && showErrors
              ? "Please provide a password"
              : undefined
          }
        />
        <Button onClick={handleEmailLogin} variant="contained">
          Login
        </Button>
      </Stack>
    </Box>
  );
}
