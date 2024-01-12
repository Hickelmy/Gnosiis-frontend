import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export const MuiDrawer = () => {
  const [isDraweOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton size="large" edge='start' color="inherit" aria-label="logo" onClick={()=> setIsDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDraweOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Menu Lateral
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};
