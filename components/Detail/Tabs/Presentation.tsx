import { Button } from '@/components/ui/button'
// import { Formation } from '@/data/data'
import React from 'react'

// interface Props {
//     formaation: Formation
// }

const Presentation = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif font-bold text-[#1B2A4A] mb-6">{"Vue d'ensemble du programme"}</h2>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {"Le Master en Relations Internationales de l'Institut Universitaire Jean-Paul II offre une formation d'excellence pour comprendre et analyser les dynamiques complexes qui façonnent le monde contemporain. Ce programme interdisciplinaire combine des approches théoriques et pratiques pour former les futurs experts et décideurs dans le domaine des relations internationales."}
                </p>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                   {"Grâce à un corps professoral composé d'universitaires renommés et de praticiens expérimentés, les étudiants bénéficient d'un enseignement de haut niveau ancré dans les réalités du terrain. Le programme met l'accent sur l'acquisition de compétences analytiques, linguistiques et interculturelles essentielles pour évoluer dans un environnement international."}
                </p>

                <div className="bg-gray-50 p-8 rounded-lg mb-10">
                    <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">Objectifs pédagogiques</h3>
                    <ul className="space-y-4">
                        {[
                            "Maîtriser les théories et concepts fondamentaux des relations internationales",
                            "Développer une expertise régionale approfondie (Europe, Asie, Moyen-Orient, Afrique ou Amériques)",
                            "Acquérir des compétences avancées en analyse géopolitique et en résolution de conflits",
                            "Comprendre les mécanismes des organisations internationales et leur rôle dans la gouvernance mondiale",
                            "Perfectionner la pratique de deux langues étrangères dans un contexte professionnel",
                            "Développer des compétences en négociation internationale et en diplomatie"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="mr-3 mt-1 text-[#D4AF37]">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 sticky top-24">
                    <div className="p-6 bg-[#1B2A4A] text-white">
                        <h3 className="text-xl font-serif font-bold mb-2">Informations clés</h3>
                        <p className="text-gray-200 text-sm">Tout ce que vous devez savoir sur cette formation</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Durée</h4>
                                <p className="text-gray-600">2 ans (4 semestres)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Diplôme</h4>
                                <p className="text-gray-600">Master en Relations Internationales</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Lieu</h4>
                                <p className="text-gray-600">Campus principal, Paris</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-language"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">{"Langues d'enseignement"}</h4>
                                <p className="text-gray-600">Français (60%), Anglais (40%)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-users"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Effectif</h4>
                                <p className="text-gray-600">25 étudiants par promotion</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Rythme</h4>
                                <p className="text-gray-600">Temps plein ou alternance</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-euro-sign"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Frais de scolarité</h4>
                                <p className="text-gray-600">8 500 € par an</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Rentrée</h4>
                                <p className="text-gray-600">Septembre 2025</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#D4AF37]">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Candidature</h4>
                                <p className="text-gray-600">Avant le 30 avril 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 space-y-4">
                        <Button className="w-full bg-[#D4AF37] hover:bg-[#B59020] text-white !rounded-button whitespace-nowrap">
                            Candidater maintenant
                            <i className="fas fa-arrow-right ml-2"></i>
                        </Button>
                        <Button variant="outline" className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white !rounded-button whitespace-nowrap">
                            Demander une documentation
                            <i className="fas fa-file-pdf ml-2"></i>
                        </Button>
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-500">Des questions ?</p>
                            <a href="#contact" className="text-[#D4AF37] hover:underline font-medium cursor-pointer">Contactez un conseiller</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentation
