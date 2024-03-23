import React from "react";
import { Link, Outlet } from "react-router-dom";

import { router } from "../main.jsx";

export default function Root() {
  const pages = Array.from(router.routes[0].children);

  return (
    <>
      <section id="sidebar">
        <h1>React simple examples</h1>

        <nav>
          <ul>
            {pages.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
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
