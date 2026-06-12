# SouMega - Sistema de Gestão de Proejetos e Membros da Mega Jr.

## O projeto foi desenvolvido durante o processo seletivo da Mega
## Tem a função de criar um sistema web para facilitar a visualização e controle dos Projetos que estão ligados a empresa Jr., visualizar os membro que atualmente participam e quais membros estão alocados em cada projeto.

## Stack utilizada
### Front-end
- React 
- Vite
- TailwindCSS 
- Router-React-DOM
- Lucide-Icons

### Back-end
- NodeJS
- Express

## Funcionalidades mínimas (MVP)

* **Controle de Acesso:** Sistema de login com validação de permissões por cargo (Diretor vs. Membro).
* **Gestão de Membros:** Cadastrar, listar, editar e remover (CRUD completo).
* **Gestão de Projetos:** Cadastrar, listar, editar e remover (CRUD completo).
* **Alocação de Equipes:** Vinculação direta de membros aos projetos ativos.
* **Dashboard Interativo:** Painel com indicadores reais mostrando os totais de membros e projetos.

## Pré-requisistos


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

#### Frontend

```bash
cd frontend
npm install
```
### 3️. Configurar as Variáveis de Ambiente

#### Backend (`backend/.env`)


#### Frontend (`frontend/.env`)

```env
VITE_API_URL= "https://soumega.onrender.com"
```
### 4️. Preparar o Banco de Dados


### 5️. Executar a Aplicação

#### Backend

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

## Equipe
* **Gabriel** - Front-end
* **Diogo** - Back-end
* **Heitor** - Back-end 