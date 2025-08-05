import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Filiere } from '@/lib/types'
import { ArrowRight, Calendar, GraduationCap, LucideTimer, Map } from 'lucide-react'
import Link from 'next/link'
// import { Formation } from '@/data/data'
import React from 'react'

// interface Props {
//     formaation: Formation
// }

const Presentation = ({ formation, ecole }: { formation: Filiere | undefined; ecole: string | undefined; }) => {

    function getAnneeScolaire(): number {
        const date = new Date();
        const mois = date.getMonth();
        const annee = date.getFullYear();

        return mois >= 6 ? annee : annee - 1;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-sans font-bold text-[#1B2A4A] mb-6">{"Vue d'ensemble du programme"}</h2>

                <p className="text-xl mb-8 font-light">{formation?.description}</p>

                <div className="bg-gray-50 p-8 rounded-lg mb-10">
                    <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">Objectifs pédagogiques</h3>
                    {/* <ul className="space-y-4">
                        {[
                            "Maîtriser les théories et concepts fondamentaux des relations internationales",
                            "Développer une expertise régionale approfondie (Europe, Asie, Moyen-Orient, Afrique ou Amériques)",
                            "Acquérir des compétences avancées en analyse géopolitique et en résolution de conflits",
                            "Comprendre les mécanismes des organisations internationales et leur rôle dans la gouvernance mondiale",
                            "Perfectionner la pratique de deux langues étrangères dans un contexte professionnel",
                            "Développer des compétences en négociation internationale et en diplomatie"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="mr-3 mt-1 text-[#34773D]">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul> */}
                    <p>{"Les objectifs pédagogiques de notre établissement visent à former des apprenants autonomes, compétents et prêts à relever les défis du monde professionnel. Chaque formation est structurée autour d’un programme rigoureux qui favorise l’acquisition de connaissances solides, le développement de compétences techniques et le renforcement des aptitudes personnelles. Nous encourageons l’esprit critique, la créativité et la capacité à travailler en équipe, tout en mettant l’accent sur l’éthique, la rigueur et l’innovation. Notre ambition est de permettre à chaque étudiant de devenir un acteur engagé, capable de s’adapter, d’évoluer et de contribuer activement à son domaine d’activité."}</p>
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
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <LucideTimer />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Durée</h4>
                                {formation?.duration && <p className="text-gray-600">{` ${formation.duration} ${formation.duration > 1 ? 'ans' : "an"}`} </p>}
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <GraduationCap />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Diplôme</h4>
                                <div className='flex gap-2'>
                                    {formation?.examen.map((x, i) => (
                                        <Badge key={i} className="bg-[#1B2A4A] text-white border border-white px-3 py-1">{x}</Badge>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <Map />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">Lieu</h4>
                                <p className="text-gray-600">{ecole}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">{"Rentrée académique"}</h4>
                                <p className="text-gray-600">Septembre {getAnneeScolaire()}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#34773D]">
                                <i className="fas fa-file-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1B2A4A] text-sm">{"Dépot de candidature"}</h4>
                                <p className="text-gray-600">Avant le 30 Septembre {getAnneeScolaire()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 space-y-4">
                        <Link target='_blank' href="https://docs.google.com/forms/d/e/1FAIpQLScseIhBG54CVcHykTt43ErddcuebewPz2NLNDTd48EWsUeRag/viewform?usp=header">
                        <Button className="w-full bg-[#34773D] hover:bg-[#34773D]/80 text-white !rounded-button whitespace-nowrap">
                            Postuler maintenant
                            <ArrowRight />
                        </Button>
                        </Link>
                            {/* <Button variant="outline" className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white !rounded-button whitespace-nowrap">
                                Demander une documentation
                                <i className="fas fa-file-pdf ml-2"></i>
                            </Button> */}
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-500">Des questions ?</p>
                            <Link href="/contact" className="text-[#34773D] hover:underline font-medium cursor-pointer">Contactez un conseiller</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentation
