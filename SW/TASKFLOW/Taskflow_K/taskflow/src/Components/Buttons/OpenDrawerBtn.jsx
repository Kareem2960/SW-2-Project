// ==================== Ant Design  ====================
import { Button } from "antd";
// ==================== REACT  ====================

import { useState } from "react";
// ==================== Components  ====================

import GeneralDrawer from "../Drawer/GeneralDrawer";

const OpenDrawerBtn = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>

      <GeneralDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default OpenDrawerBtn;
