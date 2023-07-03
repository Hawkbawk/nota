import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import CssBaseline from "@mui/material/CssBaseline";
import type { LoaderArgs, LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import {
  createBrowserClient,
  createServerClient,
} from "@supabase/auth-helpers-remix";
import { useEffect, useMemo, useState } from "react";
import tailwind from "~/tailwind.css";
import type { Database } from "./utils/db_types";
import NavBarLink from "./components/NavLink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  const response = new Response();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json({ env, session }, { headers: response.headers });
};

export default function App() {
  const { env, session } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event !== "INITIAL_SESSION" &&
        session?.access_token !== serverAccessToken
      ) {
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <html lang="en" className="w-full h-full m-0 p-0">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <CssBaseline />
      </head>
      <body
        className="m-0 p-0 box-border h-screen w-screen"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <ThemeProvider theme={theme}>
          <Container maxWidth={false} disableGutters className="w-full h-full">
            <Paper square className="w-full h-full">
              <div className="flex justify-between items-center p-2">
                <div className="flex justify-center">
                  <NavBarLink to="/">Home</NavBarLink>
                  <NavBarLink to="/about">About</NavBarLink>
                </div>

                {serverAccessToken ? (
                  <div>
                    <Link to="/auth/profile">This won't work yet :(</Link>
                    <AccountCircleIcon></AccountCircleIcon>
                  </div>
                ) : (
                  <NavBarLink
                    to="/auth/login"
                    className="flex flex-row items-center"
                  >
                    <p>Login</p>
                    <AccountCircleIcon className="ml-2 w-4"></AccountCircleIcon>
                  </NavBarLink>
                )}
              </div>

              <Outlet context={{ supabase }} />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </Paper>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
