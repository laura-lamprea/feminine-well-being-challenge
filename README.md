# F2Fit Wellness Tracker 🌿

Sistema de registro de bienestar integral desarrollado para **F2Fit**. Esta herramienta permite a las usuarias realizar un seguimiento holístico de su energía física, estado emocional y hábitos diarios en menos de 30 segundos, fomentando un uso consistente y consciente.

## 🚀 Instalación y Uso

### Requisitos previos

- **Node.js** (v18 o superior)
- **PostgreSQL** (Local o vía Docker)
- **npm** o **yarn**

### Backend (NestJS)

1. Navega a la carpeta del servidor: `cd backend`.
2. Instala las dependencias: `npm install`.
3. Configura las variables de entorno en un archivo `.env`
4. Ejecuta las migraciones de Prisma: `npx prisma migrate dev`.
5. Inicia el servidor: `npm run start:dev`.

### Frontend (React + Vite)

1. Navega a la carpeta `client`.
2. Instala las dependencias: `npm install`.
3. Configura el archivo `.env` con `VITE_API_URL=http://localhost:3000`.
4. Inicia la app: `npm run dev`.

## 🏗️ Decisiones de Arquitectura (Max 500 palabras)

Para este MVP se han tomado decisiones orientadas a la escalabilidad, disponibilidad y experiencia de usuario (UX):

1. **Clean Architecture (Backend)**: Se implementó una separación clara entre las capas de Dominio, Aplicación e Infraestructura. Esto permite que la lógica de negocio (Use Cases) sea independiente del motor de base de datos (Prisma/PostgreSQL).

2. **Patrón Repository**: Facilita la realización de tests unitarios mediante mocks y asegura que el cambio de persistencia no afecte al núcleo de la aplicación.

3. **Estrategia Offline-First (Criterio 3)**: Para garantizar la persistencia inmediata sin depender de la red, se implementó una cola de sincronización en localStorage. El sistema detecta la pérdida de conexión, almacena el registro localmente y utiliza el evento online del navegador para sincronizar automáticamente al recuperar internet.

4. **Idempotencia con Upsert**: En la capa de persistencia se utiliza la operación upsert. Esto cumple con el requerimiento de permitir múltiples actualizaciones durante el día, sobrescribiendo el registro existente para el mismo userId y date sin duplicar datos.

5. **UX Determinística**: Se utilizaron escalas visuales 1-5 y selectores de hábitos con feedback inmediato para reducir la carga cognitiva, permitiendo completar el registro en el tiempo objetivo (<30s).

6. **Manejo de Timezones**: Se implementó una lógica de normalización de fechas en el cliente y servidor para asegurar que el "día local" de la usuaria coincida con el registro en la base de datos, evitando desajustes por formato UTC.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Vite, Tailwind CSS (Estilos), Lucide React (Iconos), Recharts (Gráficas).

- **Backend**: NestJS, Prisma ORM, PostgreSQL.

- **Calidad**: Jest (Unit Testing), Class-Validator (DTO Validation).

## 📊 Documentación de la API (Swagger)

### El proyecto cuenta con documentación interactiva completa generada con Swagger. Una vez que el backend esté corriendo, puedes acceder en:

🔗 Swagger UI: http://localhost:3000/api

### Endpoints Principales:

- POST /wellness/log: Crea o actualiza un registro.

- GET /wellness/stats?userId=...&date=...: Obtiene los últimos 7 días de registros partiendo de la fecha de referencia.


## 🧪 Tests Unitarios
### Ejecuta npm test en la carpeta del backend para verificar:

* LogWellnessUseCase: Validación de mapeo de DTO a Modelo.

* GetWeeklyStatsUseCase: Verificación de recuperación de datos por rango de fechas.

Correrlos con `npm run test`

<img width="361" height="880" alt="Captura de pantalla 2026-01-30 a las 11 42 31 p m" src="https://github.com/user-attachments/assets/d15b3a03-b319-4771-b313-1100a1db9872" />


