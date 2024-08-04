import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import Preloader from "../components/common/Preloader";

const AfterLoginPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const websiteId = localStorage.getItem("websiteId");

    // const savedWebsite =
    //   websites.find((w) => w.id === websiteId) || websites[0];

    // if (!websites.length) {
    //   return navigate(`/websites/new?hideExit=true`);
    // }

    // return navigate(`/websites/${savedWebsite.id}/`);
  }, [navigate]);

  return <Preloader />;
};

export default AfterLoginPage;
