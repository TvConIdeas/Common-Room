# 🎬 Common Room | v.2.0

---

## ✒️ Autores

- **Fenoy Rivas, Delfina**
- **Francano, Ian**
- **Pérez, Lola**

---

## 📌 Descripción General

Common Room es una aplicación web full-stack orientada a la comunidad cinéfila. Permite a los usuarios compartir reseñas, descubrir películas, gestionar perfiles personales y explorar contenido proveniente de la API externa TheMovieDB.

El proyecto fue desarrollado utilizando **Java 21 + Spring Boot 3.4.5** en el backend y **Angular 20** en el frontend, aplicando prácticas modernas de arquitectura, autenticación JWT, validaciones, documentación OpenAPI y un diseño modular escalable.

Este sistema forma parte del trabajo integrador final de las materias **Programación IV** y **Gestión de Proyectos de Software**, dentro de la **Tecnicatura Universitaria en Programación – UTN FRMDP**.

---

## 🎯 Propósito del Proyecto

El proposido de esta plataforma es ser intuitiva y dinámica donde los usuarios puedan:

- Explorar películas a través de un catálogo actualizado.
- Publicar, modificar y eliminar reseñas.
- Visualizar perfiles y opiniones de otros miembros.
- Interactuar mediante puntajes, listas _(funcionalidad propuesta como cambio evolutivo)_ y recomendaciones.

El objetivo principal es fomentar la participación dentro de una comunidad basada en gustos cinematográficos.

---

## 🌐 Funcionalidades Principales

### Gestión de Usuarios

- Registro con validaciones.
- Login con autenticación JWT.
- **Roles:** Visitante, Miembro, Moderador.
- Edición y eliminación de perfil.
- Visualización de perfiles públicos.

### Reseñas

- Alta, baja y modificación de reseñas propias.
- Visualización de reseñas por película o por usuario.
- Control de permisos según rol.
- Puntuaciones entre 0.5 y 5.

### Películas

- Consulta a TheMovieDB (TMDB).
- Fichas detalladas con datos dinámicos.
- Búsqueda y filtrado con paginación.
- Mensajes de estado claros.

### Interactividad

- Likes _(Proximamente)_ y exploración de contenido de otros usuarios.
- Perfiles accesibles de forma pública.

### Administración

- Moderación de usuarios.
- Eliminación de reseñas inapropiadas.
- Gestión de roles.

---

## 🔧 Tecnologías Utilizadas

### 💻 Backend

- **Java 21**
- **Spring Boot 3.4.5**
  - Spring Web _(REST)_
  - Spring Data JPA
  - Spring Security _(JWT y roles)_
  - Spring Mail
  - Spring Validation
  - DevTools
- **JWT** _(manejo de tokens)_
- **MySQL** _(base de datos relacional)_
- **SpringDoc OpenAPI** _(Swagger)_
- **Lombok**

### 🖌️ Frontend

- **Angular 20**
- **HTML + CSS**
- **TypeScript**

### 🍿 API externa

- [TheMovieDB](https://www.themoviedb.org/) _(datos dinámicos de películas)_

---

## 📦 Dependencias en `pom.xml`

Entre las más relevantes se incluyen:

- `spring-boot-starter-web` → Exposición de endpoints REST.
- `spring-boot-starter-security` → Manejo de roles y autenticación JWT.
- `spring-boot-starter-data-jpa` → ORM con Hibernate.
- `spring-boot-starter-validation` → Validación de formularios.
- `spring-boot-starter-mail` → Envío de emails automáticos.
- `springdoc-openapi-starter-webmvc-ui` → Swagger UI para documentación.
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson` → Seguridad JWT.
- `mysql-connector-j` → Conexión a base de datos.
- `lombok` → Reducción de boilerplate.

---

## ✅ Requisitos Funcionales Destacados

- RF01: Registro de nuevos usuarios.
- RF04-RF06: ABM de reseñas.
- RF15-RF17: ABM de listas personalizadas.
- RF12, RF13: Visualización de películas desde la API externa.
- RF28-RF29: Moderación de usuarios y asignación de roles.
- RF30-RF32: Exploración de perfiles de otros usuarios.

> Para ver todos los requisitos, consultar la [documentación completa en PDF](./docs/gestion/Documentos/TPFinal_Gestion_GrupoN°X_FenoyRivas_Francano_Perez_Checkpoint2.pdf).

> Para ver la auditoria y diagramas del proyecto, consultar la [documentación completa en PDF](./docs/metodologia/Auditoria_Metodologia.pdf).

---

## 👥 Roles y Permisos

- **Visitante:** Puede explorar películas, reseñas y listas públicas.
- **Miembro:** Puede crear contenido _(reseñas, listas)_, favear, editar su perfil.
- **Moderador:** Puede suspender usuarios, modificar roles y eliminar contenido inapropiado.

---

## 🏫 Contexto Académico

Este proyecto fue desarrollado en el marco de la **Tecnicatura Universitaria en Programación** en la **Universidad Tecnológica Nacional (UTN) – Facultad Regional Mar del Plata**, como trabajo final integrador de la materia Programación IV.

- Fecha de entrega: **17 de noviembre de 2025**
- Docente: **Lucrecia Bazán**
- Comision : **2**
- Grupo N°5
- Minuta del proyecto : [Link](https://docs.google.com/spreadsheets/d/1ofb9SEeJdl3FvoqmaAEXirbTYtGzYBaV5KgD8BOETCs/edit?usp=sharing)

---

## 📄 Licencia

Proyecto desarrollado con fines académicos. Distribución libre con fines educativos.
