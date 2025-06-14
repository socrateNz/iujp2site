import { etapeCand } from '@/data/data'
import React from 'react'

const EtapeCandidature = () => {
    return (

        <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">Processus de candidature</h3>
            <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>
                <div className="space-y-8 relative">
                    {etapeCand.map((step, index) => (
                        <div key={index} className="flex">
                            <div className="flex-shrink-0 relative z-10">
                                <div className="w-16 h-16 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-xl font-bold">
                                    {step.step}
                                </div>
                            </div>
                            <div className="ml-6">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h4 className="font-bold text-[#1B2A4A] mb-2">{step.title}</h4>
                                    <p className="text-gray-600 mb-3">{step.description}</p>
                                    <div className="flex items-center text-[#D4AF37]">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span className="font-medium">{step.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EtapeCandidature
