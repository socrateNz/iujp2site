"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { News } from "@/data/data";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

interface Article {
  articles: News[]
}
const NewsSection = ({ articles }: Article) => {
  const router = useRouter();
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">{"Actualités"}</h2>
          <div className="w-20 h-1 bg-[#34773D] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{"Restez informés des dernières nouvelles, événements et réalisations de notre communauté universitaire."}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-[250px] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-[#1B2A4A]">{article.category}</Badge>
                  <span className="text-sm text-gray-500 flex flex-row items-center gap-1">
                    <Calendar size={16} />
                    {article.date}
                    </span>
                </div>
                <CardTitle className="text-xl font-serif text-[#1B2A4A]">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{article.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                onClick={() => router.push(`/actualites/${article._id}`)}
                 variant="outline" className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white !rounded-button whitespace-nowrap">
                  {"Lire l'article complet"}
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button className="bg-[#1B2A4A] hover:bg-[#0F1A30] text-white !rounded-button whitespace-nowrap">
            Voir toutes les actualités
            <i className="fas fa-newspaper ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;