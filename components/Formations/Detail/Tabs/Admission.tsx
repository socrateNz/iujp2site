import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faqs, programmeAnnee } from '@/data/data'
import React from 'react'
import EtapeCandidature from '../EtapeCandidature'
import DemandeInscription from '../DemandeInscription'
import { FaCheck, FaDownload, FaStar } from 'react-icons/fa'
import ContactForm from '@/components/Home/ContactForm'
import Link from 'next/link'

// interface Props {
//     formation: Formation
// }

const Admission = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif font-bold text-[#1B2A4A] mb-6">{"Admission et coûts"}</h2>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {"Le processus d'admission au Master en Relations Internationales est sélectif et vise à identifier les candidats ayant le potentiel pour réussir dans ce programme exigeant et s'épanouir dans une carrière internationale."}
                </p>

                <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">{"Prérequis et conditions d'admission"}</h3>
                    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                        <h4 className="font-bold text-[#1B2A4A] mb-4">Prérequis académiques</h4>
                        <ul className="space-y-3 mb-6">
                            {[
                                "Licence (Bac+3) en sciences politiques, droit, économie, histoire ou domaine connexe",
                                "Moyenne générale minimale de 12/20 ou équivalent pour les diplômes étrangers",
                                "Maîtrise de l'anglais (niveau B2 minimum) et du français (niveau C1)"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 text-[#34773D]">
                                        <FaCheck className="text-lg" />
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h4 className="font-bold text-[#1B2A4A] mb-4">Qualités et expériences valorisées</h4>
                        <ul className="space-y-3">
                            {[
                                "Intérêt marqué pour les questions internationales et géopolitiques",
                                "Expériences à l'international (études, stages, volontariat)",
                                "Engagement associatif ou citoyen",
                                "Capacités d'analyse et esprit critique",
                                "Ouverture culturelle et aptitude à travailler dans un environnement multiculturel"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 text-[#34773D]">
                                        <FaStar className="text-lg" />
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Etape de candidature */}
                <EtapeCandidature />
                <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">Frais de scolarité 350 000 FCFA</h3>
                    <Link href="/catalogue.pdf" target="_blank" rel="noopener noreferrer">
                        <Button
                            className='bg-[#34773D] hover:bg-[#34773D]/80 text-white px-6 py-5 text-lg !rounded-button whitespace-nowrap'
                        >
                            <FaDownload className="mr-2" />
                            {"Telecharger la brochure"}
                        </Button>
                    </Link>
                </div>
                <ContactForm />
                {/* <DemandeInscription /> */}
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="p-6 bg-[#1B2A4A] text-white">
                        <h3 className="text-xl font-serif font-bold mb-2">Prochaines étapes</h3>
                        <p className="text-gray-200 text-sm">{"Calendrier d'admission 2025-2026"}</p>
                    </div>
                    <div className="p-6 space-y-6">
                        {programmeAnnee.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <div className="mr-3 mt-1 text-[#34773D]">
                                    <i className={item.icon}></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1B2A4A] text-sm">{item.date}</h4>
                                    <p className="text-gray-600 text-sm">{item.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-gray-50">
                        <Button className="w-full bg-[#34773D] hover:bg-[#34773D]/80 text-white !rounded-button whitespace-nowrap">
                            Candidater maintenant
                            <i className="fas fa-arrow-right ml-2"></i>
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="p-6 bg-[#1B2A4A] text-white">
                        <h3 className="text-xl font-serif font-bold mb-2">FAQ Admission</h3>
                        <p className="text-gray-200 text-sm">Questions fréquentes</p>
                    </div>
                    <div className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`faq-${index}`}>
                                    <AccordionTrigger className="text-[#1B2A4A] hover:text-[#34773D] font-medium text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 text-sm">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 bg-[#1B2A4A] text-white">
                        <h3 className="text-xl font-serif font-bold mb-2">Contact admission</h3>
                        <p className="text-gray-200 text-sm">{"Besoin d'aide pour votre candidature ?"}</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <i className="fas fa-user"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Responsable des admissions</h4>
                                <p className="text-gray-600 text-sm">Mme Claire Dubois</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Email</h4>
                                <p className="text-gray-600 text-sm">admissions@uijp2.fr</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Téléphone</h4>
                                <p className="text-gray-600 text-sm">+33 (0)1 23 45 67 89</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Horaires</h4>
                                <p className="text-gray-600 text-sm">Lundi au vendredi: 9h00 - 17h00</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button variant="outline" className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white !rounded-button whitespace-nowrap">
                                Prendre rendez-vous
                                <i className="fas fa-calendar-alt ml-2"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admission
