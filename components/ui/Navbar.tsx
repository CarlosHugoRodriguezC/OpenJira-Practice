import { MenuOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
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
        <NextLink href={'/'} passHref>
          <Link underline='none' color={'white'}>
            <Typography variant='h6'>Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
