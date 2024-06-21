'use client';
import { Inter } from 'next/font/google';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [muiTheme, setMuiTheme] = useState<Theme>(
    createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#3f51b5', // Default primary color
        },
      },
    })
  );


  useEffect(() => {
    setMuiTheme(
      createTheme({
        palette: {
          mode: theme === 'light' ? 'light' : 'dark',
          primary: {
            main: theme === 'light' ? '#3f51b5' : '#121212', // Change color based on theme
          },
        },
      })
    );
  }, [theme]);


  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemesProvider attribute="class">
          <MUIThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
          </MUIThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
};

export default AppLayout;
