import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import BookAppointment from "../pages/BookAppointment/BookAppointment";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/book-appointments",
        element: <BookAppointment></BookAppointment>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
