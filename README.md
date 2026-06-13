# Farmacov — Frontend

Aplicación web para la gestión de una farmacia. Permite a los usuarios consultar un catálogo de medicamentos, comparar productos, analizar síntomas, revisar su historial de compras y generar reportes. Los administradores cuentan con un dashboard y módulos de gestión de usuarios.

Construida con **React 19 + TypeScript + Vite**, usando MUI, Tailwind CSS, TanStack Query y Zustand.

---

## Requisitos previos

- Node.js >= 18
- Yarn
- Nota: Se debe ejecutar todo el archivo .sql, con la finalidad de obtener todas las entidades dentro del servidor MySQL local y que el login funcione.
- Tener corriendo el repositorio local de backend-farmacov: https://github.com/Farmacov-dev/backend-farmacov.git

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd frontend-farmacov
```

### 2. Instalar dependencias

```bash
yarn install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido (proporcionado por el equipo):

```env
# Contenido del .env será proporcionado en el documento final de entrega
```

### 4. Iniciar el servidor de desarrollo

```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Usuarios de prueba

| Email | Contraseña |
|---|---|
| jrodriguez@farmacov.com | 12345678 |

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `yarn dev` | Inicia el servidor de desarrollo |
| `yarn build` | Compila la aplicación para producción |
| `yarn preview` | Previsualiza el build de producción |
| `yarn test` | Ejecuta las pruebas unitarias con Vitest |
| `yarn test:coverage` | Ejecuta pruebas con reporte de cobertura |
| `yarn lint` | Analiza el código con ESLint |
| `yarn storybook` | Inicia Storybook en `http://localhost:6006` |
