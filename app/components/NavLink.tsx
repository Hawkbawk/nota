import { Button } from "@mui/material";
import { NavLink } from "@remix-run/react";
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
    <Button href={to} variant="contained" LinkComponent={NavLink}>
      {children}
    </Button>
  );
}
