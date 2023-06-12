import React, { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types";
import { Link } from "react-router-dom";

const LogIn = () => {
  const { login, currentUser } = useAuthContext() as AuthContextType;

  return (
    <>
      {!currentUser && (
        <button type="button" className="btn btn-warning" onClick={login}>
          Login
        </button>
      )}
    </>
  );
};

const LogOut = () => {
  const { logout, currentUser } = useAuthContext() as AuthContextType;
  return (
    <>
      {" "}
      {currentUser && (
        <button type="button" className="btn btn-danger" onClick={logout}>
          LogOut
        </button>
      )}
    </>
  );
};

export const UserMenu: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;

  const username = useMemo(
    () => currentUser?.displayName || "Profile",
    [currentUser]
  );
  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        className="avatar"
        src={currentUser?.photoURL}
        alt={currentUser?.displayName}
        width="34"
        height="34"
      />
    ) : (
      "Login"
    );
  }, [currentUser]);

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      {" "}
      {/* remove ms-auto */}
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avatar}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a className="dropdown-item text-center" href="#">
              {currentUser && <Link to="/profile">{username}</Link>}
              {!currentUser && <p>{username}</p>}
            </a>
            <li>
              <hr className="dropdown divider"></hr>
            </li>
          </li>
          <div className="d-flex justify-content-center">
            <LogIn />
            <LogOut />
          </div>
        </ul>
      </li>
    </ul>
  );
};
