import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

const useNavigator = () => {
  const navigate = useNavigate();
  const { websiteId } = useParams();

  const internalNavigate = useCallback(
    (path: string, global: boolean = false) => {
      // global param is used to ignore website id (outside website context)
      let fixedPath = path;
      if (!path.startsWith("/")) {
        fixedPath = `/${fixedPath}`;
      }

      if (global || !websiteId) {
        return navigate(fixedPath);
      }

      navigate(`/websites/${websiteId}${fixedPath}`);
    },
    [navigate, websiteId]
  );

  return internalNavigate;
};

export default useNavigator;
