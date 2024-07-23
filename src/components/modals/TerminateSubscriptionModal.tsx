import { Dialog } from "primereact/dialog";
import Button from "../common/form/Button";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { subscriptionService } from "../../core/services/subscription.service";
import { useState } from "react";
import { userState } from "../../state/userState";
import { toast } from "react-toastify";

interface Props {
  onHide: () => void;
  onSubmit: () => void;
}

const StyledButton = styled(Button)`
  width: fit-content;
`;

const TerminateSubscriptionModal: React.FC<Props> = ({ onHide, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUserState] = useRecoilState(userState);
  const onSubmitInternal = async () => {
    setIsLoading(true);
    try {
      await subscriptionService.cancelSubscription();

      setUserState({
        ...user!,
        company: {
          ...user.company,
          Subscription: {
            ...user.company.Subscription,
            isActive: false,
          },
        },
      });

      toast("Subscription was terminated successfully", {
        type: "success",
      });

      onSubmit();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      modal
      visible
      header="Cancel Your Subscription"
      onHide={onHide}
      footer={
        <StyledButton loading={isLoading} primary onClick={onSubmitInternal}>
          Terminate Subscription
        </StyledButton>
      }
    >
      <p>Are you sure you wish to terminate your subscription?</p>
      <small>
        We are sorry to see you leave. if you have any requests please don't
        hesitate to contact us at{" "}
        <a target="_blank" href="mailto:admin@ghostwrites.ai">
          admin@ghostwrites.ai
        </a>
      </small>
    </Dialog>
  );
};

export default TerminateSubscriptionModal;
