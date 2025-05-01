import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  useTheme,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const Navbar = ({ setMode }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleColorMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          ExpenseTracker
        </Typography>

        <Stack direction="row" spacing={2}>
          <IconButton 
            color="inherit" 
            onClick={toggleColorMode}
            sx={{
              background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #7b1fa2 30%, #303f9f 90%)',
              },
            }}
          >
            {theme.palette.mode === 'dark' ? <LightIcon /> : <DarkIcon />}
          </IconButton>

          <Button
            color="inherit"
            onClick={handleMenu}
            endIcon={
              <Box
                component="span"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                U
              </Box>
            }
          >
            Profile
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;