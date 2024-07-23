import { Skeleton } from "@mui/material";

const DialogSkeleton = () => {
  return (
    <>
      <Skeleton width="95%" />
      <Skeleton width="100%" className="mt-2" />
    </>
  );
};

export default DialogSkeleton;
