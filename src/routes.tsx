import Route from "./core/types/route";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage1";

import { UserRole } from "./core/types/userRole";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";

import AfterLoginPage from "./pages/AfterLoginPage";

import ErrorPage from "./pages/ErrorPage";
import AfterPaymentPage from "./pages/AfterPaymentPage";

const routes: Route[] = [
  {
    path: "/login",
    Page: <LoginPage />,
    displayName: "Login",
  },
  {
    path: "/signup",
    Page: <Signup />,
    displayName: "Signup",
  },

  {
    path: "/reset-password",
    Page: <ResetPassword />,

    displayName: "Reset Password",
  },
  {
    path: "/update-password",
    Page: <UpdatePassword />,
    isProtected: true,

    hideGlobalLayout: true,
    displayName: "Update Password",
  },
  {
    path: "/company/new",
    Page: <LoginPage />,
  },
  {
    path: "/",
    Page: <AfterLoginPage />,
    isProtected: true,
  },
  {
    path: "/websites",
    Page: <Homepage />,
    isProtected: true,
    hideGlobalLayout: true,
    displayName: "My Websites",
  },
  {
    path: "/support",
    Page: <p>עמוד תמיכה</p>,
    isProtected: true,

    displayName: "Support",
  },

  {
    path: "/error",
    Page: <ErrorPage />,
    displayName: "Error",
  },
  {
    path: "*",
    Page: <h1>Oops, this is 404 :(</h1>,
    displayName: "404",
  },
];

export default routes;
