"use client"

import "./sass/pages/homePage.scss";
import { PrismaClient } from "@prisma/client";
import HeroSection from "./ui/heroSection";
import HomeNavBar from "./ui/homeNavBar";


export default function Home() {





  return (
    <main className="general-container">
      <HomeNavBar />
      <HeroSection />

    </main>
  );
}