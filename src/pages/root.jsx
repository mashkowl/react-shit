import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { router } from "../main.jsx";

export default function Root() {
  const location = useLocation();
  const pages = Array.from(router.routes[0].children);

  function isActive(path) {
    return path === location.pathname.substring(1) ? "active" : "";
  }

  return (
    <>
      <section className="sidebar">
        <h1>React simple examples</h1>

        <nav>
          <ul>
            {pages.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={isActive(item.path)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
