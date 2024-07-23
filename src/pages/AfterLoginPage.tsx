import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { websitesStateSelector } from "../state/websitesState";
import { useNavigate } from "react-router";
import Preloader from "../components/common/Preloader";

const AfterLoginPage: React.FC = () => {
  const websites = useRecoilValue(websitesStateSelector);
  const navigate = useNavigate();
  useEffect(() => {
    const websiteId = localStorage.getItem("websiteId");

    const savedWebsite =
      websites.find((w) => w.id === websiteId) || websites[0];

    if (!websites.length) {
      return navigate(`/websites/new?hideExit=true`);
    }

    return navigate(`/websites/${savedWebsite.id}/`);
  }, [navigate, websites]);

  return <Preloader />;
};

export default AfterLoginPage;
