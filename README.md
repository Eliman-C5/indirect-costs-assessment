# Indirect Costs Control System

Web application for quoting indirect costs of industrial operations.

## Technologies

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Typed language
- **Apollo Server** - GraphQL server
- **Prisma** - Database ORM
- **MySQL** - Relational database
- **GraphQL** - Query language

### Frontend
- **React** - JavaScript library
- **TypeScript** - Static typing
- **Vite** - Build tool
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library

## Project Structure

        codeable-challenge/ 
	    backend/
		    prisma/
			    src/
				    graphql/
				    server.ts
		frontend
			public
			src/
				components/
				graphql/
				hooks/
				App.tsx

## Installation

### Installation and Execution
1. Clone the repository (git clone `url`)
2. Install dependencies for each folder
    - Backend: `npm install`
    - Frontend: `npm install`
3. Configure environment variables
    - Backend: 
        - `DATABASE_URL`
        - `DATABASE_USER`
        - `DATABASE_PASSWORD`
        - `DATABASE_NAME`
        - `DATABASE_HOST`
        - `DATABASE_PORT`
        - `PORT`
    - Frontend:
        - `VITE_API_URL`
4. Set up Prisma
    - Backend: 
        - `npm run prisma:migrate`
        - `npm run prisma:seed`
5. Start the servers:
    - Backend: `npm run dev`
    - Frontend: `npm run dev`

    ¡Entendido\! Aquí tienes la respuesta estructurada para la **Parte 4: Estrategia y Flujo de Git**, siguiendo las convenciones específicas que solicitaste (utilizando `git pull` para la integración) y presentada en formato Markdown, lista para anexar a tu `README.md`.

-----

## Git Strategy and Workflow

### Branching Convention

We will use a convention based on the type of change (**Feature Branching**) for a clear and organized history.

➡️ **Convention:** `git checkout -b <type>/<description>`
➡️ **Example:** `git checkout -b feat/frontend-config`

### Keeping the Branch Updated using `pull` (Merge)

To keep the development branch synchronized with the central `main` branch, we will use **`git pull origin main`**. This method integrates changes by creating a **new merge commit**.

| Step | Command | Purpose |
| :--- | :--- | :--- |
| **1. Ensure Branch is Clean** | `git status` | Commit or stash all local changes before pulling. |
| **2. Pull and Merge** | `git pull origin main` | Fetches changes from `origin/main` and immediately integrates them by creating a **merge commit** on the current branch. |

**Note on History:** This approach creates a **non-linear history** with frequent merge commits. Therefore, writing descriptive and clear commit messages is crucial to keep the project history auditable.

### 3\. Handling Conflicts in `schema.graphql`

#### Resolution Steps:

1.  **Detection:** When running `git pull origin main`, Git will notify you that an automatic merge failed, specifically in `backend/src/graphql/schema.graphql`.

2.  **Manual Editing:** Open the file and locate the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

3.  **Semantic Merge:** Manually edit the file to **combine** the definitions. For example, if you added a new `Query` and a colleague added a new `Mutation`, ensure both definitions are present and correctly formatted according to GraphQL syntax.

4.  **Confirm and Finish:** Stage the resolved file and finalize the merge:

    ```bash
    git add backend/src/graphql/schema.graphql
    git commit -m "Merge branch 'main' into feat/indirect-costs-module and resolve schema conflicts"
    ```