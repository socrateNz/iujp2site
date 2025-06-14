"use client";

import React from 'react'
import HeroSection from './HeroSection'
import KeyFigures from './KeyFigures'
import AboutSection from './AboutSection'
import FormationsSection from './FormationsSection'
import StudentLifeSection from './StudentLifeSection'
import NewsSection from './NewsSection'
import ContactSection from './ContactSection'

const Home = () => {
    return (
        <div>
            <HeroSection />
            <KeyFigures />
            <AboutSection />
            <FormationsSection />
            <StudentLifeSection />
            <NewsSection />
            <ContactSection />
        </div>
    )
}

export default Home
