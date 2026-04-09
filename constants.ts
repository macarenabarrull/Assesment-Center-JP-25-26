export type IconKey = 'Compass' | 'Target' | 'BrainCircuit' | 'Layers' | 'Zap' | 'ClipboardCheck' | 'Heart' | 'Sparkles' | 'Users' | 'DollarSign' | 'Briefcase' | 'Calendar' | 'GraduationCap' | 'FileText' | 'Flag' | 'PencilRuler' | 'Search' | 'FileSignature' | 'Rocket' | 'BarChart3';

export interface SlideData {
  id: string;
  type: 'cover' | 'image' | 'objectives' | 'info' | 'timeline' | 'grid' | 'table-granos' | 'table-capital' | 'mentoring-split' | 'academy-split' | 'closing' | 'tutor-content' | 'ecosystem-circles';
  title?: string;
  subtitle?: string;
  content?: any;
  theme?: 'light' | 'dark' | 'brand';
}

export const SLIDES: SlideData[] = [
  {
    id: 'cover',
    type: 'cover',
    title: 'PROGRAMA JP 25-26',
    subtitle: 'assessment center',
    theme: 'brand',
    content: {
      highlight: 'fyo',
      tags: ['Somos un equipo', 'Creamos oportunidades', 'Pensamos en grande']
    }
  },
  {
    id: 'agenda',
    type: 'table-capital',
    title: 'CRONOGRAMA DE LA JORNADA 📅',
    subtitle: 'Actividades programadas para hoy',
    theme: 'light',
    content: {
      headers: ['Horario', 'Actividad', 'Duración'],
      rows: [
        ['09:30 - 09:45', 'Presentacion institucional de fyo', '15 min'],
        ['09:45 - 10:30', 'Dinámica 1: Dime quién eres...', '45 min'],
        ['10:30 - 11:00', '¡Tomemos un break!', '30 min'],
        ['11:00 - 12:45', 'Dinamica 2: Un día como comercial', '105 min'],
        ['12:45 - 13:00', 'Entrevista individuales', '15 min']
      ]
    }
  },
  {
    id: 'que-hacemos',
    type: 'info',
    title: 'NUESTRO MANIFIESTO 📜',
    subtitle: 'La esencia que impulsa nuestra transformación',
    theme: 'light',
    content: {
      mainText: 'En fyo trabajamos para ofrecer respuestas innovadoras y a medida, adaptadas a cada cliente. Buscamos ser una solución personalizada para cada uno de nuestros clientes. Una solución innovadora, diferente y única. Así fue como nos animamos a ser digitales en el mercado más tradicional de Argentina.',
      description: 'ofrecemos un ecosistema de soluciones innovadoras que abarcan toda la cadena comercial del agro.',
      highlight: 'DESAFIAMOS LO ESTABLECIDO PARA POTENCIAR EL FUTURO DEL AGRO 🚀'
    }
  },
  {
    id: 'ecosistema',
    type: 'ecosystem-circles',
    title: 'ECOSISTEMA INTEGRAL 🌐',
    subtitle: 'Formamos lazos con los clientes y socios más relevantes del mundo agropecuario para complementar y acompañar con servicios que abarcan toda la cadena comercial del agro. Y todo eso lo hicimos porque queremos ayudar a tomar las mejores decisiones para que los negocios crezcan. Queremos trabajar juntos, potenciando el valor e impulsando el trabajo, con conocimiento, profesionalismo y experiencia.',
    theme: 'light',
    content: {
      items: [
        { name: 'fyoDigital', color: 'bg-blue-500' },
        { name: 'fyoFood', color: 'bg-orange-500' },
        { name: 'fyoCapital', color: 'bg-green-600' },
        { name: 'fyoAdvisory', color: 'bg-indigo-600' },
        { name: 'fyoAcopio', color: 'bg-amber-600' },
        { name: 'fyoCredits', color: 'bg-emerald-600' }
      ]
    }
  },
  {
    id: 'valores',
    type: 'tutor-content',
    title: 'CULTURA Y PROPÓSITO ✨',
    subtitle: 'Lo que nos mueve y hacia dónde vamos',
    theme: 'brand',
    content: {
      description: 'creemos en el poder de las personas para transformar el agro. La cultura de fyo se basa en la confianza, la colaboracion y la innovación. Formamos lazos con los clientes y socios más relevantes del mundo agropecuario para complementar y acompañar con servicios que abarcan toda la cadena comercial del agro.',
      vision: 'Ser la empresa líder en potenciar los negocios de nuestros clientes a través de servicios que agreguen valor y que desafien sus procesos de negocios.',
      valores: [
        { title: 'Somos un equipo', icon: 'Users' },
        { title: 'Pensamos en grande', icon: 'Rocket' },
        { title: 'Creamos oportunidades', icon: 'Zap' }
      ]
    }
  },
  {
    id: 'empresa',
    type: 'grid',
    title: 'NUESTRAS EMPRESAS 🏢',
    subtitle: 'Especialización en cada eslabón del agro',
    theme: 'light',
    content: {
      items: [
        { 
          title: 'fyo 🌾', 
          desc: 'Líderes en comercialización de granos, corretaje y servicios financieros para el productor.',
          icon: 'BarChart3',
          link: 'www.fyo.com'
        },
        { 
          title: 'AMAUTA 🌱', 
          desc: 'Soluciones en nutrición vegetal y biotecnología para maximizar el rendimiento de los cultivos.',
          icon: 'Sparkles',
          link: 'www.amauta.ag'
        },
        { 
          title: 'Agrofy 💻', 
          desc: 'El mercado digital de agronegocios más importante de la región.',
          icon: 'Rocket',
          link: 'www.agrofy.com.ar'
        }
      ]
    }
  },
  {
    id: 'assessment-cover',
    type: 'cover',
    title: 'ASSESSMENT CENTER 🎯',
    subtitle: '¿Estan listos?',
    theme: 'brand',
    content: {
      highlight: 'Evaluación',
      tags: ['Dinámicas 🎨', 'Casos 💡', 'Talento ✨']
    }
  },
  {
    id: 'dinamica-1',
    type: 'objectives',
    title: 'DINÁMICA 1: PRESENTACIÓN CREATIVA 🎨',
    subtitle: 'Conociendo al futuro talento',
    theme: 'light',
    content: {
      duration: '40 MINUTOS',
      objective: 'Evaluar la capacidad de síntesis, comunicación y autenticidad del candidato.',
      consigna: 'Seleccione entre 3 y 5 imágenes que representen su trayectoria o valores personales y realice una breve presentación ante el panel.',
      competencies: ['Comunicación Efectiva', 'Capacidad de Síntesis', 'Seguridad Personal', 'Creatividad']
    }
  },
  {
    id: 'break-cover',
    type: 'cover',
    title: '¡Tomemos un descanso! ☕',
    theme: 'light',
    content: {
      highlight: 'Break',
      tags: ['Café ☕', 'Networking 🤝']
    }
  },
  {
    id: 'dinamica-2',
    type: 'objectives',
    title: 'DINÁMICA 2: CASO ESTRATÉGICO 💡',
    subtitle: 'Resolución de desafíos reales del agro',
    theme: 'light',
    content: {
      duration: '60 MINUTOS',
      objective: 'Evaluar visión estratégica, trabajo colaborativo y toma de decisiones bajo presión.',
      consigna: 'En equipos, analicen el escenario de mercado planteado y construyan una solución innovadora utilizando los recursos disponibles.',
      competencies: ['Visión de Negocio', 'Trabajo Colaborativo', 'Liderazgo', 'Adaptabilidad']
    }
  },
  {
    id: 'closing',
    type: 'closing',
    title: 'MUCHAS GRACIAS 🙌',
    subtitle: 'equipo fyo',
    theme: 'brand',
    content: {
      description: 'Transformamos el futuro del agro junto a las personas que se animan a desafiar lo establecido.',
      contacts: []
    }
  }
];
