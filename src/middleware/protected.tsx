import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "../state/userState";
import { validateUserAccess } from "./validateUserAccess";
import { UserRole } from "../core/types/userRole";
import Preloader from "../components/common/Preloader";
import Link from "../components/common/Link";

const Protected: React.FC<{
  children: ReactElement;
  neededRole?: UserRole;
}> = ({ children, neededRole }) => {
  const userSelector = useRecoilValueLoadable(userState);
  const location = useLocation();
  switch (userSelector.state) {
    case "loading":
      return <Preloader />;
    case "hasError":
      return (
        <Navigate
          to={`/login?redirect=${encodeURIComponent(
            location.pathname + location.search
          )}`}
        />
      );
    case "hasValue":
      const user = userSelector.getValue()!!;
      console.log("user", user);

      if (!user.isActive) {
        return <Navigate to={`/complete-signup`} />;
      }

      if (validateUserAccess(user.role, neededRole)) {
        return children;
      }
      return (
        <p>
          You have no access to see this page :( <Link path="/">Home</Link>
        </p>
      );
  }
};
export default Protected;
