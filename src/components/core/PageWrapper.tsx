import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Route from "../../core/types/route";
import Protected from "../../middleware/protected";
import FadeIn from "../common/FadeIn";
import Preloader from "../common/Preloader";
import IsMobile from "./IsMobile";
import PrivateLayout from "./PrivateLayout";

const PageWrapper: React.FC<{ Route: Route }> = ({ Route }) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const pageTitle = (Route.displayName || "App") + " - Ghostwrite";
    document.title = pageTitle;
  }, [Route.displayName]);

  if (Route.isProtected) {
    return (
      <Protected neededRole={Route.role}>
        {Route.hideGlobalLayout ? (
          <React.Suspense fallback={<Preloader />}>{Route.Page}</React.Suspense>
        ) : (
          <PrivateLayout
            hideSideBar={Route.hideLeftSideBar}
            subMenu={Route.subMenu}
          >
            {Route.Page}
          </PrivateLayout>
        )}
      </Protected>
    );
  } else
    return (
      <React.Suspense fallback={<Preloader />}>{Route.Page}</React.Suspense>
    );
};

export default PageWrapper;
