"use client"

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader } from "lucide-react";
import { formations } from "@/data/data";

const FormationsSection = () => {

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <section id="formations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">Nos formations</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{"Découvrez notre large éventail de programmes académiques conçus pour vous préparer aux défis professionnels et intellectuels du monde contemporain."}</p>
        </div>
        <Tabs defaultValue="licence" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="licence" className="data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-6">Licence</TabsTrigger>
              <TabsTrigger value="master" className="data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-6">Master</TabsTrigger>
              <TabsTrigger value="doctorat" className="data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-6">Doctorat</TabsTrigger>
              <TabsTrigger value="formation-continue" className="data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white px-6">Formation continue</TabsTrigger>
            </TabsList>
          </div>
          {Object.entries(formations).map(([level, formationsList]) => (
            <TabsContent key={level} value={level} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {formationsList.map((formation, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-[250px] overflow-hidden">
                      <img
                        src={formation.image}
                        alt={formation.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-serif text-[#1B2A4A]">{formation.title}</CardTitle>
                        <Badge className="bg-[#D4AF37]">{formation.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{formation.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        disabled={isPending}
                        onClick={() => startTransition(
                          () => {
                            router.push(`/formations/${formation.id}`)
                          }
                        )}
                        className="w-full bg-[#1B2A4A] hover:bg-[#0F1A30] text-white !rounded-button whitespace-nowrap">
                        {isPending && <Loader className="animate-spin mr-2" size={18} />}
                        {"Détails de la formation"}
                        <i className="fas fa-arrow-right ml-2"></i>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-16 text-center">
          <Button className="bg-[#1B2A4A] hover:bg-[#0F1A30] text-white px-8 py-6 text-lg !rounded-button whitespace-nowrap">
            {"Télécharger notre catalogue complet"}
            <i className="fas fa-download ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;