import * as React from "react";

import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import GamesIcon from "@mui/icons-material/Games";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const pages: string[] = ["Home", "Insert", "Watch", "Login", "SignUp"];
const settings = ["Profile", "Messages"];

const NavBar = () => {
  const { user, logout, dbUsers } = useAuth();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavMenuClick = (e: string) => {
    setAnchorElUser(null);
    if (e === "Home") {
      router.push(`/`);
    } else if (e === "Insert") {
      router.push(`/game/${e.toLowerCase()}`);
    } else if (e === "Contact") {
      router.push(`/${e.toLowerCase()}`);
    } else if (e === "Messages") {
      router.push(`/user/chat/messages/`);
    } else {
      router.push(`/user/${e.toLowerCase()}`);
    }
    handleCloseNavMenu();
  };

  const handleLogoutClick = () => {
    logout();
    router.push(`/user/login`);
    handleCloseNavMenu();
    handleCloseUserMenu();
  };

  console.log("user?.username: ", dbUsers);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#e63946" }}
      className="appbar"
    >
      <Container maxWidth="xl" className="appbar-con">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            className="appbar-logo"
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(
                (page) =>
                  (user && page !== "Login" && page !== "SignUp" && (
                    <MenuItem
                      key={page}
                      onClick={() => handleNavMenuClick(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )) ||
                  (!user && (page === "Login" || page === "SignUp") && (
                    <MenuItem
                      key={page}
                      onClick={() => handleNavMenuClick(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
              )}

              {user && (
                <MenuItem onClick={handleLogoutClick}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <GamesIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GFE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(
              (page) =>
                //  return (  (user && page !== 'Login' & page !== 'SignUp' ) &&
                (user && page !== "Login" && page !== "SignUp" && (
                  <Button
                    key={page}
                    onClick={(e) => handleNavMenuClick(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                )) ||
                (!user && page !== "Watch" && page !== "Insert" && (
                  <Button
                    key={page}
                    onClick={() => handleNavMenuClick(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))
            )}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={
                      dbUsers?.username
                        ? dbUsers.username.toUpperCase()
                        : user.email.toUpperCase()
                    }
                    src="/broken-image.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleNavMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                {user && (
                  <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
