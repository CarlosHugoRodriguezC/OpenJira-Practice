import { MenuOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
// import from '@mui/'

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
        <Typography variant='h6'>Open Jira</Typography>
      </Toolbar>
    </AppBar>
  );
};
