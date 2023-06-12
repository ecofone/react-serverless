import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types";
export const Navigation: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  const { pathname } = useLocation();

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {/* remove all links except HOME */}
      <li className="nav-item">
        <Link
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
          aria-current="page"
          to="/"
        >
          Home
        </Link>
      </li>
      {currentUser && (
        <li className="nav-item">
          <Link
            className={`nav-link ${pathname === "/stocks" ? "active" : ""}`}
            aria-current="page"
            to="/stocks"
          >
            My Images
          </Link>
        </li>
      )}
    </ul>
  );
};
