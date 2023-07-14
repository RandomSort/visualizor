import logo from './logo.svg';
import './App.css';
import Example from './Example';
import Team from './components/Team'

import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    children: [
      {
        path: "team",
        element: <Team />,
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
