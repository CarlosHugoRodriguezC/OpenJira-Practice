import React, { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import { Navbar } from '../ui/Navbar';
import { Sidebar } from '../ui/Sidebar';

type Props = {
  title?: string;
};

const Layout: FC<PropsWithChildren<Props>> = ({
  title = 'Open Jira',
  children,
}) => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}>
      <Head>
        <title>{title}</title>
      </Head>
      {/* Navbar */}
      <Navbar />
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <Box
        sx={{
          padding: '10px 20px',
        }}>
        {children}
      </Box>
    </Box>
  );
};

export { Layout };
