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
import Overview from "./pages/websitePages/Overview";
import AutomaticWriterTabsNav from "./components/website/AutomaticWriterTabsNav";
import UserPreferences from "./pages/websitePages/UserPreferences";
import BamUpdates from "./components/bam/Updates";
import MalshabBamGrid from "./components/bam/BamGrid";

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
    path: "/overview/bam",
    Page: <BamUpdates />,
    isProtected: true,
    displayName: "Writer Scheduler",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/overview/bam/managment",
    Page: <>bam managment</>,
    isProtected: true,
    displayName: "Writer Scheduler",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/overview/bam/status",
    Page: <MalshabBamGrid />,
    isProtected: true,
    displayName: "Writer Scheduler",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/overview/bam/logs",
    Page: <BamUpdates />,
    isProtected: true,
    displayName: "בם - עדכונים",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/overview/bam/dashboard",
    Page: <>bam dashboard</>,
    isProtected: true,
    displayName: "בם - דאשבורד",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/overview/tornado",
    Page: <>מערבל שחקים</>,
    isProtected: true,
    displayName: "טורנדו",
  },
  {
    path: "/overview/questions",
    Page: <>שאלונים</>,
    isProtected: true,
    displayName: "טורנדו",
  },
  {
    path: "/",
    Page: <AfterLoginPage />,
    isProtected: true,
  },

  {
    path: "/overview/",
    Page: <Overview />,
    isProtected: true,
    displayName: "Website Overview",
  },
  {
    path: "/overview/user-settings",
    Page: <UserPreferences />,
    isProtected: true,
    displayName: "Website Overview",
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
