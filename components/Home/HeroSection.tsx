"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa";

const HeroSection = () => {
const router = useRouter();
  return (
    <section id="accueil" className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/90 to-transparent z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20prestigious%20university%20campus%20with%20modern%20architecture%2C%20beautiful%20gardens%2C%20students%20walking%20between%20buildings%2C%20soft%20natural%20lighting%2C%20elegant%20academic%20atmosphere%2C%20high-quality%20professional%20photography%2C%20wide%20angle%20view%2C%20clear%20blue%20sky%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape')`
          backgroundImage: `url('/Images/hero.webp')`
        }}
      ></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-[40px] md:text-6xl font-serif font-bold mb-4">{"Université Internationale Jean Paul II de Bafang"}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">{"Excellence académique, innovation et valeurs humanistes pour former les leaders de demain"}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push("/formations")} className="max-w-[260px] w-full cursor-pointer bg-[#34773D] hover:bg-[#34773D]/80 text-white py-6 text-lg !rounded-button whitespace-nowrap">
              {"Découvrir nos formations"}
            </Button>
            <Link href="/catalogue.pdf" target="_blank" rel="noopener noreferrer" className="w-auto">
              <Button variant="outline" className="max-w-[260px] w-full cursor-pointer text-white hover:text-white bg-[#1B2A4A]/80 hover:bg-[#1B2A4A]/30 px-8 py-6 text-lg !rounded-button whitespace-nowrap">
                <FaDownload className="mr-2" />
                {"Télécharger le catalogue"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-20 z-10"></div>
    </section>
  )
};

export default HeroSection;