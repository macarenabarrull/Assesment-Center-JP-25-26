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
    <div className={`relative flex items-center justify-center ${bg} ${color} p-5 shadow-xl transition-all duration-700 rounded-[1.5rem] md:rounded-[2rem] ${className} group-hover:scale-110`}>
        <div className={`absolute inset-0 ${bg} blur-2xl opacity-20 rounded-full -z-10`} />
        <div className="absolute inset-0 border border-white/40 rounded-[inherit] pointer-events-none" />
        {children}
    </div>
);

const GlowIcon: React.FC<{ icon: any, color: string, bg: string, size?: number }> = ({ icon: Icon, color, bg, size = 24 }) => (
    <OrganicShape bg={bg} color={color}>
        <Icon size={size} strokeWidth={2.5} />
    </OrganicShape>
);

const GlassCard: React.FC<{ children?: React.ReactNode, className?: string, hover?: boolean, theme?: 'light' | 'dark' | 'brand' }> = ({ children, className = "", hover = false, theme = 'light' }) => {
    const themeClasses = {
        light: 'bg-white/70 border-white/80 shadow-sm',
        dark: 'bg-slate-900/90 border-slate-700/50 shadow-2xl text-white',
        brand: 'bg-indigo-600/5 border-indigo-500/20 shadow-md'
    };

    return (
        <div className={`
            backdrop-blur-2xl 
            border rounded-2xl md:rounded-3xl
            relative overflow-hidden
            ${themeClasses[theme]}
            ${hover ? 'transition-all duration-500 hover:bg-white/90 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1' : ''}
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
        <GlassCard theme={data.theme} className="p-10 md:p-16 flex flex-col items-center border-white/40 shadow-2xl relative overflow-visible">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-indigo-600 rounded-b-full" />
            
            <motion.div 
                layoutId="brand-tag"
                variants={itemVariants} 
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-100 bg-white/80 backdrop-blur-md text-slate-400 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-sm"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                @fyoonline
            </motion.div>
            
            <motion.h1 
                layoutId="slide-title"
                variants={itemVariants} 
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9] font-display uppercase"
            >
                {data.title}
            </motion.h1>
            
            <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-500/80 font-medium tracking-tight mb-10 max-w-2xl leading-relaxed"
            >
              {data.subtitle}
            </motion.p>

            {data.content?.tags && (
              <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-3">
                  {data.content.tags.map((tag: string, idx: number) => (
                  <motion.div variants={itemVariants} key={idx} className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-black tracking-widest uppercase rounded-xl border border-slate-100 shadow-sm hover:bg-white hover:border-indigo-100 transition-all cursor-default">
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
                <GlassCard theme={data.theme} className="overflow-hidden border-slate-100 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
                    <div 
                        className={`grid border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] font-display ${data.theme === 'dark' ? 'bg-slate-900 text-slate-400' : 'bg-slate-50 text-slate-400'}`}
                        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                    >
                        {headers.map((header: string, i: number) => (
                            <div key={i} className={`p-5 md:p-6 ${i > 0 ? 'text-center' : ''} ${i === 1 ? 'text-indigo-600' : ''}`}>{header}</div>
                        ))}
                    </div>
                    {rows.map((row: string[], idx: number) => (
                        <div 
                            key={idx} 
                            className={`grid border-b border-slate-50 hover:bg-slate-50/50 transition-all duration-500 text-xs md:text-sm group ${data.theme === 'dark' ? 'hover:bg-slate-800/40' : ''}`}
                            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                        >
                            <div className={`p-5 md:p-6 font-mono flex items-center font-black group-hover:text-indigo-600 ${data.theme === 'dark' ? 'bg-slate-800/20 text-slate-500' : 'bg-slate-50/30 text-slate-400'}`}>{row[0]}</div>
                            {row.slice(1).map((cell, i) => (
                                <div key={i} className={`p-5 md:p-6 flex items-center justify-center border-l border-slate-50 text-center font-bold tracking-tight group-hover:text-slate-900 ${data.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </GlassCard>
            </motion.div>
        </motion.div>
    );
};

// 4. Info Slide (Manifiesto)
export const InfoSlide: React.FC<SlideProps> = ({ data }) => {
  const { mainText, description, highlight } = data.content;
  return (
    <motion.div className="flex flex-col justify-center items-center h-full max-w-5xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-6 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <GlassCard theme={data.theme} className="p-8 md:p-12 border-slate-100 shadow-2xl relative overflow-visible">
                <div className="absolute -top-6 -left-6">
                    <OrganicShape bg="bg-slate-900" color="text-white" className="w-14 h-14 shadow-xl">
                        <Quote size={28} fill="currentColor" />
                    </OrganicShape>
                </div>
                <p className="text-lg md:text-xl font-black text-indigo-600 leading-tight mb-6 tracking-tight mt-4">
                    {mainText}
                </p>
                <div className="h-1 w-12 bg-slate-100 mb-6 rounded-full" />
                <p className="text-sm md:text-base text-slate-500 font-bold leading-relaxed tracking-tight">
                    {description}
                </p>
            </GlassCard>
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <div className="relative p-10 rounded-[2rem] bg-slate-900 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                
                <Quote className="text-indigo-500/30 mb-6" size={40} />
                <p className="text-xl md:text-2xl font-black text-white leading-[1.1] tracking-tighter relative z-10 font-display">
                    {highlight}
                </p>
                <div className="mt-10 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black text-xs">fyo</div>
                    <div className="text-white/80">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Manifiesto</span>
                        <span className="block text-[9px] font-bold opacity-40">Propósito Organizacional</span>
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
    <motion.div className="flex flex-col justify-center h-full py-6 max-w-5xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <motion.h2 
                layoutId="slide-title"
                className="text-2xl md:text-4xl font-black text-slate-900 leading-[0.95] tracking-tighter font-display mb-6"
            >
              {data.content.description}
            </motion.h2>
            <GlassCard theme={data.theme} className="p-8 border-indigo-100 bg-indigo-50/20">
              <h3 className="text-indigo-900 font-black text-xs mb-4 flex items-center gap-3 uppercase tracking-[0.2em]">
                <Target className="text-indigo-500" size={18} />
                Nuestra Visión
              </h3>
              <p className="text-base text-slate-700 font-bold leading-relaxed tracking-tight">
                {data.content.vision}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <div className="grid gap-4">
          {data.content.valores.map((valor: any, i: number) => {
            const Icon = IconMap[valor.icon] || Sparkles;
            return (
              <motion.div key={i} variants={itemVariants}>
                <GlassCard theme={data.theme} hover className="p-5 flex items-center gap-6 group">
                  <GlowIcon icon={Icon} color="text-indigo-600" bg="bg-indigo-50" size={24} />
                  <span className="text-lg font-black text-slate-800 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase font-display">
                    {valor.title}
                  </span>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};

// 6. Grid Slide (Companies)
export const GridSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 h-full items-center max-w-5xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      {data.content.items.map((item: any, idx: number) => {
        const Icon = IconMap[item.icon] || Users;
        const colors = [
          { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { text: 'text-slate-900', bg: 'bg-slate-100', border: 'border-slate-200' }
        ];
        const style = colors[idx % colors.length];

        return (
          <motion.div variants={itemVariants} key={idx} className="h-full">
            <GlassCard theme={data.theme} hover className="p-8 flex flex-col h-full border-slate-100 shadow-2xl group">
              <div className="mb-6">
                <GlowIcon icon={Icon} color={style.text} bg={style.bg} size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 tracking-tighter font-display group-hover:text-indigo-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed mb-8 flex-grow tracking-tight">{item.desc}</p>
              <div className="pt-6 border-t border-slate-50">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${style.text} opacity-40 group-hover:opacity-100 transition-opacity`}>{item.link}</span>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
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
