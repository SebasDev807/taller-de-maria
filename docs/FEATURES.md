# Resumen del Proyecto: Taller de María

Este archivo documenta las características principales, la arquitectura, el stack tecnológico actual y la hoja de ruta de la aplicación **Taller de María**.

## Stack Tecnológico 💻

- **Framework Principal:** [Next.js 16](https://nextjs.org/) (App Router)
- **Biblioteca de UI:** [React 19](https://react.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Base de Datos:** MongoDB utilizando [Mongoose](https://mongoosejs.com/)
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) (Carrito y UI)
- **Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Autenticación:** Gestión de sesiones y tokens JWT usando `jose` y encriptado de contraseñas con `bcryptjs`.
- **Integraciones de Terceros:** 
  - **Imágenes:** [Cloudinary](https://cloudinary.com/)
  - **Correos Electrónicos:** [Resend](https://resend.com/) + React Email
- **Lenguaje:** TypeScript

## Características Actuales ✨

### 1. Aplicación Cliente (Tienda y Devocional)
La cara pública de la aplicación para los usuarios y feligreses.

- **Diseño Moderno (Santuario Digital):** Una experiencia de usuario orientada a transmitir paz y devoción, utilizando paletas de colores cuidadosamente seleccionadas, maquetación estilo "Bento-Grid" y componentes atómicos optimizados (ej. `TopNavBar` modular).
- **Reflexión Diaria:**
  - **Evangelio y Oración del Día:** Widgets interactivos alimentados desde la base de datos real.
  - **Lecturas Guardadas:** Los usuarios autenticados pueden guardar sus lecturas y reflexiones favoritas.
- **Catálogo de Artesanías Sagradas:**
  - Catálogo completamente funcional conectado a MongoDB.
  - Filtros por categorías, búsqueda de productos y visualización de detalles.
- **Experiencia de Compra:**
  - Carrito de compras interactivo persistido y gestionado mediante Zustand.
  - Flujo de *Checkout* completo con generación de órdenes de compra.
- **Autenticación y Perfil de Usuario:**
  - Registro e inicio de sesión seguros.
  - Verificación de cuenta mediante correo electrónico usando tokens y Resend.
  - Panel de perfil de usuario para ver historial de compras y preferencias.

### 2. Panel de Administración (Admin Dashboard)
Espacio seguro reservado para gestionar el negocio y el contenido, protegido mediante Middlewares y verificación de roles.

- **Gestión de Inventario y Catálogo:**
  - CRUD completo de **Productos** y **Categorías**.
  - Subida de imágenes optimizada con Cloudinary, incluyendo la limpieza automática de carpetas y recursos cuando se eliminan productos.
- **Gestión de Contenido Devocional e Institucional:**
  - Interfaz de administración para crear, editar, eliminar y republicar **Evangelios** y **Oraciones**.
  - Sincronización y edición del contenido dinámico de la página **"Acerca de" (About Page)**.
- **Gestión de Órdenes:**
  - Visualización y administración de los pedidos realizados por los clientes y actualización de sus estados.

### 3. Arquitectura y Patrones 🏗️
- **Server Actions:** Utilización extensiva de Server Actions para realizar mutaciones de datos y consultas de manera segura, sin depender excesivamente de rutas de API.
- **Seguridad Robusta:** Encriptación de contraseñas, tokens JWT, protección de rutas mediante Next.js Middleware y control de acceso basado en roles (RBAC).
- **Atomicidad y Modularidad:** Refactorización constante de componentes grandes (como barras de navegación) en subcomponentes atómicos para mejorar la mantenibilidad.

---

## Funcionalidades por Implementar (Roadmap) 🚀

Esta sección detalla las características clave planeadas para el futuro.

1. **Integración de Pasarelas de Pago:** Implementar cobros reales con Stripe o PayPal.
2. **Alertas de Stock Dinámicas:** Notificaciones en tiempo real o correos electrónicos cuando el inventario de un producto alcance niveles bajos.
3. **Módulo de Reseñas:** Permitir a los clientes dejar calificaciones y reseñas en los productos comprados.
4. **Analíticas del Dashboard:** Gráficos de ventas, visitantes y conversión dentro del panel de administrador.
5. **Migración Arquitectónica:** Transición hacia una **Arquitectura Basada en Funcionalidades (Feature-Driven)** encapsulada en una carpeta `src/`, tal como se detalla en el documento `FUTURE_WORKS.md`.
