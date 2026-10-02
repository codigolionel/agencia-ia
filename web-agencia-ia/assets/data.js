/* Las cuatro hojas de ruta de la guía.
   Estructura por ruta: nombre, desc, etapas[t, para, tareas[], pasas, sigue?] */
window.RUTAS = {
  cero: {
    nombre: 'Arranco de cero',
    desc: 'No sabés lo técnico y todavía no tenés clientes. Está bien: un montón de mis alumnos arrancaron así. Vas en este orden.',
    etapas: [
      {
        t: 'Entendé qué es, y armá tu primera cosa',
        para: 'Antes de vender nada, entendé las tres cosas y probalas con tus manos.',
        tareas: [
          'Entendé la diferencia: el chat para preguntar, Claude Code y Codex para construir, la API para que ande solo. Está en la parte 01.',
          'Instalá Claude Code (o Codex) en tu compu.',
          'Pedile tu primera cosa chica, en castellano, como se la pedirías a una persona.',
          'Dejá andando una automatización o un agente de prueba.'
        ],
        pasas: 'podés explicarle a cualquiera, en dos frases, qué armaste y para qué le sirve a una empresa.'
      },
      {
        t: 'Elegí un rubro y qué le vas a resolver',
        para: 'No le vendas lo que sabés hacer: ofrecele lo que busca.',
        tareas: [
          'Elegí un rubro que conozcas. El dolor de cada rubro es otro.',
          'Mirá la tabla de lo que se vende hoy. El agente solo no alcanza.',
          'Armá tu demo con Claude Code: una sola cosa, bien resuelta, para ese rubro.',
          'Escribí tu oferta como la entiende el dueño: qué le cambia, no cómo funciona.'
        ],
        pasas: 'tenés una demo andando y una oferta que cualquier dueño entiende en tres líneas.'
      },
      {
        t: 'Conseguí tus primeras charlas',
        para: 'Todo termina en una conversación. Arrancá por la gente que ya te conoce.',
        tareas: [
          'Hacé la lista: la gente que ya conocés y tiene un negocio.',
          'Andá y escuchá: preguntales qué les duele. No vas a vender.',
          'Cuando te escriban, contestá en minutos, no en horas.',
          'Empezá a subir contenido que termine en un video largo. Rinde a los meses, no a la semana.'
        ],
        pasas: 'tenés tu primera llamada agendada con alguien que decide.'
      },
      {
        t: 'Cerrá tu primer cliente',
        para: 'Dos llamadas y una oferta. Sin apretar.',
        tareas: [
          'Antes de la llamada, fijate que tenga volumen: consultas que no llega a responder.',
          'En la primera llamada, detectá qué quiere: dónde pierde tiempo, dónde pierde ventas, qué hace a mano.',
          'Armá la propuesta con la ecuación del valor, escrita para el dueño.',
          'En la segunda llamada, proponele eso. Decís el precio y te callás.',
          'Mes a mes, con la garantía adentro. Nunca «ilimitado» ni «de por vida».'
        ],
        pasas: 'tu primer cliente pagó el primer mes.'
      },
      {
        t: 'Hacé bien la entrega de servicio',
        para: 'La entrega de servicio no te trae clientes nuevos: hace que te sigan contratando.',
        tareas: [
          'Antes de la primera llamada, la bienvenida: qué se puede, qué no, qué necesitás de él y cuánto lleva.',
          'Escribí el mapa: todo lo que se va a hacer, por escrito.',
          'Una llamada grabada por semana, y después, un informe: arriba, lo que cambió.',
          'Una funcionalidad por día. Y si el cliente no escribe, escribile vos.',
          'Al final del mes, mostrale lo que sigue.'
        ],
        pasas: 'tu cliente renovó el segundo mes.',
        sigue: { ruta: 'clientes', txt: 'Ya tengo mi primer cliente: pasame a esa hoja de ruta' }
      }
    ]
  },
  tecnico: {
    nombre: 'Sé lo técnico',
    desc: 'Sabés armar, pero no te habla nadie. Tu problema no es técnico: es que te llegue gente y cerrar.',
    etapas: [
      {
        t: 'Dejá de aprender y empezá a ofrecer',
        para: 'Al principio es 90% marketing y 10% técnico. Si ya sabés armar, no te falta otra herramienta.',
        tareas: [
          'Dejá de probar herramientas nuevas: una para cada cosa, y listo.',
          'Pasá de vender agentes sueltos a sistemas: Claude Code y un servidor.',
          'Mirá la tabla de lo que se vende hoy y elegí qué vas a ofrecer.'
        ],
        pasas: 'sabés qué vas a ofrecer, y a qué rubro.'
      },
      {
        t: 'Rubro, demo y oferta',
        para: 'Tu ventaja es la velocidad: una demo que anda sale en horas.',
        tareas: [
          'Elegí un rubro que conozcas.',
          'Armá una aplicación base para ese rubro, con módulos que se sacan o se agregan según el cliente.',
          'Que la demo le resuelva algo de verdad al rubro. No la regales: se usa para cerrar.',
          'Escribí la oferta como la entiende el dueño, no como la escribe un técnico.'
        ],
        pasas: 'tenés la demo andando y la oferta escrita para el dueño.'
      },
      {
        t: 'Que te llegue gente',
        para: 'Podés saber armar todo y que no te hable nadie. Te tienen que encontrar.',
        tareas: [
          'Tus contactos primero: preguntales qué les duele.',
          'YouTube arriba de todo: mostrá lo que construís, en videos largos.',
          'Que todo lo demás empuje al video, y que el video termine en tu WhatsApp.',
          'Mirá las visitas reales: las visualizaciones con interacción.'
        ],
        pasas: 'tenés conversaciones con dueños todas las semanas.'
      },
      {
        t: 'Cerrá sin apretar',
        para: 'Dos llamadas, y las dos con el que decide.',
        tareas: [
          'Calificá antes de la llamada: «contame qué venís haciendo».',
          'Primera llamada: qué quiere de verdad. Segunda: le das eso.',
          'No le leas la lista de lo que incluye: mostrale cómo consigue lo que quiere.',
          '¿Te pide descuento? No le saques cosas: mostrale el retorno.'
        ],
        pasas: 'cerraste tu primer cliente, mes a mes.'
      },
      {
        t: 'Tu entrega de servicio, de profesional',
        para: 'Acá es donde tu parte técnica rinde de verdad.',
        tareas: [
          'Auditá antes de construir: mirá el proceso real del cliente.',
          'Servidor privado y cuidado: acceso cerrado, claves fuera del navegador y revisión de seguridad antes de salir.',
          'El código es del cliente, en su GitHub privado.',
          'Una llamada y un informe por semana: arriba, lo que cambió.'
        ],
        pasas: 'tu cliente renovó, y te pidió lo que sigue.',
        sigue: { ruta: 'clientes', txt: 'Ya tengo clientes: pasame a esa hoja de ruta' }
      }
    ]
  },
  clientes: {
    nombre: 'Ya tengo clientes',
    desc: 'Tenés uno o más. Ahora lo que más rinde es que el mismo cliente te siga contratando.',
    etapas: [
      {
        t: 'Ordená la entrega de servicio',
        para: 'Lo que sigue es un ritmo, semana a semana.',
        tareas: [
          'Pasá a mes a mes, sin permanencia: se queda porque le sirve.',
          'Cada cliente, con su mapa por escrito: contra eso se mide.',
          'Una llamada grabada por semana, con su equipo.',
          'Después de cada llamada, el informe: arriba, lo que cambió.',
          'Todo por escrito. Y si el cliente no escribe, escribile vos.'
        ],
        pasas: 'cada cliente tiene su mapa, su llamada y su informe de la semana.'
      },
      {
        t: 'Que lo que vendiste aguante',
        para: 'Instalarlo es un video. Que aguante es el oficio.',
        tareas: [
          'Si vendiste un agente: uno por tema, que el primer mensaje califique, y que cierre una persona.',
          'Revisá cuánto le sale con Meta desde el 1 de octubre de 2026: la calculadora de WhatsApp.',
          'Seguridad antes de que entren datos reales: acceso cerrado y claves fuera del navegador.',
          'Prometido contra cumplido: si no llegás, decilo antes.'
        ],
        pasas: 'lo que vendiste anda solo, y el cliente no te tiene que avisar que se cayó.'
      },
      {
        t: 'El próximo proyecto sale del mismo cliente',
        para: 'Lo que rinde es que el mismo vuelva a contratarte.',
        tareas: [
          'Auditá antes de construir: mirá dónde pierde tiempo y ventas.',
          'Al final de cada etapa, mostrale lo que sigue.',
          'Ofrecele lo siguiente de la tabla: un tablero, una aplicación, el sistema operativo de IA.',
          'Dale un portal: que entre cuando quiera y vea cómo va su proyecto.'
        ],
        pasas: 'un cliente que vino por una cosa, hoy te contrata otra.'
      },
      {
        t: 'Que te llegue más gente, sin descuidar a los que tenés',
        para: 'Pocos clientes y mucho resultado rinde más que muchos a medias.',
        tareas: [
          'Contá en videos largos lo que les armaste, con el sistema en pantalla (sin nombres, si no te dejan).',
          'Calificá antes de la llamada: siempre te van a venir descremados.',
          'Los referidos pasan si hacés bien el trabajo. No los esperes.'
        ],
        pasas: 'te escribe gente todas las semanas, y elegís con quién trabajar.',
        sigue: { ruta: 'abasto', txt: 'Ya no doy abasto: pasame a esa hoja de ruta' }
      }
    ]
  },
  abasto: {
    nombre: 'No doy abasto',
    desc: 'Tenés más de lo que podés atender. No busques más clientes: te falta otra cosa.',
    etapas: [
      {
        t: 'Pará de sumar clientes',
        para: 'El problema de tener demasiados es el que querés tener. Pero se resuelve distinto.',
        tareas: [
          'Si tenés tres desarrollos a la vez, te quema: subí el precio o delegá.',
          'Pocos clientes y mucho resultado rinde más que muchos a medias.',
          'Mes a mes: no ates tu agenda seis meses por adelantado.',
          'El ego, afuera: al cliente no le importan tu auto ni tus seguidores.'
        ],
        pasas: 'le das resultado a cada cliente que tenés, sin tener que elegir a cuál.'
      },
      {
        t: 'Delegá en sistemas lo que se repite',
        para: 'Lo que hacés igual todas las semanas no tiene por qué pasar por tu cabeza.',
        tareas: [
          'Lo que se repite, pasalo a una skill o a una automatización.',
          'Armá tu propio sistema: conectá lo que usás todos los días.',
          'Tu contenido, con un equipo de skills que lo prepare.'
        ],
        pasas: 'tu semana tiene horas libres para los clientes.'
      },
      {
        t: 'Vendé lo que no depende de tu agenda',
        para: 'Formar al equipo está arriba de la tabla: queda andando sin depender de vos.',
        tareas: [
          'Formá al equipo del cliente: que aprenda a construir con IA.',
          'Consultoría: en vez de hacérsela, le enseñás a su equipo a hacerla.',
          'Una aplicación base por rubro: la misma base para cada cliente, con sus módulos.'
        ],
        pasas: 'tu agenda deja de ser el techo.'
      }
    ]
  }
};
