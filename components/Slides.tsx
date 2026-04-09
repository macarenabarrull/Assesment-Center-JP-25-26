import React from 'react';
import { SlideData } from '../constants';
import { 
  Users, Calendar, GraduationCap, FileText, Flag, Heart, 
  BrainCircuit, Zap, ClipboardCheck, PencilRuler, Search, FileSignature, 
  Rocket, BarChart3, Compass, Target, Layers, Sparkles, DollarSign, Briefcase,
  Mail, RotateCcw, Clock, Lightbulb, Quote
} from 'lucide-react';
import { motion } from "framer-motion";

interface SlideProps {
  data: SlideData;
  onPrint?: () => void;
  onJumpToSlide?: (index: number) => void;
}

const IconMap: Record<string, any> = {
  Compass, Target, BrainCircuit, Layers, Zap, ClipboardCheck, Heart, Sparkles,
  Users, DollarSign, Briefcase, Calendar, GraduationCap, FileText, Flag,
  PencilRuler, Search, FileSignature, Rocket, BarChart3, Clock, Lightbulb
};

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 200, damping: 20 } }
};

// --- Reusable Premium Components ---
const OrganicShape: React.FC<{ children: React.ReactNode, bg: string, color: string, className?: string }> = ({ children, bg, color, className = "" }) => (
    <div className={`relative flex items-center justify-center ${bg} ${color} p-5 shadow-xl transition-all duration-700 rounded-[1.5rem] md:rounded-[2rem] ${className} group-hover:scale-110 group-hover:rotate-3`}>
        <div className={`absolute inset-0 ${bg} blur-2xl opacity-30 rounded-full -z-10 animate-pulse`} />
        <div className="absolute inset-0 glass-border rounded-[inherit] pointer-events-none" />
        {children}
    </div>
);

const GlowIcon: React.FC<{ icon: any, color: string, bg: string, size?: number }> = ({ icon: Icon, color, bg, size = 24 }) => (
    <OrganicShape bg={bg} color={color}>
        <div className="relative">
            <Icon size={size} strokeWidth={2.5} className="relative z-10" />
            <Icon size={size} strokeWidth={2.5} className="absolute inset-0 blur-sm opacity-50" />
        </div>
    </OrganicShape>
);

const GlassCard: React.FC<{ children?: React.ReactNode, className?: string, hover?: boolean, theme?: 'light' | 'dark' | 'brand' }> = ({ children, className = "", hover = false, theme = 'light' }) => {
    const themeClasses = {
        light: 'bg-white/70 border-white/80 shadow-sm glass-border',
        dark: 'bg-slate-900/90 border-slate-700/50 shadow-2xl text-white glass-border',
        brand: 'bg-indigo-600/5 border-indigo-500/20 shadow-md glass-border'
    };

    return (
        <div className={`
            backdrop-blur-2xl 
            rounded-2xl md:rounded-3xl
            relative overflow-hidden
            ${themeClasses[theme]}
            ${hover ? 'transition-all duration-500 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-2' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
};

// 1. Cover Slide
export const CoverSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div 
        className="flex flex-col justify-center items-center h-full text-center relative z-10"
        initial="hidden" animate="show" variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-4 relative w-full max-w-4xl px-6">
        <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full scale-150 -z-10" />
        <GlassCard theme={data.theme} className="p-10 md:p-16 flex flex-col items-center border-white shadow-2xl relative overflow-visible">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-indigo-600 rounded-b-full" />
            
            <motion.div 
                layoutId="brand-tag"
                variants={itemVariants} 
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-100 bg-white/80 backdrop-blur-md text-slate-400 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-sm"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                fyo
            </motion.div>
            
            <motion.h1 
                layoutId="slide-title"
                variants={itemVariants} 
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9] font-display uppercase"
            >
                {(data.title || '').split(' ').map((word, i) => {
                    const isJP = word.toUpperCase().includes('JP');
                    return (
                        <span key={i} className={i % 2 === 1 && !isJP ? 'italic text-indigo-600' : ''}>
                            {word}{' '}
                        </span>
                    );
                })}
            </motion.h1>
            
            <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg text-slate-500 font-medium tracking-tight mb-10 max-w-2xl leading-relaxed uppercase"
            >
              {data.subtitle}
            </motion.p>

            {data.content?.tags && (
              <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-3">
                  {data.content.tags.map((tag: string, idx: number) => (
                  <motion.div variants={itemVariants} key={idx} className="px-6 py-3 bg-white text-slate-900 text-[10px] font-black tracking-widest uppercase rounded-full border border-slate-200 shadow-md hover:border-indigo-600 transition-all cursor-default">
                      {tag}
                  </motion.div>
                  ))}
              </motion.div>
            )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 2. Image Slide
export const ImageSlide: React.FC<SlideProps> = ({ data }) => {
  const [error, setError] = React.useState(false);
  
  return (
    <motion.div 
        className="flex flex-col justify-center items-center h-full relative z-10"
        initial="hidden" animate="show" variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full h-full flex flex-col items-center justify-center p-6">
        <GlassCard theme={data.theme} className="w-full max-w-5xl aspect-video overflow-hidden border-white/40 shadow-2xl relative flex items-center justify-center bg-slate-50 group">
          {!error ? (
            <img 
              src={data.content.imageUrl} 
              alt={data.content.alt || data.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-6 text-slate-300">
              <OrganicShape bg="bg-slate-100" color="text-slate-200" className="w-24 h-24">
                <Layers size={48} />
              </OrganicShape>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Ecosistema fyo</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {data.title && (
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <motion.h2 
                layoutId="slide-title"
                className="text-white text-xl md:text-2xl font-black tracking-tighter font-display"
              >
                {data.title}
              </motion.h2>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 3. Agenda Slide (Table)
export const TableCapitalSlide: React.FC<SlideProps> = ({ data }) => {
    const { headers, rows } = data.content;
    const colCount = headers.length;
    
    return (
        <motion.div className="w-full flex flex-col items-center justify-center py-6" initial="hidden" animate="show" variants={containerVariants}>
            <motion.div variants={itemVariants} className="w-full max-w-5xl">
                <div className="overflow-hidden glass-border rounded-[2.5rem] shadow-2xl relative bg-white/40 backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-cyan-400 to-indigo-600 animate-gradient-x" />
                    <div 
                        className="grid border-b border-slate-100/50 text-[10px] font-black uppercase tracking-[0.25em] font-display bg-slate-50/50"
                        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                    >
                        {headers.map((header: string, i: number) => (
                            <div key={i} className={`p-6 ${i > 0 ? 'text-center' : ''} text-slate-400`}>{header}</div>
                        ))}
                    </div>
                    {rows.map((row: string[], idx: number) => (
                        <div 
                            key={idx} 
                            className="grid border-b border-slate-50/50 hover:bg-white/60 transition-all duration-500 text-xs md:text-sm group"
                            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                        >
                            <div className="p-6 font-mono flex items-center font-black text-indigo-600 bg-indigo-50/30 group-hover:bg-indigo-100/50 transition-colors">{row[0]}</div>
                            {row.slice(1).map((cell, i) => (
                                <div key={i} className="p-6 flex items-center justify-center border-l border-slate-50/50 text-center font-bold tracking-tight text-slate-600 group-hover:text-slate-900">
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

// 4. Info Slide (Manifiesto)
export const InfoSlide: React.FC<SlideProps> = ({ data }) => {
  const { mainText, description, highlight } = data.content;
  return (
    <motion.div className="flex flex-col justify-center items-center h-full max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="w-full mb-8 text-center">
        <motion.div variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black tracking-[0.3em] uppercase mb-4 border border-indigo-100">
            Nuestra Esencia
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter font-display uppercase leading-none">
            {data.title}
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch w-full">
        <motion.div variants={itemVariants} className="md:col-span-7 flex">
            <GlassCard theme={data.theme} className="p-8 md:p-10 border-slate-100 shadow-2xl relative overflow-visible flex flex-col justify-center">
                <div className="absolute -top-4 -left-4">
                    <OrganicShape bg="bg-indigo-600" color="text-white" className="w-12 h-12 shadow-2xl">
                        <Quote size={24} fill="currentColor" />
                    </OrganicShape>
                </div>
                <div className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-6 tracking-tight font-display italic whitespace-pre-line">
                    "{mainText}"
                </div>
                <div className="h-1 w-16 bg-indigo-600 mb-6 rounded-full" />
                <p className="text-xs md:text-sm text-indigo-600 font-black leading-relaxed tracking-tight uppercase">
                    {description}
                </p>
            </GlassCard>
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-5 flex">
            <div className="relative p-8 rounded-[2.5rem] bg-indigo-50 border-2 border-indigo-100 shadow-xl overflow-hidden group flex flex-col justify-center w-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                
                <div className="relative z-10">
                    <Sparkles className="text-indigo-400 mb-6" size={32} />
                    <p className="text-lg md:text-xl font-black text-indigo-900 leading-tight tracking-tighter font-display uppercase mb-8">
                        {highlight}
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-indigo-200">
                        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs">fyo</div>
                        <div>
                            <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Compromiso</span>
                            <span className="block text-[8px] font-bold text-indigo-400 uppercase">Soluciones a medida</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 5. Culture Slide
export const TutorContentSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="flex flex-col justify-center h-full py-6 max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <motion.div variants={itemVariants}>
            <div className="relative p-1 bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 rounded-[2.5rem] shadow-2xl">
                <div className="bg-white rounded-[2.2rem] p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                            <Compass size={20} />
                        </div>
                        <h3 className="text-slate-900 font-black text-xs uppercase tracking-[0.3em] font-display">Nuestra Cultura</h3>
                    </div>
                    <div className="text-base md:text-lg text-slate-600 font-bold leading-relaxed tracking-tight mb-10 italic border-l-4 border-indigo-100 pl-6 whitespace-pre-line">
                        {data.content.description}
                    </div>
                    
                    <div className="h-px w-full bg-slate-100 mb-8" />
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                            <Target size={16} />
                        </div>
                        <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] font-display">Visión</h3>
                    </div>
                    <p className="text-lg md:text-xl font-black text-slate-900 leading-tight tracking-tighter font-display uppercase">
                        {data.content.vision}
                    </p>
                </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <motion.div variants={itemVariants} className="mb-6">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-1">ADN Organizacional</h4>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase font-display">Valores fyo</h2>
          </motion.div>
          {data.content.valores.map((valor: any, i: number) => {
            const Icon = IconMap[valor.icon] || Sparkles;
            return (
              <motion.div key={i} variants={itemVariants}>
                <div className="p-5 flex items-center gap-5 bg-white glass-border rounded-[1.2rem] shadow-lg hover:-translate-x-2 transition-all duration-500 group cursor-default">
                  <GlowIcon icon={Icon} color="text-indigo-600" bg="bg-indigo-50" size={20} />
                  <span className="text-lg font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase font-display">
                    {valor.title}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};
;

// 6. Grid Slide (Companies) - Reverted to standard grid
export const GridSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 h-full items-center max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      {data.content.items.map((item: any, idx: number) => {
        const Icon = IconMap[item.icon] || Users;
        const colors = [
          { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { text: 'text-slate-900', bg: 'bg-slate-100', border: 'border-slate-200' }
        ];
        const style = colors[idx % colors.length];

        // Extract emoji from title if present
        const titleParts = item.title.split(' ');
        const emoji = titleParts.length > 1 ? titleParts[titleParts.length - 1] : '';
        const cleanTitle = titleParts.length > 1 ? titleParts.slice(0, -1).join(' ') : item.title;

        return (
          <motion.div variants={itemVariants} key={idx} className="h-full">
            <div className="p-8 flex flex-col h-full bg-white glass-border rounded-[2.5rem] shadow-xl group hover:-translate-y-2 transition-all duration-700">
              <div className="flex justify-between items-start mb-6">
                <GlowIcon icon={Icon} color={style.text} bg={style.bg} size={28} />
                <motion.span 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
                    className="text-3xl"
                >
                    {emoji}
                </motion.span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tighter font-display group-hover:text-indigo-600 transition-colors uppercase leading-none">
                {cleanTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed mb-8 flex-grow tracking-tight">
                {item.desc}
              </p>
              <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${style.text} opacity-40 group-hover:opacity-100 transition-opacity`}>{item.link}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Rocket size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// 9. Ecosystem Circles Slide
export const EcosystemCirclesSlide: React.FC<SlideProps> = ({ data }) => {
    const { items } = data.content;
    return (
        <motion.div className="flex flex-col justify-center items-center h-full py-6 max-w-7xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
                <div className="lg:col-span-4 space-y-6">
                    <motion.div variants={itemVariants}>
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black tracking-[0.3em] uppercase mb-4 border border-emerald-100">
                            Ecosistema fyo
                        </div>
                        <div className="relative p-6 rounded-[1.5rem] bg-white glass-border shadow-xl">
                            <div className="absolute top-0 left-8 w-1 h-6 bg-indigo-600 -translate-y-3" />
                            <div className="text-sm md:text-base text-slate-600 font-bold leading-relaxed tracking-tight italic whitespace-pre-line">
                                "{data.subtitle}"
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-8 relative flex flex-wrap justify-center items-center gap-4 md:gap-8 overflow-visible py-10">
                    {items.map((item: any, i: number) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className={`w-28 h-28 md:w-44 md:h-44 rounded-full ${item.color} flex items-center justify-center text-white font-black text-[10px] md:text-lg shadow-2xl border-4 md:border-8 border-white text-center p-4 transition-all cursor-default glass-border relative overflow-hidden group`}
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 uppercase tracking-tighter">{item.name}</span>
                        </motion.div>
                    ))}
                    
                    {/* Decorative Background Element */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5 pointer-events-none">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                            className="w-[110%] h-[110%] border-2 border-dashed border-slate-900 rounded-full" 
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// 7. Activity Slide (Objectives Type)
export const ObjectivesSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="flex flex-col justify-center h-full py-6 max-w-5xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4 shadow-sm border border-slate-100">
              <Clock size={12} />
              {data.content.duration}
            </div>
            <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed mb-8 tracking-tight">
              {data.content.objective}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard theme={data.theme} className="p-8 border-indigo-100 bg-indigo-50/20">
              <h3 className="text-indigo-900 font-black text-xs mb-4 flex items-center gap-3 uppercase tracking-[0.2em]">
                <Lightbulb className="text-indigo-500" size={18} />
                Consigna
              </h3>
              <p className="text-slate-700 font-bold leading-relaxed text-base tracking-tight">
                {data.content.consigna}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div variants={itemVariants}>
            <GlassCard theme={data.theme} className="p-8 border-slate-100 bg-white shadow-2xl">
              <h3 className="text-slate-900 font-black text-[10px] mb-6 uppercase tracking-[0.25em] flex items-center gap-3">
                <ClipboardCheck className="text-slate-300" size={16} />
                Competencias
              </h3>
              <div className="space-y-3">
                {data.content.competencies.map((comp: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm group hover:border-indigo-200 hover:bg-white transition-all duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform" />
                    <span className="font-black text-slate-700 uppercase text-[10px] tracking-widest group-hover:text-indigo-600 transition-colors">{comp}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// 8. Closing Slide
export const ClosingSlide: React.FC<SlideProps> = ({ data, onJumpToSlide }) => {
    const { contacts, description } = data.content;

    return (
        <motion.div 
            className="flex flex-col justify-center items-center h-full text-center relative max-w-5xl mx-auto px-6 py-4" 
            initial="hidden" 
            animate="show" 
            variants={containerVariants}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

            <motion.div variants={itemVariants} className="mb-10 relative z-10">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white font-black text-2xl mb-10 shadow-xl mx-auto"
                >
                    fyo
                </motion.div>
                <motion.h1 
                    layoutId="slide-title"
                    className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9] drop-shadow-sm font-display"
                >
                    {data.title}
                </motion.h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="h-0.5 w-12 bg-indigo-100 rounded-full" />
                    <p className="text-lg text-indigo-600 font-black tracking-[0.3em] uppercase">
                        {data.subtitle}
                    </p>
                    <div className="h-0.5 w-12 bg-indigo-100 rounded-full" />
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12 max-w-2xl">
                <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed tracking-tight">
                    {description}
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full max-w-3xl relative z-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contacts.map((contact: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm group hover:border-indigo-100 hover:bg-slate-50 transition-all duration-500">
                            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                                <Mail className="text-indigo-600" size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{contact.role}</span>
                                <span className="block text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{contact.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {onJumpToSlide && (
                <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onJumpToSlide(0)}
                    className="mt-16 flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-full font-black text-xs transition-all shadow-xl hover:bg-indigo-700 active:scale-95 font-display tracking-[0.2em] uppercase group"
                >
                    <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                    Reiniciar Presentación
                </motion.button>
            )}
        </motion.div>
    );
};

// Placeholder for missing types
export const MentoringSplitSlide = () => null;
export const AcademySplitSlide = () => null;
