import { ReactNode } from "react";
import { AppBar, Box, Grid } from "@mui/material";

import glowLogo from "./assets/glow.svg";

type PropsTypes = {
  children: ReactNode;
};

const HeaderHeight = 50;

const Layout = ({ children }: PropsTypes) => (
  <Box>
    <AppBar
      sx={{
        backgroundColor: "white",
        justifyContent: "center",
        color: "text.primary",
        height: HeaderHeight,
        position: "sticky",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <img className="app-logo" src={glowLogo} alt="glow" />
    </AppBar>
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight={`calc(100vh - ${HeaderHeight}px)`}
    >
      {children}
    </Box>
  </Box>
);

export default Layout;
