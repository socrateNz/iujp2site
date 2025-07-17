import React from 'react'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { News, news } from "@/data/data";
import { useRouter } from "next/navigation";

interface GridNewsProps {
  articles?: News[];
}

const GridNews: React.FC<GridNewsProps> = ({ articles }) => {
  const router = useRouter();
  // On utilise les articles passés en props ou les données statiques par défaut
  const data = articles && articles.length > 0 ? articles : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-7 py-10">
      {data.map((article) => {
        console.log(article);
        
        return (
            <Card
              key={article._id}
              className="overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div
                className="h-48 w-full overflow-hidden"
                onClick={() => router.push(`/actualites/${article._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <Badge className="mb-2 w-fit bg-[#34773D]">{article.category}</Badge>
                <h3
                  className="font-bold text-lg mb-2 line-clamp-2"
                  onClick={() => router.push(`/actualites/${article._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500">{article.date}</span>
                  <Button
                    variant="link"
                    className="p-0 h-auto !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => router.push(`/actualites/${article._id}`)}
                  >
                    Lire l'article <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </div>
              </div>
            </Card>
          )
      })}
    </div>
  );
};

export default GridNews;
