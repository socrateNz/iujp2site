"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { activities, testimonials } from "@/data/data";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const StudentLifeSection = () => {
  return (
    <section id="vie-etudiante" className="py-24" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── En-tête UIJP ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uijp-section-title">
            Vie estudiantine
            <span>sur notre campus</span>
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
          />
          <p
            className="mt-5 text-gray-500 max-w-2xl text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Découvrez la richesse de la vie sur notre campus, où l'apprentissage se poursuit bien
            au-delà des salles de cours.
          </p>
        </motion.div>

        {/* ── Carousel activités ── */}
        <div className="mb-20">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {activities.map((activity, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div
                    className="group h-full bg-white transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    style={{
                      borderLeft: `4px solid ${index % 2 === 0 ? "#205C03" : "#0B30BB"}`,
                      borderBottom: `4px solid ${index % 2 === 0 ? "#0B30BB" : "#E3A402"}`,
                      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                      borderRadius: "2px",
                    }}
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3
                        className="font-bold text-[#2D2F2B] mb-2 uppercase text-sm leading-snug"
                        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.04em" }}
                      >
                        {activity.title}
                      </h3>
                      <p
                        className="text-gray-500 text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex border-2 border-[#205C03] text-[#205C03] hover:bg-[#205C03] hover:text-white" />
            <CarouselNext className="hidden md:flex border-2 border-[#205C03] text-[#205C03] hover:bg-[#205C03] hover:text-white" />
          </Carousel>
        </div>

        {/* ── Témoignages + Campus ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Témoignages */}
          <div>
            <h3
              className="font-bold text-[#2D2F2B] mb-6 uppercase text-xl"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.05em" }}
            >
              Témoignages d'étudiants
            </h3>
            <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2 no-scrollbar">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-5 relative"
                  style={{
                    borderLeft: `4px solid ${index % 2 === 0 ? "#205C03" : "#0B30BB"}`,
                    borderBottom: `4px solid ${index % 2 === 0 ? "#0B30BB" : "#E3A402"}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    borderRadius: "2px",
                  }}
                >
                  <Quote
                    className="absolute top-4 right-4 opacity-10"
                    size={28}
                    style={{ color: "#205C03" }}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-[#205C03]/30">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback style={{ background: "linear-gradient(135deg, #205C03, #0B30BB)", color: "#fff" }}>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4
                        className="font-bold text-[#2D2F2B] text-sm uppercase"
                        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className="text-xs text-gray-400"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {testimonial.program}, {testimonial.year}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-gray-600 text-sm leading-relaxed italic"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    "{testimonial.testimonial}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Campus */}
          <div className="relative">
            <div
              className="overflow-hidden"
              style={{
                borderLeft: "6px solid #205C03",
                borderBottom: "6px solid #0B30BB",
                borderRadius: "2px",
              }}
            >
              <img
                src="/Images/campus.webp"
                alt="Campus UIJP2"
                className="w-full object-cover object-top"
                style={{ height: "480px" }}
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-8"
                style={{
                  background: "linear-gradient(to top, rgba(1,22,54,0.85) 0%, transparent 60%)",
                }}
              >
                <h3
                  className="text-white font-bold uppercase mb-2 text-2xl"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.04em" }}
                >
                  Notre campus
                </h3>
                <p
                  className="text-white/80 mb-5 text-sm"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Un environnement d'apprentissage exceptionnel au cœur de Bafang.
                </p>
                <button className="btn-uijp self-start">
                  Visite virtuelle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLifeSection;