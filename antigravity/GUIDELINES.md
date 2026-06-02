# Paleta de colores (usar exactamente estos valores y variables)
- --bg-primary: #FAFAFA (Crema Pergamino - Fondo principal de toda la app)

- --bg-surface: #FFFFFF (Blanco Puro - Fondo para tarjetas de producto y contenedores destacados)

- --text-primary: #3E2723 (Café Ceniza - Títulos, textos principales y bordes sutiles)

- --text-secondary: #5D4037 (Marrón Nogal - Textos secundarios, footers y barra de navegación)

- --accent-amber: #FFB300 (Ámbar Dorado - Botones primarios de acción y notificaciones)

- --accent-yellow: #FFE082 (Amarillo Cálido - Detalles secundarios, fondos sutiles o estados hover)


# Reglas de Aplicación Visual:

- Fondo principal: Usar --bg-primary en todas las vistas para dar un respiro visual.

- Botones primarios (CTAs): Todo elemento de conversión (Añadir al carrito, Generar Factura, Redirección a WhatsApp) debe usar --accent-amber con texto en --text-primary.

- Headers / Navegación: Usar --text-secondary como fondo del Navbar, con textos claros/blancos.

- Tarjetas destacadas: Usar --bg-surface con sombras muy sutiles para los productos y el contenedor del "Evangelio y Oración del día".

- Texto principal: Usar --text-primary para mantener una lectura suave, evitando el negro puro.

# Tipografía
- Títulos y encabezados (H1, H2, H3): Uso obligatorio de Lora (Serif) para dar un toque clásico, solemne y espiritual.

- Cuerpo de texto, precios y botones: Uso obligatorio de Lato (Sans-Serif) para garantizar la máxima legibilidad.

# Prioridades y Reglas de Arquitectura
- Reutilización estricta: Trabaja pensando en componentes modulares. Crea un componente único ProductCard (para los rosarios y figuras), un DailyContentBox (para el evangelio), y un ActionBtn estandarizado.

- Navbar Único: El sistema debe tener un solo Navbar que se adapte si el usuario está en la vista pública.

- Estructura de carpetas: Maneja carpetas y subcarpetas enfocadas en dominios (ej. /shop para el catálogo y carrito, /admin para el, page/[slug], dashboard de stock y CRUD, /ui para componentes base).

- Control de dependencias: No hagas configuraciones ni instalaciones de librerías externas (como UI kits complejos o manejadores de estado pesados) sin consultar primero. Todo debe ser minimalista y ceñirse al MVP.

- Tono: La interfaz y los mensajes del sistema deben mantenerse sobrios, simples y sin elementos visuales que se vayan al extremo.