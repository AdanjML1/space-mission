🚀 Space Mission App

Gestión de astronautas con Frontend en React y Backend en Node.js + Express + Prisma + PostgreSQL.

📝 Descripción

Space Mission es una aplicación fullstack que permite:

Registrar y autenticar usuarios.

Crear, listar, editar y eliminar astronautas.

Manejar sesiones con tokens locales.

UI moderna y funcional en React.

⚙️ Requisitos

Node.js >= 18

PostgreSQL

npm o yarn

🔧 Backend Setup

Entrar a la carpeta del backend:

cd backend


Instalar dependencias:

npm install


Instalar Prisma y cliente:

npm install prisma --save-dev
npm install @prisma/client


Configurar .env con tu base de datos:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"


Inicializar Prisma (si no existe):

npx prisma init

Ejecutar migraciones:

npx prisma migrate dev --name init


Generar Prisma Client:

npx prisma generate


Ejecutar servidor:

npm run dev


Servidor corriendo en http://localhost:3000.

🖥️ Frontend Setup

Entrar a la carpeta del frontend:

cd frontend


Instalar dependencias:

npm install


Configurar endpoint de API en src/lib/api.ts:

export const api = (path: string, options?: RequestInit) =>
  fetch(`http://localhost:3000${path}`, { 
    headers: { 'Content-Type': 'application/json' }, 
    ...options 
  }).then(res => res.json());


Ejecutar frontend:

npm run dev

Frontend corriendo en http://localhost:5173.

🚀 Funcionalidades

✅ Registro y login de usuarios

✅ CRUD de astronautas

✅ Logout y manejo de sesiones

✅ UI moderna y responsive

📌 Scripts útiles

Backend

Script	Descripción
npm run dev	Inicia el servidor en dev
npm run build	Construye el backend

Frontend

Script	Descripción
npm run dev	Inicia Vite para desarrollo
npm run build	Construye frontend
npm run preview	Preview del build
💡 Notas

El frontend depende del backend activo.

Para agregar nuevos modelos, ejecutar:

npx prisma migrate dev
npx prisma generate


Puedes probar la API con Postman o Insomnia.
