import { Button } from "@mui/material";
import { Link } from "@remix-run/react";
import type { ReactNode } from "react";

export default function NavBarLink({
  children,
  to,
  className,
}: {
  children: ReactNode;
  to: string;
  className?: string;
}) {
  return (
    // @ts-expect-error The Link component in Remix uses to instead of href
    // While there might be a way to get it to work using forwardRef trickery
    // as shown on the Material UI website, I wasn't having any luck with that.
    <Button to={to} variant="contained" LinkComponent={Link}>
      {children}
    </Button>
  );
}
