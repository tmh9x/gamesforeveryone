import { Box, Button, IconButton } from "@mui/material";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import React from "react";
import { bgcolor } from "@mui/system";

type Props = {};

const ChatSidebar = (props: Props) => {
  return (
    <Box
      className="sidebar-con"
      bgcolor="gray"
      width={"30%"}
      height={"80vh"}
      borderRight={"solid 1px blue"}
      display={"flex"}
      flexDirection={'column'}
    >
      ChatSidebar
      <Box
        bgcolor="lightcoral"
        width={"100%"}
        height={"5vh"}
        className="sidebar-header-con"
        display={"flex"}
        justifyContent={"end"}
      >
        <IconButton>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        sx={{ margin: "5px", padding: "4px", background: "#595252" }}
      >
        New Chat
      </Button>
    </Box>
  );
};

export default ChatSidebar;
