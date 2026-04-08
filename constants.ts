export type IconKey = 'Compass' | 'Target' | 'BrainCircuit' | 'Layers' | 'Zap' | 'ClipboardCheck' | 'Heart' | 'Sparkles' | 'Users' | 'DollarSign' | 'Briefcase' | 'Calendar' | 'GraduationCap' | 'FileText' | 'Flag' | 'PencilRuler' | 'Search' | 'FileSignature' | 'Rocket' | 'BarChart3';

export interface SlideData {
  id: string;
  type: 'cover' | 'image' | 'objectives' | 'info' | 'timeline' | 'grid' | 'table-granos' | 'table-capital' | 'mentoring-split' | 'academy-split' | 'closing' | 'tutor-content';
  title?: string;
  subtitle?: string;
  content?: any;
  theme?: 'light' | 'dark' | 'brand';
}

export const SLIDES: SlideData[] = [
  {
    id: 'cover',
    type: 'cover',
    title: 'PROGRAMA JÓVENES PROFESIONALES 25-26 🚀',
    subtitle: 'Jornada de Evaluación: Diseñando el futuro del agro',
    theme: 'brand',
    content: {
      highlight: 'fyo',
      tags: ['Talento', 'Innovación', 'Liderazgo']
    }
  },
  {
    id: 'agenda',
    type: 'table-capital',
    title: 'CRONOGRAMA DE LA JORNADA 📅',
    subtitle: 'Actividades programadas para hoy',
    theme: 'light',
    content: {
      headers: ['Horario', 'Actividad', 'Duración', 'Participantes'],
      rows: [
        ['09:30 - 09:40', 'Presentación Institucional fyo', '10 min', 'Todos'],
        ['09:40 - 10:10', 'Presentación Individual', '40 min', 'Todos'],
        ['10:10 - 11:10', 'Dinámica 1: Innovación en el Agro', '60 min', 'Todos'],
        ['11:10 - 11:25', 'Receso y Café', '15 min', 'Todos'],
        ['11:25 - 12:25', 'Dinámica 2: Propuesta de Valor Comercial', '60 min', 'Todos'],
        ['12:25 - 13:00', 'Entrevistas con Líderes', '35 min', 'Gerentes'],
        ['13:00 - 13:15', 'Cierre de la Jornada', '15 min', 'Todos']
      ]
    }
  },
  {
    id: 'que-es-fyo',
    type: 'info',
    title: '¿QUÉ ES FYO? 🤔',
    subtitle: 'Nuestra esencia y propósito',
    theme: 'light',
    content: {
      mainText: 'Potenciamos el crecimiento de nuestros clientes y de nuestra gente, transformando el agro con pasión y tecnología.',
      description: 'Somos una solución personalizada para cada uno de nuestros clientes. Una propuesta innovadora y única que nos permitió digitalizar el mercado más tradicional de Argentina, formando lazos con los socios más relevantes del sector.',
      highlight: 'Ayudamos a tomar las mejores decisiones para que los negocios crezcan de manera sustentable.'
    }
  },
  {
    id: 'ecosistema',
    type: 'image',
    title: 'ECOSISTEMA DE NEGOCIOS 🌐',
    subtitle: 'Soluciones integrales para toda la cadena',
    theme: 'light',
    content: {
      imageUrl: 'https://ais-pre-54ki7ve6ci7hzots2rglcf-337452175769.us-east1.run.app/api/attachments/86c61f22-959c-482f-87d2-7489f6486603',
      alt: 'Ecosistema fyo: Soluciones integrales para el agro'
    }
  },
  {
    id: 'valores',
    type: 'tutor-content',
    title: 'VALORES QUE NOS DEFINEN ✨',
    subtitle: 'El ADN de nuestra cultura organizacional',
    theme: 'brand',
    content: {
      description: 'Nuestra cultura se basa en la confianza, la colaboración y la búsqueda constante de la excelencia.',
      vision: 'Ser la plataforma líder de servicios y negocios para el agro en Latinoamérica.',
      valores: [
        { title: 'PASIÓN POR EL CLIENTE ❤️', icon: 'Heart' },
        { title: 'INTEGRIDAD Y RESPETO 🤝', icon: 'Shield' },
        { title: 'TRABAJO EN EQUIPO 👥', icon: 'Users' },
        { title: 'INNOVACIÓN CONSTANTE ⚡', icon: 'Zap' }
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
    subtitle: 'Comienzo de las dinámicas grupales',
    theme: 'brand',
    content: {
      highlight: 'Evaluación',
      tags: ['Dinámicas', 'Casos', 'Talento']
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
    title: 'RECESO Y CAFÉ ☕',
    subtitle: 'Momento de relax y networking',
    theme: 'light',
    content: {
      highlight: 'Break',
      tags: ['Café', 'Networking', 'Energía']
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
    subtitle: 'Equipo de Talento fyo',
    theme: 'brand',
    content: {
      description: 'Transformamos el futuro del agro junto a las personas que se animan a desafiar lo establecido.',
      contacts: [
        { role: 'Responsable de Talento', email: 'talento@fyo.com' },
        { role: 'Atención al Cliente', email: 'contacto@fyo.com' }
      ]
    }
  }
];
