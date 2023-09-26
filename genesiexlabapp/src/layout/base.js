import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { ThemeProvider } from '@mui/system';
import { Paper, Container } from '@mui/material';
import { Mui_custom_theme } from './mui_custom_theme';


export const Layout =  ({children}) => {

  return(
    <div>
      <ThemeProvider theme={Mui_custom_theme}>
        <header>
          <Header />
        </header>

        <Paper square elevation={0} >
          <main>
            <Container maxWidth = "lg">
              {children}
            </Container>
          </main>
        </Paper>

        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </div>
  )
}