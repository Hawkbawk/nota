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
  const defaultClasses = `rounded hover:underline duration-100 p-2 m-2 ${className}`;

  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) => {
        if (isActive) {
          return `${defaultClasses} bg-secondary`;
        } else {
          return `${defaultClasses} bg-primary`;
        }
      }}
      end
    >
      {children}
    </NavLink>
  );
}
