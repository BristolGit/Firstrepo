import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  IconButton,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import AccountDialog from '../account/AccountDialog';
import './Navbar.css';

const pages = [
  { name: 'Search', to: '/search' },
  { name: 'Contact', to: '/contact' },
  { name: 'FAQ', to: '/faq' },
];

const settings = [
  { name: 'Profile', to: '/profile' },
];

const Navbar = ({loggedIn}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAccountLogout = () => {
    setAnchorElNav(null);
    localStorage.clear();
    window.location = '/';
  };

  const accountDialogSubmit = () => {
    setOpenAccountDialog(false);
    window.location.reload();
  };

  const handleAccountDialogOpen = () => {
    setOpenAccountDialog(true);
  };

  const handleAccountDialogClose = () => {
    setOpenAccountDialog(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'black', zIndex: 5 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MEDBUD
            </Typography>
            <Grid item sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="MedBud Logo"
                  className="invertedLogo"
                />
              </Link>
            </Grid>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {loggedIn && (
                  <a href="/profile">
                    <MenuItem key="Profile" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </a>
                  )
                }
                {pages.map((page) => (
                  <a href={page.to}>
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </a>
                ))}
                <Divider />
                {loggedIn ? (
                  <MenuItem key="logout" onClick={handleAccountLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key="login" onClick={handleAccountDialogOpen}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MEDBUD
            </Typography>
            <Grid item sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="MedBud Logo"
                  className="invertedLogo"
                />
              </Link>
            </Grid>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <a href={page.to}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </a>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {loggedIn ? (
                <>
                  <Tooltip title="Open user">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: 'white', color: 'black' }} src="/default" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <a href={setting.to}>
                        <MenuItem
                          key={setting.name}
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      </a>
                    ))}
                    <Divider />
                    <MenuItem
                      onClick={handleAccountLogout}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={handleAccountDialogOpen}
                  sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <AccountDialog
        isOpen={openAccountDialog}
        onModalSubmit={accountDialogSubmit}
        onClose={handleAccountDialogClose}
      />
    </>
  );
};

export default Navbar;
