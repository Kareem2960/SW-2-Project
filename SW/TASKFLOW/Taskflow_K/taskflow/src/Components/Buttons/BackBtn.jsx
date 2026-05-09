import { Button } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";
const BackBtn = () => {
  const  naviagte  = useNavigate();
  return (
    <Button
      type="primary"
      icon={<IoMdArrowRoundBack />}
      onClick={() => {
        naviagte(-1);
      }}
    >
      Back
    </Button>
  );
};

export default BackBtn;
