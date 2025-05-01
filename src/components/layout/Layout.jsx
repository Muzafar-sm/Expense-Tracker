import { Box, Container, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, setMode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(to bottom right, #f3e5f5, #e3f2fd)'
          : 'linear-gradient(to bottom right, #1a1a1a, #311b92)',
      }}
    >
      <Navbar setMode={setMode} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: 250,
              flexShrink: 0,
            }}
          >
            <Sidebar />
          </Box>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;