// src/components/ThemeSwitch.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
};

export default ThemeSwitch;
