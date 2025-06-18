"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { News } from '@/data/data';
import Similaire from './Similaire';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/Home/ContactForm';
import { Calendar, ChevronLeft, LucideTimer } from 'lucide-react';

interface Article {
    article: News
}

const DetailNews = ({ article }: Article) => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="container mx-auto px-4 py-9 flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="w-full lg:w-[70%] pt-4">
                    {/* Article Header */}
                    <article className="bg-white rounded-lg shadow-sm overflow-hidden pt-3">
                        <Button
                            variant="ghost"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                            onClick={() => router.back()}
                        >
                            <ChevronLeft />
                            {"Retour aux articles"}
                        </Button>
                        <div className="px-4">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 gap-4">
                                <span className="flex items-center">
                                    <Calendar size={16} className="mr-1" />
                                    {article.date}
                                </span>
                                <Badge className="cursor-pointer bg-[#34773D]">
                                    {article.category}
                                </Badge>
                                <span className="flex items-center underline">
                                    <LucideTimer size={16} className="mr-1" />
                                    {article.readTime}
                                </span>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="w-full h-[400px] overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="p-6 md:p-8">
                            {/* Navigation */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className='font-bold'>{"Sommaire"}</h3>
                                <p>
                                    {article.description}
                                </p>
                            </div>

                            {/* Article Body */}
                            <div className="prose prose-lg max-w-none">
                                <section id="introduction" className="mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Contenu</h2>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {article.content}
                                    </p>
                                </section>
                            </div>

                            {/* Social Sharing (Mobile) */}
                            {/* <div className="mt-8 lg:hidden">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Partager cet article</h3>
                                <div className="flex space-x-3">
                                    <Button variant="outline" className="flex-1 !rounded-button whitespace-nowrap cursor-pointer">
                                        <i className="fab fa-facebook-f mr-2 text-blue-600"></i> Facebook
                                    </Button>
                                    <Button variant="outline" className="flex-1 !rounded-button whitespace-nowrap cursor-pointer">
                                        <i className="fab fa-twitter mr-2 text-blue-400"></i> Twitter
                                    </Button>
                                    <Button variant="outline" className="flex-1 !rounded-button whitespace-nowrap cursor-pointer">
                                        <i className="fab fa-linkedin-in mr-2 text-blue-700"></i> LinkedIn
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                    </article>

                    {/* Recommended Articles */}
                    <Similaire article={article} />

                    {/* Newsletter (Mobile) */}
                </div>
                <div className="hidden lg:flex lg:flex-col gap-5 fixed top-[60px] right-0 w-[30%] h-fit overflow-y-auto p-4 bg-white shadow-md z-50">
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-4xl font-bold w-full text-center'>{"Contact"}</h1>
                        <p className='w-full text-center'>{"Vous pouvez nous contacter en remplissant le formulaire suivant"}</p>
                    </div>
                    <ContactForm />
                </div>
            </main>
        </div>
    );
};

export default DetailNews;
