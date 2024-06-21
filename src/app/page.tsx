// src/app/page.tsx
import SimpleBottomNavigation from '@/components/Footer';
import ResponsiveAppBar from '@/components/Navbar';
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <ThemeSwitch />
      <SimpleBottomNavigation/>
    </>
  );
}
