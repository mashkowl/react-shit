import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './css/index.scss';
import Root from "./pages/root.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import WeatherPage from "./pages/weather/WeatherPage.jsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        name: 'Weather widget',
        path: 'weather',
        element: <WeatherPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);