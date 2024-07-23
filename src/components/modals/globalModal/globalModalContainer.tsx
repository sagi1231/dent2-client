import { Dialog } from "primereact/dialog";
import { useRecoilState } from "recoil";
import { globalModalState } from "../../../state/globalModalState";

const GlobalModalContainer: React.FC = () => {
  const [globalModal, setGlobalModal] = useRecoilState(globalModalState);
  return (
    <>
      {globalModal && (
        <Dialog visible onHide={() => setGlobalModal(null)} modal>
          <h2>{globalModal}</h2>
        </Dialog>
      )}
    </>
  );
};

export default GlobalModalContainer;
