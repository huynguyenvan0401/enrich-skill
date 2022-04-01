import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Container, Link } from '@mui/material';
import Header from 'components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{
              marginBottom: 2,
            }}
          >
            Sorry, the page that you are finding is not available on our system.
          </Typography>
          <Link href="/repos1" variant="body2">
            Back to Home
          </Link>
        </Box>
      </Container>
    </>
  );
}
