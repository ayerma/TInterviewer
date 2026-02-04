import { JSX, createSignal, Show } from 'solid-js';
import NavigationMenu from './NavigationMenu';
import SpaceSelector from './SpaceSelector';
import Breadcrumb from './Breadcrumb';
import { IconButton, Drawer, AppBar, Toolbar, Typography, Box, Container } from '@suid/material';
import MenuIcon from '@suid/icons-material/Menu';
import CloseIcon from '@suid/icons-material/Close';

interface MainLayoutProps {
  children?: JSX.Element;
}

export default function MainLayout(props: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={menuOpen()}
        onClose={closeMenu}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { width: 320, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Topics
          </Typography>
          <IconButton onClick={closeMenu} edge="end" aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <NavigationMenu onNavigate={closeMenu} />
        </Box>
      </Drawer>

      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Topics
          </Typography>
        </Box>
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <NavigationMenu />
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* App Bar */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open menu"
              onClick={toggleMenu}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <SpaceSelector />
          </Toolbar>
        </AppBar>

        {/* Main content - scrollable */}
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'grey.50' }}>
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Breadcrumb />
            <Box sx={{ mt: 2 }}>
              {props.children}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
