import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: "Error Page",
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);
