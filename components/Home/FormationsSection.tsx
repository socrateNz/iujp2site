"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormationGrid from "./FormationGrid";
import Loading from "../loading";
import { Filiere } from "@/lib/types";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const FormationsSection = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [examens, setExamens] = useState<string[]>([]);

  useEffect(() => {
    fetchFiliere();
  }, []);

  const fetchFiliere = async () => {
    try {
      const res = await fetch("/api/admin/filieres?limit=100");
      const data = await res.json();
      const list: Filiere[] = data.data?.filieres || [];
      setFilieres(list);
      const allExamens = list.flatMap((f) => f.examen);
      const uniqueExamens = Array.from(new Set(allExamens));
      setExamens(uniqueExamens);
      setLoading(false);
    } catch {
      setError("Erreur lors du chargement des filières");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="py-20 text-center text-gray-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
      Une erreur est survenue. Veuillez recharger la page.
    </div>
  );

  return (
    <section id="formations" className="py-24" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── En-tête de section UIJP ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uijp-section-title">
            Nos formations
            <span>qui vous attendent</span>
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
          />
          <p
            className="mt-5 text-gray-500 max-w-2xl text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Découvrez notre large éventail de programmes académiques conçus pour vous préparer aux défis
            professionnels et intellectuels du monde contemporain.
          </p>
        </motion.div>

        {/* ── Onglets de filtres UIJP (pilules colorées) ── */}
        {examens.length > 0 && (
          <Tabs defaultValue="tous" className="w-full">
            {/* Label filtre */}
            <div className="mb-3">
              <span
                className="text-xs font-bold uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
              >
                Filtrer par niveau
              </span>
            </div>

            {/* Liste d'onglets style UIJP */}
            <TabsList
              className="bg-transparent h-auto flex flex-wrap gap-2 mb-10 p-0 justify-start"
            >
              <TabsTrigger
                value="tous"
                className="rounded-none border-2 border-[#2D2F2B] text-[#2D2F2B] font-bold text-xs uppercase tracking-widest px-5 py-2.5
                  data-[state=active]:bg-[#205C03] data-[state=active]:text-white data-[state=active]:border-[#205C03]
                  data-[state=active]:shadow-none hover:border-[#205C03] hover:text-[#205C03] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                }}
              >
                TOUS
              </TabsTrigger>

              {examens.map((examen) => {
                return (
                  <TabsTrigger
                    key={examen}
                    value={examen}
                    className="rounded-none border-2 border-[#2D2F2B] text-[#2D2F2B] font-bold text-xs uppercase tracking-widest px-5 py-2.5
                      data-[state=active]:bg-[#205C03] data-[state=active]:text-white data-[state=active]:border-[#205C03]
                      data-[state=active]:shadow-none hover:border-[#205C03] hover:text-[#205C03] transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    }}
                  >
                    {examen}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="tous" className="w-full">
              <FormationGrid formationsList={filieres} />
            </TabsContent>

            {examens.map((examen) => {
              const filieresParExamen = filieres.filter((f) => f.examen.includes(examen));
              return (
                <TabsContent key={examen} value={examen} className="w-full">
                  <FormationGrid formationsList={filieresParExamen} />
                </TabsContent>
              );
            })}
          </Tabs>
        )}

        {/* ── CTA catalogue ── */}
        <div className="mt-16 text-center">
          <Link
            href="/catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-uijp text-base"
          >
            <Download size={16} />
            Télécharger notre catalogue complet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
