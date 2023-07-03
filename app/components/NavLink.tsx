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
      className={({ isActive }) => {
        if (isActive) {
          return `${defaultClasses}`;
        } else {
          return `${defaultClasses}`;
        }
      }}
      end
    >
      {children}
    </NavLink>
  );
}
