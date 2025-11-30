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