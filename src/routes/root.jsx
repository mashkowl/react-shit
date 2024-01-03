import { Link, Outlet } from "react-router-dom";
export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React simple examples</h1>
        <nav>
          <ul>
            <li key="weather">
              <Link to={`weather`}>
                Weather page
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet/>
      </div>
    </>
  );
}
