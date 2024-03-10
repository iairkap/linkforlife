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
import { usePathname } from "next/navigation";
import { extractLocaleFromPathName } from "./utils/getLocale";
export default function Home() {

  const pathName = usePathname();
  const extraction = extractLocaleFromPathName(pathName);
  console.log(extraction)

  extraction === "he" ? document.dir = "rtl" : document.dir = "ltr"


  return (
    <main className="general-containerA" style={
      {
      }
    }>
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