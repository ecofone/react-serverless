import React from "react";

export const UserMenu: React.FC = () => {
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
          Login
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a className="dropdown-item text-center" href="#">
              Profile
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};
