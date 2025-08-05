"use client";

import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import KeyFigures from './KeyFigures'
import AboutSection from './AboutSection'
import FormationsSection from './FormationsSection'
import StudentLifeSection from './StudentLifeSection'
import NewsSection from './NewsSection'
import ContactSection from './ContactSection'
import Loading from '../loading';

const Home = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('/api/admin/articles?published=true', {
                method: 'GET'
            });
            const data = await res.json();
            setArticles(data.data.articles);
        };

        fetchArticles();
        setLoading(false)
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div>
            <HeroSection />
            <KeyFigures />
            <AboutSection />
            <FormationsSection />
            <StudentLifeSection />
            <NewsSection articles={articles.slice(0,3)} />
            <ContactSection />
        </div>
    )
}

export default Home
