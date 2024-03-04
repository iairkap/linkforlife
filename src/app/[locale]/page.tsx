"use client"

import "./sass/pages/homePage.scss";
import { PrismaClient } from "@prisma/client";
import HeroSection from "./ui/heroSection";
import HomeNavBar from "./ui/homeNavBar";
import HomePageSectionTwo from "./ui/HomePageSectionTwo";
import HomePageSectionThree from "./ui/homePageSectionThree";
import AboutProduct from "./ui/aboutProduct";
import PersonalizedServiceInvitation from "./ui/personalizedInvitationService";
import Testimonios from "./ui/testimonios";
import Footer from "./ui/footer";

export default function Home() {
  return (
    <main className="general-containerA">
      <HomeNavBar />
      <HeroSection />
      <HomePageSectionTwo />
      <HomePageSectionThree />
      <AboutProduct />
      <PersonalizedServiceInvitation />
      <Testimonios />
      <Footer />
    </main>
  );
}