import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
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
import { useEffect, useState } from "react";
import tailwind from "~/tailwind.css";
import type { Database } from "./utils/db_types";
import { UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-900 w-screen h-screen bg-cover bg-no-repeat text-slate-100">
        <div className="flex justify-start items-center m-2">
          <Link to="/?index" className="m-2 bg-teal-900">
            Home Page
          </Link>
          {serverAccessToken ? (
            <div>
              <Link to="/auth/profile">This won't work yet :(</Link>
              <UserCircleIcon className="w-6 h-6 m-2 p-2"></UserCircleIcon>
            </div>
          ) : (
            <div className="flex flex-row items-center m-4">
              <Link to="/auth/login">Login</Link>
              <UserPlusIcon className="m-2 w-8"></UserPlusIcon>
            </div>
          )}
        </div>

        <Outlet context={supabase} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
