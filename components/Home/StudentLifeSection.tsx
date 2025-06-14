"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { activities, testimonials } from "@/data/data";
import Autoplay from "embla-carousel-autoplay";

const StudentLifeSection = () => {


    return (
        <section id="vie-etudiante" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">{"Vie étudiante"}</h2>
                    <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
                    <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{"Découvrez la richesse de la vie sur notre campus, où l'apprentissage se poursuit bien au-delà des salles de cours."}</p>
                </div>

                <div className="mb-16">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {activities.map((activity, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="h-[300px] overflow-hidden">
                                            <img
                                                src={activity.image}
                                                alt={activity.title}
                                                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-serif font-bold text-[#1B2A4A] mb-3">{activity.title}</h3>
                                            <p className="text-gray-600">{activity.description}</p>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">{"Témoignages d'étudiants"}</h3>
                        <ScrollArea className="h-[400px] rounded-md border p-6 bg-white">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="mb-8 pb-8 border-b last:border-b-0">
                                    <div className="flex items-start mb-4">
                                        <Avatar className="h-12 w-12 mr-4">
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-[#1B2A4A]">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.program}, {testimonial.year}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">{testimonial.testimonial}</p>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                    <div className="relative">
                        <img
                            src="https://readdy.ai/api/search-image?query=Beautiful%20university%20campus%20with%20historic%20and%20modern%20buildings%2C%20students%20walking%20between%20classes%2C%20lush%20green%20spaces%2C%20academic%20atmosphere%2C%20sunny%20day%2C%20wide%20angle%20view%2C%20clean%20minimalist%20background&width=600&height=600&seq=26&orientation=squarish"
                            alt="Campus de l'Institut Universitaire Jean-Paul II"
                            className="rounded-lg shadow-xl object-cover w-full h-[500px] object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 to-transparent flex items-end rounded-lg">
                            <div className="p-8 text-white">
                                <h3 className="text-2xl font-serif font-bold mb-2">{"Notre campus"}</h3>
                                <p className="mb-4">{"Un environnement d'apprentissage exceptionnel au cœur de la ville."}</p>
                                <Button className="bg-[#D4AF37] hover:bg-[#B59020] text-white rounded-md">
                                    {"Visite virtuelle"}
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentLifeSection;