# Arquitectura Futura: Taller de María

## Contexto Actual
Actualmente, el proyecto utiliza una arquitectura agrupada por **responsabilidades técnicas** (Technical-Driven). En la raíz del proyecto encontramos carpetas como `actions`, `components`, `models`, `hooks`, `helpers`, entre otras.
Si bien esto funciona excelente para proyectos de tamaño mediano, a medida que la aplicación crezca y se añadan más dominios (como blogs, analíticas, sistemas de referidos, etc.), navegar por el código será cada vez más difícil. Para modificar una sola funcionalidad (ej. el Carrito de Compras), un desarrollador tendría que saltar entre múltiples carpetas separadas: `actions/cart.actions.ts`, `models/cart/`, `store/shopping-cart/`, y `components/shared/cart/`.

## Propuesta: Arquitectura Basada en Funcionalidades (Feature-Driven Architecture)
Para un crecimiento sostenible, se propone migrar a una arquitectura basada en **Módulos o Funcionalidades (Features)**, combinada con la consolidación de todo el código fuente dentro de un directorio `src/`.

Esta estructura se alinea con las mejores prácticas modernas de Next.js y arquitecturas como *Feature-Sliced Design* o *Domain-Driven Design (DDD)* simplificado, favoreciendo la **colocación (colocation)**: el código que cambia junto, debe vivir junto.

### Estructura de Carpetas Propuesta a Futuro

```text
.
├── src/
│   ├── app/                    # 1. Capa de Enrutamiento (Next.js App Router)
│   │   ├── (shop)/             # Rutas públicas (tienda, evangelio, oraciones)
│   │   ├── admin/              # Rutas de administración
│   │   ├── api/                # Endpoints de la API
│   │   └── globals.css         # Estilos globales
│   │
│   ├── features/               # 2. Capa de Funcionalidades (Módulos de Negocio)
│   │   ├── auth/               # Autenticación y gestión de usuarios
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── models/
│   │   ├── catalog/            # Productos, Categorías e Inventario
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── models/
│   │   ├── checkout/           # Carrito de compras y Órdenes
│   │   ├── content/            # Evangelios, Oraciones, Lecturas, Acerca de
│   │   └── admin/              # Lógica y componentes exclusivos del panel Dashboard
│   │
│   ├── shared/                 # 3. Capa Compartida (Recursos Globales)
│   │   ├── ui/                 # Componentes base (Botones, Inputs, Modales, Tablas)
│   │   ├── lib/                # Configuración de infraestructura (MongoDB, Cloudinary, Resend)
│   │   ├── utils/              # Helpers genéricos (formateo, slugs, validaciones)
│   │   ├── hooks/              # Hooks globales genéricos
│   │   ├── interfaces/         # Tipos globales de TypeScript
│   │   └── store/              # Estado global general (Zustand)
│   │
│   ├── emails/                 # 4. Plantillas de correos (React Email)
│   └── config/                 # 5. Variables de entorno y configuraciones del entorno
│
├── docs/                       # Documentación del proyecto (Markdown)
├── public/                     # Archivos estáticos e imágenes
└── [Archivos de Configuración] # package.json, next.config.ts, eslint, tsconfig, etc.
```

## Justificación

1. **Limpieza con el Directorio `src/`**: 
   - **Orden en la raíz**: Mover todo el código de la aplicación a `src/` limpia la raíz del proyecto, dejando únicamente los archivos de configuración (ESLint, TSConfig, Next, Package.json). Evita confusiones visuales entre la configuración del entorno y el código de negocio de la aplicación.
   
2. **Colocación por Funcionalidades (`features/`)**:
   - **Alta Cohesión**: Si necesitas modificar cómo funciona la "Autenticación", sabes que absolutamente todo (acciones del servidor, modelos de DB, hooks de login y componentes visuales) está concentrado en `src/features/auth/`. No hay que "cazar" archivos por todo el proyecto.
   - **Escalabilidad Horizontal**: Nuevos módulos simplemente se agregan como una nueva carpeta en `features/`, sin inflar las carpetas globales.
   - **Desacoplamiento**: Las funcionalidades deben ser independientes en lo posible. Esto ayuda a mantener el código testeable y mantenible.

3. **Separación Clara entre Rutas y Negocio (`app/` vs `features/`)**:
   - La carpeta `app/` solo debe preocuparse por **qué** se renderiza (manejo de URLs, parámetros, metadata de SEO y layouts generales).
   - Delega la complejidad a los componentes y funciones importados de `features/`. Esto hace que refactorizar rutas o reutilizar componentes en distintas páginas sea trivial.

4. **Componentes Compartidos Reutilizables (`shared/`)**:
   - Fomenta la creación de un pequeño "Design System" o librería interna de componentes visuales en `shared/ui/`, evitando la duplicidad de botones, tarjetas o formularios.
   - Agrupa los adaptadores de infraestructura (`mongodb.ts`, `cloudinary.ts`) en un lugar neutro.

## Plan de Migración (Paso a Paso)

Mover la arquitectura de golpe puede causar conflictos grandes si hay otras ramas de trabajo abiertas. Se recomienda este enfoque progresivo en el futuro:

1. **Fase 1: Implementación de `src/`**
   - Mover la carpeta `app` a `src/app`. Next.js soporta esto de forma nativa.
   - Mover gradualmente `components`, `lib`, `actions`, `models`, etc. a `src/` y actualizar los *path aliases* en `tsconfig.json` (ej. `@/*` apuntando a `./src/*`).

2. **Fase 2: Creación de la capa `shared/`**
   - Mover los helpers generales a `src/shared/utils`.
   - Mover la configuración de bases de datos a `src/shared/lib`.
   - Identificar los componentes más genéricos y atómicos (botones, inputs) y moverlos a `src/shared/ui/`.

3. **Fase 3: Refactorización por Funcionalidad (Features)**
   - Empezar por el dominio más aislado, por ejemplo, Autenticación. Crear `src/features/auth/` y mover sus componentes, acciones y modelos.
   - Asegurarse de que el resto del sistema consuma Autenticación desde esta nueva ubicación.
   - Repetir el proceso dominio por dominio (`catalog`, `checkout`, `content`) hasta que las carpetas agrupadas por tipo originales queden vacías y puedan ser eliminadas de forma segura.
