import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/context/AuthProvider';
import { Provider } from 'react-redux';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chef\'s Recipe - Discover and Share Amazing Recipes',
  description: 'Chef\'s Recipe is a platform where chefs and cooking enthusiasts can share and discover a wide variety of recipes. Browse recipes without an account or sign up to share your own!',
  keywords: 'recipes, cooking, food, chefs, share recipes, cooking enthusiasts, food community',
  authors: [{ name: "Dharam-IN", url: "https://github.com/Dharam-IN/chefs-recipe" }],
  openGraph: {
    title: 'Chef\'s Recipe - Discover and Share Amazing Recipes',
    description: 'Join Chef\'s Recipe to explore and share a diverse collection of recipes. Perfect for chefs and cooking enthusiasts alike.',
    url: 'https://github.com/Dharam-IN/chefs-recipe',
    siteName: 'Chef\'s Recipe',
    images: [
      {
        url: '/Images/Logo.png',
        width: 800,
        height: 600,
        alt: 'Chef\'s Recipe Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef\'s Recipe - Discover and Share Amazing Recipes',
    description: 'Explore a wide variety of recipes or share your own on Chef\'s Recipe!',
    site: '@Dharam__IN',
    creator: '@Dharam__IN',
    images: '/Images/Logo.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <StoreProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
          </StoreProvider>
      </body>
    </html>
  );
}
