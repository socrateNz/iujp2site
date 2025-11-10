"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import KeyFigures from "./KeyFigures";
import AboutSection from "./AboutSection";
import FormationsSection from "./FormationsSection";
import StudentLifeSection from "./StudentLifeSection";
import NewsSection from "./NewsSection";
import ContactSection from "./ContactSection";
import Loading from "../loading";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/admin/articles?published=true", {
        method: "GET",
      });
      const data = await res.json();
      setArticles(data.data.articles);
    };

    fetchArticles();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FormationsSection />
      <StudentLifeSection />
      <NewsSection articles={articles.slice(0, 3)} />
      <KeyFigures />
      <ContactSection />
      <Link target="_blank" href={'https://wa.me/message/42RBUTP466X5I1'} className="fixed md:bottom-[50px] bottom-[20px] md:right-[50px] right-[20px] z-50 flex flex-col items-center justify-center">
        <motion.img
          src="/Images/whatsapp.png"
          alt="Whatsapp"
          className="max-w-[80px] md:max-w-[150px] w-full h-auto aspect-square cursor-pointer object-cover"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
            transition: { duration: 0.2 },
          }}
        />
        <div className=" flec items-center justify-center bg-white px-3 py-1 rounded-md shadow-md">
          <h3 className="text-xl font-serif font-bold text-[#1B2A4A] text-center">
            {"Contactez nous"}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Home;
