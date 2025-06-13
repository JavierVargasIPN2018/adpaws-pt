# Todo App Backend - Prueba Técnica Adpaws

Este proyecto es una API backend desarrollada con **NestJS**, **GraphQL (Apollo)**, **Prisma** y **PostgreSQL**, diseñada para manejar una aplicación de tareas estilo tablero Kanban.

---

## 🎓 Requisitos cumplidos de la prueba técnica

### 1. CRUD de tareas

* Mutation y query completas para: crear, actualizar, eliminar y listar tareas.

### 2. Columnas iniciales

* Al crear un nuevo usuario, se generan automáticamente 3 columnas base: `TODO`, `IN PROGRESS` y `DONE`.
* El usuario puede agregar hasta 2 columnas personalizadas.
* Las columnas base están protegidas contra eliminación.

### 3. Reordenamiento de columnas

* Cada columna tiene un campo `order`.
* El orden se puede modificar con `updateColumn`.
* ✔️ (Básico). Se recomienda agregar una mutation `reorderColumns` para mayor claridad.

### 4. Reubicación de tareas al eliminar columna

* Si se elimina una columna personalizada que contiene tareas, éstas se mueven automáticamente a la columna `TODO`.

---

## 🚀 Tecnologías utilizadas

* **NestJS**
* **TypeScript**
* **GraphQL con Apollo Server**
* **Prisma (ORM)**
* **PostgreSQL**
* **Docker y Docker Compose**

---

## 🧰 Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Crea el archivo `.env`

```bash
cp .env.example .env
```

Y verifica que tenga:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/todoapp"
```

### 4. Levanta la base de datos y la app con Docker

```bash
docker-compose up -d --build
```

Esto:

* Levanta PostgreSQL
* Construye la app de NestJS
* Aplica las migraciones y el `seed`

### 5. Accede a GraphQL Playground

```
http://localhost:3000/graphql
```

Agrega en la pestaña de "HTTP Headers":

```json
{
  "x-user-id": "<id_del_usuario_creado_por_el_seed>"
}
```

---

## ✍️ Ejemplos de queries

### Obtener tareas:

```graphql
query {
  tasks {
    id
    title
    columnId
  }
}
```

### Crear tarea:

```graphql
mutation {
  createTask(input: {
    title: "Nueva tarea",
    description: "Detalles",
    columnId: "<id_columna>"
  }) {
    id
    title
  }
}
```

---

## 🛠️ Build manual sin Docker

```bash
npx prisma migrate dev
npm run seed
npm run start:dev
```

---

## 👁️ Bonus: Uso de headers simulando auth

Se implementó un decorador `@UserId()` que toma el `userId` desde los headers:

```json
{
  "x-user-id": "uuid-del-usuario"
}
```

Esto evita exponer `userId` como argumento en cada query.

---

## 🚫 Seguridad

* Las columnas base no pueden eliminarse.
* Las tareas huérfanas se reubican a `TODO`.

