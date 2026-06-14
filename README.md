# SouMega - Sistema de Gestão de Projetos e Membros da Mega Jr.

## O projeto foi desenvolvido durante o processo seletivo da Mega

## Tem a função de criar um sistema web para facilitar a visualização e controle dos Projetos que estão ligados a empresa Jr., visualizar os membro que atualmente participam e quais membros estão alocados em cada projeto.

## Stack utilizada

### **Design:**

- Figma

### **Front-end:**

- React v18.3.1
- Vite v5.4.1
- Tailwind CSS v4.3.0

### **Back-end:**

- Node.js v24.15.0
- Express v5.2.1
- PostgreSQL

### ORM

- Prisma ORM v5.22.0

## Bibliotecas e Dependências

### Front-end

- React Router DOM v7.15.1 — gerenciamento de rotas da aplicação
- Lucide React v1.16.0 — biblioteca de ícones

### Back-end

- Bcrypt v6.0.0 — hash e verificação de senhas
- JSON Web Token (JWT) v9.0.3 — autenticação baseada em tokens
- CORS v2.8.6 — controle de acesso entre diferentes origens
- Dotenv v17.4.2 — gerenciamento de variáveis de ambiente
- Swagger JSDoc v6.3.0 — geração da documentação da API
- Swagger UI Express v5.0.1 — interface visual da documentação da API

## Funcionalidades mínimas (MVP)

- **Controle de Acesso:** Sistema de login com validação de permissões por cargo (Diretor vs. Membro).
- **Gestão de Membros:** Cadastrar, listar, editar e remover (CRUD completo).
- **Gestão de Projetos:** Cadastrar, listar, editar e remover (CRUD completo).
- **Alocação de Equipes:** Vinculação direta de membros aos projetos ativos.
- **Dashboard Interativo:** Painel com indicadores reais mostrando os totais de membros e projetos.

## Pré-requisistos

Antes de executar o projeto, é necessário ter instalado:

- Node.js v24.15.0
- Git

## Passos para instalação

Certifique-se de ter instalado em sua máquina:

- Node.js
- npm

### 1️. Clonar o Repositório

```bash
git clone URL_DO_REPOSITORIO
cd soumega
```

### 2️. Instalar as Dependências

#### Backend

```bash
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3️. Configurar as Variáveis de Ambiente

#### Backend (`backend/.env`)

```env
DATABASE_URL="SUA_DATABASE_URL"
JWT_SECRET="SEU_JWT_SECRET"
PORT=3000
```

#### Frontend (`frontend/.env`)

```env
VITE_API_URL= "https://soumega.onrender.com"
```

### 4️. Preparar o Banco de Dados
Executar as migrações do Prisma:

```bash
npx prisma generate
npx prisma db push
```

Opcionalmente(para alterar membros diretamente do banco):

```bash
npx prisma studio
```

### 5️. Executar a Aplicação

#### Backend
```bash
node server.js
```

#### Frontend

```bash
npm run dev
```

### 6️. Acessar a Aplicação

Frontend:

Acesso Local:

```text
http://localhost:5173
```

Acesso Remoto:

```text
https://sou-mega.vercel.app/
```

Backend:

Acesso Local:

```text
http://localhost:3000
```

Acesso Remoto:

```text
https://soumega.onrender.com
```

## Documentação da API

Acesso Local:

http://localhost:3000/docs

Acesso Remoto:

https://soumega.onrender.com/docs

## Equipe

- **Gabriel** - Front-end
- **Diogo** - Back-end
- **Heitor** - Back-end
