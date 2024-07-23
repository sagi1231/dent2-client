import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { globalModalState } from "../state/globalModalState";

const useGlobalEvents = () => {
  const [g, setGlobalModal] = useRecoilState(globalModalState);
  useEffect(() => {
    // window.removeEventListener();
    window.addEventListener("message", (event) => {
      if (event.origin === "https://store.payproglobal.com") {
        console.log("here");
        setGlobalModal("You are now a premium customer!");
      }
    });
  }, [setGlobalModal]);
};

export default useGlobalEvents;
