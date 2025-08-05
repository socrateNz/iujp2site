import React from 'react'

interface HeadProps {
    title?: string;
    description?: string;
}

const Head = ({ title, description }: HeadProps) => {
    return (
        title && <div className='w-full h-fit bg-[#34773D] flex flex-col gap-7 items-center justify-center text-white py-20'>
            <h1 className='text-5xl font-bold max-w-[1106px] text-center'>{title || "IUJP2 - Institut Universitaire Jean-Paul II"}</h1>
            {/* <p className='mt-2 text-lg max-w-[1106px] text-center'>{description || "Bienvenue à l'Institut Universitaire Jean-Paul II, votre destination pour une éducation de qualité."}</p> */}
        </div>
    )
}

export default Head
