import React from 'react'

interface HeadProps {
    title?: string;
    description?: string;
}

const Head = ({ title, description }: HeadProps) => {
    return (
        title && <div className='w-full h-[200px] bg-[#34773D] flex flex-col items-center justify-center text-white'>
            <h1 className='text-5xl font-bold'>{title || "IUJP2 - Institut Universitaire Jean-Paul II"}</h1>
            <p className='mt-2 text-lg'>{description || "Bienvenue à l'Institut Universitaire Jean-Paul II, votre destination pour une éducation de qualité."}</p>
        </div>
    )
}

export default Head
