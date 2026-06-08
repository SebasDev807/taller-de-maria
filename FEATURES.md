# Resumen del Proyecto: Taller de María

Este archivo documenta las características principales, la arquitectura, el stack tecnológico actual y la hoja de ruta de la aplicación **Taller de María**.

## Stack Tecnológico 💻

- **Framework Principal:** [Next.js 16](https://nextjs.org/) (App Router)
- **Biblioteca de UI:** [React 19](https://react.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Base de Datos:** MongoDB utilizando [Mongoose](https://mongoosejs.com/)
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Autenticación:** Gestión de sesiones y tokens JWT usando `jose` y encriptado de contraseñas con `bcryptjs`.
- **Lenguaje:** TypeScript

## Características Actuales ✨

### 1. Aplicación Cliente (Tienda)
La cara pública de la aplicación para los usuarios y feligreses.

- **Diseño Moderno (Santuario Digital):** Una experiencia de usuario orientada a transmitir paz y devoción, siguiendo una paleta de colores cuidadosamente seleccionada y tipografías consistentes.
- **Reflexión Diaria:**
  - **Evangelio del Día:** Widget interactivo en el inicio que muestra el título y la lectura del evangelio más reciente, alimentado desde la base de datos real.
  - **Oración del Día:** Espacio contiguo al evangelio con la oración de reflexión para acompañar el día.
- **Catálogo de Artesanías Sagradas:** Visualización de productos y artículos hechos a mano. (Actualmente muestra la interfaz con productos destacados).

### 2. Panel de Administración (Admin Dashboard)
Espacio reservado para gestionar el contenido y el inventario del proyecto.

- **Gestión de Contenido Devocional:**
  - **Formulario de Evangelios:** Herramienta interactiva conectada a Server Actions y MongoDB para la creación de nuevos evangelios. El formulario cuenta con validación estricta y se resetea al publicarse con éxito.
  - **Historial de Evangelios:** Visualización de todas las publicaciones previas, permitiendo a los administradores **eliminar** o **republicar** evangelios pasados directamente desde el panel.
  - **Formulario de Oraciones:** Preparado en su interfaz para integrarse próximamente de la misma manera que los evangelios.
- **Widgets de Resumen (Maquetación):**
  - Alertas de inventario bajo (Stock Alerts).
  - Resumen de productos recientes.
  - Gestión de categorías de la tienda.

### 3. Autenticación y Seguridad 🔒 (Backend y Base)
- **Modelo de Usuario:** Soporte en base de datos para usuarios con distintos roles y contraseñas protegidas por hash.
- **Scripts de Sembrado (Seed):** Scripts disponibles (`seed-users.ts`) para inicializar la base de datos con cuentas de administrador.

---

## Funcionalidades por Implementar (Roadmap) 🚀

Esta sección detalla las características clave que están planeadas para completarse en las próximas iteraciones.

### 1. Experiencia de Compra (Shopping Cart y Checkout)
- **Carrito de Compras Completo:**
  - Desplegable interactivo del carrito para ver productos agregados, subtotal y total.
  - Funcionalidad para añadir, remover y modificar la cantidad de los artículos directamente en el carrito usando Zustand.
- **Flujo de Pago (Checkout):**
  - Proceso de ingreso de datos de envío y facturación.
  - Integración de pasarela de pago para procesar las compras de forma segura.
  - Generación de órdenes de compra y envío de confirmaciones.

### 2. Catálogo Real y Gestión de Productos
- **Sustitución de Mocks:** Integrar el lado del cliente (Client App) con la base de datos de MongoDB para que todos los productos, categorías e inventario sean completamente reales.
- **CRUD de Productos en Panel de Administración:**
  - Interfaz de administrador para crear nuevos productos, asignarles categorías, subir sus imágenes y definir stock y precios.
  - Edición y eliminación de productos y categorías existentes.

### 3. Autenticación Frontend e Interfaces de Perfil
- **Pantallas de Login y Registro:** Interfaces de usuario finales para que administradores y clientes puedan iniciar sesión y crear sus cuentas.
- **Protección de Rutas (Middleware):** Bloquear el acceso a todo el panel de `/admin` para que solo usuarios con el rol adecuado puedan ingresar.
- **Perfil de Usuario/Cliente:** Vista privada donde un cliente pueda ver su historial de compras, información de cuenta y seguimiento de órdenes.

### 4. Gestión Completa del Contenido Devocional
- **Finalizar Lógica de Oraciones:** Conectar el formulario de Oración del admin panel con modelos de MongoDB y Server Actions (similar al Evangelio), permitiendo su historial y visualización dinámica en el inicio.

### 5. Panel de Órdenes y Alertas
- **Gestión de Órdenes (Admin):** Visualización de todas las compras realizadas por clientes, cambios de estado (preparando, enviado, completado).
- **Notificaciones de Stock Dinámico:** Conectar el widget de "Stock Alerts" en el panel de administración a la base de datos para notificar de manera automática cuando un producto se esté agotando.

## Arquitectura y Patrones 🏗️
- **Server Actions:** Uso robusto de Server Actions para interacciones eficientes y seguras entre cliente y base de datos (eliminando la necesidad estricta de rutas API `/api/` en muchos casos).
- **Diseño "Bento-Grid":** Enfoque visual moderno en la maquetación presente en toda la aplicación.
- **Modularidad:** Separación limpia de componentes orientados a UI, componentes de formulario y utilidades de backend.
