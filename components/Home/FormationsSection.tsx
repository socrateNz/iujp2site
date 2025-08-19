"use client"

import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormationGrid from "./FormationGrid";
import Loading from "../loading";
import { Filiere } from "@/lib/types";

const FormationsSection = () => {
  const router = useRouter();
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [examens, setExamens] = useState<string[]>([]);

  useEffect(() => {
    fetchFiliere();
  }, []);

  const fetchFiliere = async () => {
    try {
      const res = await fetch('/api/admin/filieres');
      const data = await res.json();
      const list: Filiere[] = data.data?.filieres || [];

      setFilieres(list);

      // Extraire les examens uniques
      const allExamens = list.flatMap(filiere => filiere.examen);
      const uniqueExamens = Array.from(new Set(allExamens));
      setExamens(uniqueExamens);

      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des filières');
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>{"Une erreur est survenue lors du chargement des données. Veuillez recharger la page."}</div>;

  return (
    <section id="formations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">Nos formations</h2>
          <div className="w-20 h-1 bg-[#34773D] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            {"Découvrez notre large éventail de programmes académiques conçus pour vous préparer aux défis professionnels et intellectuels du monde contemporain."}
          </p>
        </div>

        {examens.length > 0 && (
          <Tabs defaultValue="tous" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100 max-w-[90vw] gap-1 px-2 flex flex-wrap">
                <TabsTrigger key="tous" value="tous" className="cursor-pointer data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-3 py-1">
                  TOUS
                </TabsTrigger>
                {examens.map((examen) => (
                  <TabsTrigger key={examen} value={examen} className="cursor-pointer data-[state=inactive]:text-[#1B2A4A] data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-3 py-1 w-fit">
                    {examen}
                  </TabsTrigger>
                ))}
                {/* <Button onClick={() => router.push("/formations")} variant="ghost" className="cursor-pointer">
                  Toutes les formations
                </Button> */}
              </TabsList>
            </div>

            {/* Tous les filieres */}
            <TabsContent value="tous" className="w-full">
              <FormationGrid formationsList={filieres} />
            </TabsContent>

            {/* Filieres par examen */}
            {examens.map((examen) => {
              const filieresParExamen = filieres.filter(filiere => filiere.examen.includes(examen));
              return (
                <TabsContent key={examen} value={examen} className="w-full">
                  <FormationGrid formationsList={filieresParExamen} />
                </TabsContent>
              );
            })}
          </Tabs>
        )}
        <div className="mt-16 text-center">
          <Link href="/catalogue.pdf" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#1B2A4A] hover:bg-[#0F1A30] text-white px-8 py-6 text-lg !rounded-button whitespace-nowrap">
              {"Télécharger notre catalogue complet"}
              <i className="fas fa-download ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
