// import { Formation } from '@/data/data'
import React from 'react'

// interface Props {
//     formation: Formation
// }

const Debouches = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif font-bold text-[#1B2A4A] mb-6">Débouchés professionnels</h2>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {"Le Master en Relations Internationales ouvre la voie à une grande diversité de carrières dans des secteurs variés, tant au niveau national qu'international. Nos diplômés sont particulièrement recherchés pour leur expertise, leur capacité d'analyse et leur maîtrise des langues étrangères."}
                </p>

                <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">{"Secteurs d'activité"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "fas fa-globe-europe",
                                title: "Organisations internationales",
                                examples: ["ONU", "UNESCO", "OMS", "OMC", "OCDE"]
                            },
                            {
                                icon: "fas fa-landmark",
                                title: "Diplomatie et service public",
                                examples: ["Ministères", "Ambassades", "Consulats", "Collectivités territoriales"]
                            },
                            {
                                icon: "fas fa-briefcase",
                                title: "Entreprises multinationales",
                                examples: ["Départements internationaux", "Affaires publiques", "Développement international"]
                            },
                            {
                                icon: "fas fa-hands-helping",
                                title: "ONG et humanitaire",
                                examples: ["Droits humains", "Développement", "Environnement", "Aide humanitaire"]
                            },
                            {
                                icon: "fas fa-university",
                                title: "Recherche et enseignement",
                                examples: ["Think tanks", "Instituts de recherche", "Universités"]
                            },
                            {
                                icon: "fas fa-newspaper",
                                title: "Médias et communication",
                                examples: ["Journalisme international", "Communication institutionnelle", "Édition spécialisée"]
                            }
                        ].map((sector, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <div className="text-[#D4AF37] mb-4">
                                    <i className={`${sector.icon} text-3xl`}></i>
                                </div>
                                <h4 className="font-bold text-[#1B2A4A] mb-3">{sector.title}</h4>
                                <ul className="text-gray-600 text-sm space-y-1">
                                    {sector.examples.map((example, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <div className="mr-2 text-[#1B2A4A]">
                                                <i className="fas fa-chevron-right text-xs"></i>
                                            </div>
                                            <span>{example}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Debouches
