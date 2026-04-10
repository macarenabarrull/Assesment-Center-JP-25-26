import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WORDS = [
    { text: "Messi", cat: "sports" }, { text: "Maradona", cat: "sports" }, { text: "Mundial", cat: "sports" },
    { text: "Mate", cat: "misc" }, { text: "Viaje", cat: "travel" }, { text: "Estados Unidos", cat: "travel" },
    { text: "Política", cat: "politics" }, { text: "Argentina", cat: "travel" }, { text: "Sueño", cat: "emotions" },
    { text: "Meta", cat: "business" }, { text: "Camino", cat: "emotions" }, { text: "Cambio", cat: "emotions" },
    { text: "Decisión", cat: "emotions" }, { text: "Oportunidad", cat: "business" }, { text: "Desafío", cat: "emotions" },
    { text: "Logro", cat: "business" }, { text: "Intento", cat: "emotions" }, { text: "Error", cat: "emotions" },
    { text: "Equipo", cat: "emotions" }, { text: "Amigo", cat: "emotions" }, { text: "Grupo", cat: "emotions" },
    { text: "Ayuda", cat: "emotions" }, { text: "Apoyo", cat: "emotions" }, { text: "Confianza", cat: "emotions" },
    { text: "Charla", cat: "emotions" }, { text: "Encuentro", cat: "emotions" }, { text: "Risa", cat: "emotions" },
    { text: "Abrazo", cat: "emotions" }, { text: "Trump", cat: "politics" }, { text: "Irán", cat: "politics" },
    { text: "Tini", cat: "music" }, { text: "Cacho Castaña", cat: "music" }, { text: "Mercedes Sosa", cat: "music" },
    { text: "Francia", cat: "travel" }, { text: "Mbappé", cat: "sports" }, { text: "Icardi", cat: "sports" },
    { text: "Moria Casán", cat: "music" }, { text: "Ricardo Fort", cat: "music" }, { text: "Franco Colapinto", cat: "sports" },
    { text: "Fórmula 1", cat: "sports" }, { text: "Ferrari", cat: "sports" }, { text: "Café", cat: "misc" },
    { text: "Fogata", cat: "misc" }, { text: "Guitarra", cat: "music" }, { text: "Piano", cat: "music" },
    { text: "Tenis", cat: "sports" }, { text: "León", cat: "misc" }, { text: "Perro", cat: "misc" },
    { text: "Gato", cat: "misc" }, { text: "Shakira", cat: "music" }, { text: "Bizarrap", cat: "music" },
    { text: "Duki", cat: "music" }, { text: "Nicki Nicole", cat: "music" }, { text: "Coldplay", cat: "music" },
    { text: "Elon Musk", cat: "politics" }, { text: "Jeff Bezos", cat: "politics" }, { text: "Netflix", cat: "politics" },
    { text: "TikTok", cat: "politics" }, { text: "Instagram", cat: "politics" }, { text: "Miami", cat: "travel" },
    { text: "Dubái", cat: "travel" }, { text: "Europa", cat: "travel" }, { text: "Avión", cat: "travel" },
    { text: "Hotel", cat: "travel" }, { text: "Startup", cat: "business" }, { text: "Dinero", cat: "business" },
    { text: "Éxito", cat: "business" }, { text: "Marca", cat: "business" }, { text: "Influencia", cat: "business" },
    { text: "Cliente", cat: "business" }, { text: "Negocio", cat: "business" }, { text: "Venta", cat: "business" },
    { text: "Cierre", cat: "business" }, { text: "Propuesta", cat: "business" }, { text: "Resultado", cat: "business" }
];

const COLORS = [
    '#94a3b8', // Slate
    '#a8a29e', // Stone
    '#9ca3af', // Gray
    '#a1a1aa', // Zinc
];

interface WordItem {
    text: string;
    cat: string;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

export const WordRaffle: React.FC = () => {
    const [wordItems, setWordItems] = useState<WordItem[]>([]);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [status, setStatus] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const init = useCallback(() => {
        const cols = 10;
        const rows = 8;
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;

        const items = WORDS.map((wordObj, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            const x = (col * cellWidth) + (Math.random() * (cellWidth * 0.5) + (cellWidth * 0.25));
            const y = (row * cellHeight) + (Math.random() * (cellHeight * 0.5) + (cellHeight * 0.25));
            
            let baseSize = 0.85;
            if (wordObj.text.length < 5) baseSize = 1.0;
            if (wordObj.text.length > 10) baseSize = 0.75;

            return {
                text: wordObj.text,
                cat: wordObj.cat,
                x,
                y,
                size: baseSize,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                duration: 15 + Math.random() * 10,
                delay: Math.random() * -20
            };
        });

        setWordItems(items);
        setSelectedIndices([]);
        setStatus('');
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    const handleRaffle = async () => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (selectedIndices.length > 0) {
            setStatus("Reiniciando...");
            setSelectedIndices([]);
            await new Promise(r => setTimeout(r, 800));
        }

        setStatus("Sorteando...");
        
        // Select 5 random indices from different categories
        const newSelected: number[] = [];
        const usedCategories = new Set();
        const availableIndices = Array.from({length: WORDS.length}, (_, i) => i);
        
        // Shuffle
        for (let i = availableIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
        }

        for (let i = 0; i < availableIndices.length && newSelected.length < 5; i++) {
            const idx = availableIndices[i];
            const cat = WORDS[idx].cat;
            if (!usedCategories.has(cat)) {
                newSelected.push(idx);
                usedCategories.add(cat);
            }
        }

        // Fallback
        if (newSelected.length < 5) {
            for (let i = 0; i < availableIndices.length && newSelected.length < 5; i++) {
                const idx = availableIndices[i];
                if (!newSelected.includes(idx)) {
                    newSelected.push(idx);
                }
            }
        }

        // Staggered selection
        for (let i = 1; i <= newSelected.length; i++) {
            await new Promise(r => setTimeout(r, 400));
            setSelectedIndices(newSelected.slice(0, i));
        }

        setStatus("");
        setIsAnimating(false);
    };

    const positions = [
        { x: 50, y: 30 }, // Top
        { x: 25, y: 50 }, // Left
        { x: 75, y: 50 }, // Right
        { x: 40, y: 70 }, // Bottom Left
        { x: 60, y: 70 }  // Bottom Right
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6 relative overflow-hidden bg-[#fcfdfe]">
            {/* Mesh Background */}
            <div className="absolute inset-0 -z-10 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.08)_0%,transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.08)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(241,245,249,1)_0%,transparent_100%)] blur-[40px]" />
            </div>

            <div 
                ref={containerRef}
                className="w-full max-w-6xl flex-1 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center justify-center mb-4"
            >
                <div className="absolute top-10 right-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] z-10">
                    {selectedIndices.length > 0 ? `${selectedIndices.length} de 5 seleccionadas` : 'Nube Activa'}
                </div>

                <div className="absolute inset-0 pointer-events-none">
                    {wordItems.map((item, idx) => {
                        const isSelected = selectedIndices.includes(idx);
                        const selectionIdx = selectedIndices.indexOf(idx);
                        const isDimmed = selectedIndices.length > 0 && !isSelected;

                        return (
                            <motion.div
                                key={idx}
                                className={`absolute whitespace-nowrap px-4 py-2 rounded-full font-bold transition-all duration-700 ${
                                    isSelected 
                                    ? 'z-50 bg-indigo-600 text-white shadow-[0_25px_50px_rgba(79,70,229,0.4)] border-2 border-white/40' 
                                    : 'text-slate-400'
                                }`}
                                initial={false}
                                animate={{
                                    left: isSelected ? `${positions[selectionIdx].x}%` : `${item.x}%`,
                                    top: isSelected ? `${positions[selectionIdx].y}%` : `${item.y}%`,
                                    x: isSelected ? '-50%' : '0%',
                                    y: isSelected ? '-50%' : '0%',
                                    scale: isSelected ? 1.5 : isDimmed ? 0.6 : 1,
                                    opacity: isDimmed ? 0.05 : 1,
                                    filter: isDimmed ? 'blur(4px)' : 'blur(0px)',
                                    fontSize: isSelected ? 'clamp(1rem, 4vw, 1.4rem)' : `clamp(0.6rem, 2vw, ${item.size}rem)`,
                                    backgroundColor: isSelected ? '#4f46e5' : 'transparent',
                                    color: isSelected ? '#ffffff' : item.color,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: isSelected ? 100 : 50,
                                    damping: isSelected ? 15 : 20,
                                    duration: 0.8
                                }}
                                style={{
                                    pointerEvents: isAnimating || isDimmed ? 'none' : 'auto'
                                }}
                            >
                                {item.text}
                                {isSelected && (
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 pb-2">
                <div className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] h-4 transition-opacity ${status ? 'opacity-100' : 'opacity-0'}`}>
                    {status}
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRaffle}
                    disabled={isAnimating}
                    className="px-12 py-4 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                    <Sparkles size={16} className={isAnimating ? 'animate-spin' : ''} />
                    {selectedIndices.length > 0 ? 'Sortear de nuevo' : 'Sortear palabras'}
                </motion.button>
            </div>
        </div>
    );
};
