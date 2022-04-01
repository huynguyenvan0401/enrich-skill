import * as React from 'react';

import { GlobalStyles, Toolbar, CssBaseline, AppBar, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Repositories
          </Typography>
          <nav>
            <Link
              component={RouterLink}
              variant="button"
              color="text.primary"
              to="/repos1"
              underline="none"
              sx={{ my: 1, mx: 1.5 }}
            >
              REPOS1
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="text.primary"
              to="/repos2"
              underline="none"
              sx={{ my: 1, mx: 1.5 }}
            >
              REPOS2
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
}
