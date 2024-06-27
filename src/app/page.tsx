'use client'; // Add this directive

import { Footer } from "@/components/Footer";
import HeroSection from "@/components/Home/Hero";
import Navbar from "@/components/Navbar";
import Recipes from "@/components/common/Recipes";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection/>
      <Recipes/>
    </>
  );
}
