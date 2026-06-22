import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Taller De Maria",
  description: "Conozca la historia, los valores y la ubicación del Taller De Maria.",
  keywords: ["Taller de María", "Sobre Nosotros", "Historia", "Valores", "Devoción", "Tradición", "Artesanía"]

};

// Mocks that will eventually come from the admin panel
const aboutMocks = {
  history: {
    tagline: "Nuestra Historia",
    title: "Forjando devoción a través del trabajo artesanal.",
    paragraphs: [
      "El Taller De Maria nació de una profunda vocación de servicio y amor por el arte sacro. Desde nuestros inicios, nos hemos dedicado a crear piezas que no solo adornan, sino que elevan el espíritu y acompañan en la oración diaria.",
      "Cada rosario, cada imagen, y cada ornamento es trabajado con reverencia en nuestro taller. Utilizamos materiales nobles y técnicas tradicionales, asegurando que el carácter sagrado de cada objeto se preserve desde la concepción hasta que llega a sus manos."
    ],
    image1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmTob960YzrDkqzeqzmkQSlaqOZpDAu0D1UT0nRy9fIQpw657aGlIViUiKsgN98Kn2NNuRiUhoShksMQtefIQKVJDQSI8r5NH5xe5XAjto7atbrpG5BO7X-5iWfeKPEFbh_lFL9oorNM5pC1hsg2Wu-nvB4O-9ezRBQ46ZY0mGWRWIeTuvEImJsXKKnwd1Uk1cjxqNFL6mxUc9qLg23e_24gs5AiqMDvF1s62eKzs6oFdA8QPo-REI75fRjcNnx082X21xHaLyUic",
    image2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZchB_iDewXsmVxcQaGD4XrRo75QQgO1J_sAxORLyU0AgsZRzaZnqW6D06tMXVBsmMIhVnyOlvD3-wjVaCFEwMLeKCezb453AXOybbE-F4ZcKMxA5A3NhpS_DNwj-hqb0wwM6mpjSoepF34XfBo2shIzJsW8_hXCs3DdI6czrlcgImMqE6lsfbIwDU9XUXUb0OxmVdfIZeTr2JjZMuxv0MXtItD4GGqleMs-FR5lKLwuC_U8rnLjgcQIzb3x8qTg4RA2HBg37GUTE"
  },
  values: {
    title: "Pilares del Taller",
    subtitle: "Nuestra filosofía de trabajo se sostiene en tres virtudes que guían cada incisión, cada nudo y cada entrega.",
    items: [
      {
        id: 1,
        icon: "favorite",
        title: "Devoción",
        description: "Trabajamos en estado de gracia y oración. Nuestras manos son solo instrumentos; el verdadero creador reside en el silencio del taller y en la fe que depositamos en cada obra."
      },
      {
        id: 2,
        icon: "history_edu",
        title: "Tradición",
        description: "Respetamos y preservamos los métodos heredados de generaciones de artesanos. La estética clásica y la sobriedad son nuestras guías para honrar la historia sacra."
      },
      {
        id: 3,
        icon: "handyman",
        title: "Artesanía",
        description: "Renunciamos a la producción masiva. Privilegiamos la calidad sobre la cantidad, asegurando que los materiales nobles sean tratados con la dignidad que merecen."
      }
    ]
  },
  contact: {
    title: "Encuéntrenos",
    description: "Nuestro taller está abierto para aquellos que buscan un momento de paz o desean encargar una pieza especial en persona. Le invitamos a visitarnos.",
    address: {
      street: "Calle del Silencio 14, Barrio Antiguo",
      city: "Popayán, Cauca"
    },
    hours: {
      weekdays: "Lunes a Viernes: 10:00 - 14:00 | 17:00 - 20:00",
      weekends: "Sábados: 10:00 - 14:00 (Solo con cita previa)"
    },
    info: {
      email: "taller@tallerdemaria.com",
      phone: "+57 320 123 4567"
    },
    mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-27utUo4XyV-l8zcJgpt4BwNy1CCD6txvanjQCIqxFufOJO_uNpu7aA09IPzXOCv1KeKHWDtoytWlUz-2KAvQHt8Kr5k4-liXS8W1Xep-ZrYtpfHqFXXz1pvZWPjCKdTPTOgDRzAlbIn0eocj3SffCYGC2IYyvGDXSpAGV0LEe4KfeJakCJxf6OuTPzT5_i4ZXdxdMzYP9lnqI_OS34mHAv9TlMBoKdWk6MBTGWM6U51kzGVx6RH5lJuSUwdadFm9ZkqlNhLs1BE"
  }
};

export default function AboutPage() {
  const { history, values, contact } = aboutMocks;

  return (


    <main className="fade-in pt-[100px] pb-xl flex flex-col gap-xl">
      {/* Hero Section: History */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col gap-md">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">{history.tagline}</span>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary text-balance">
              {history.title}
            </h1>
            <div className="font-body-lg text-body-lg text-on-surface-variant flex flex-col gap-sm">
              {history.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          {/* Asymmetric Image Layout */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-sm relative h-[500px]">
            <div className="h-full rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] transform translate-y-8 relative">
              <Image
                alt="Artesano"
                className="w-full h-full object-cover grayscale-[20%]"
                src={history.image1}
                fill
                unoptimized
              />
            </div>
            <div className="h-full rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] transform -translate-y-4 relative">
              <Image
                alt="Rosario"
                className="w-full h-full object-cover sepia-[10%]"
                src={history.image2}
                fill
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Values */}
      <section className="w-full bg-surface-container-low py-xl">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-lg">
            <h2 className="font-headline-md text-headline-md text-primary">{values.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl mx-auto">
              {values.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {values.items.map(item => (
              <div key={item.id} className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-surface-container-high flex flex-col gap-md transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2 text-xl">{item.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop w-full pb-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
          {/* Info Side */}
          <div className="p-lg md:p-xl flex flex-col justify-center gap-lg">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
                {contact.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                {contact.description}
              </p>
            </div>

            <div className="flex flex-col gap-md">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                <div>
                  <h4 className="font-label-md text-label-md text-primary mb-1">Dirección</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {contact.address.street}<br />
                    {contact.address.city}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-surface-container-high my-2"></div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">schedule</span>
                <div>
                  <h4 className="font-label-md text-label-md text-primary mb-1">Horario de Atención</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {contact.hours.weekdays}<br />
                    {contact.hours.weekends}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-surface-container-high my-2"></div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">mail</span>
                <div>
                  <h4 className="font-label-md text-label-md text-primary mb-1">Contacto</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {contact.info.email}<br />
                    {contact.info.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="relative min-h-[400px] bg-surface-container-low">
            <Image
              alt="Mapa de Ubicación"
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
              src={contact.mapImage}
              fill
              unoptimized
            />
            {/* Faux Map Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center shadow-lg border-2 border-surface-container-lowest">
                <span className="material-symbols-outlined text-on-secondary-container">church</span>
              </div>
              <div className="mt-2 bg-surface-container-lowest px-3 py-1 rounded shadow-sm border border-surface-container-high">
                <span className="font-label-sm text-label-sm text-primary">Taller De Maria</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>


  );
}
