import React from 'react'

interface HeadProps {
    title?: string;
    description?: string;
    tag?: string;
}

/**
 * Bannière de page UIJP II — fond dégradé sombre avec titre UPPERCASE Montserrat
 */
const Head = ({ title, description, tag }: HeadProps) => {
    if (!title) return null;
    return (
        <div
            className='relative w-full overflow-hidden flex flex-col gap-4 items-center justify-center text-white py-20 px-4'
            style={{
                background: "linear-gradient(135deg, #011636 0%, #205C03 60%, #0B30BB 100%)",
                minHeight: "220px",
            }}
        >
            {/* Overlay sombre bas */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                {tag && (
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-1"
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                        }}
                    >
                        {tag}
                    </span>
                )}
                <h1
                    className='font-black uppercase text-white text-center'
                    style={{
                        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        lineHeight: 1.05,
                        letterSpacing: "0.03em",
                        maxWidth: "900px",
                        textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                    }}
                >
                    {title}
                </h1>
                {description && (
                    <p
                        className='text-white/75 max-w-2xl text-center text-base md:text-lg leading-relaxed mt-2'
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                        {description}
                    </p>
                )}

                {/* Barre déco gradient */}
                <div
                    className="mt-4 h-1 w-20 rounded-full"
                    style={{ background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.3))" }}
                />
            </div>
        </div>
    )
}

export default Head
