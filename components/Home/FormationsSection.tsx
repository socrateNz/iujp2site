"use client"

import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
import { formations } from "@/data/data";
import Link from "next/link";
import FormationGrid from "./FormationGrid";

const FormationsSection = () => {

  const router = useRouter();

  return (
    <section id="formations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">Nos formations</h2>
          <div className="w-20 h-1 bg-[#34773D] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{"Découvrez notre large éventail de programmes académiques conçus pour vous préparer aux défis professionnels et intellectuels du monde contemporain."}</p>
        </div>
        <Tabs defaultValue="licence" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 max-w-[350px] gap-0 px-0">
              <TabsTrigger value="bts" className="cursor-pointer data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-2">BTS</TabsTrigger>
              <TabsTrigger value="licence" className="cursor-pointer data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-2">Licence</TabsTrigger>
              <TabsTrigger value="master" className="cursor-pointer data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-2">Master</TabsTrigger>
              <Button onClick={() => router.push("/formations")} variant={'ghost'} className="cursor-pointer">{"Toutes les formation"}</Button>
            </TabsList>
          </div>
          {Object.entries(formations).map(([level, formationsList]) => (
            <TabsContent key={level} value={level} className="mt-0">
              <FormationGrid formationsList={formationsList.slice(0,3)} />
            </TabsContent>
          ))}
        </Tabs>
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