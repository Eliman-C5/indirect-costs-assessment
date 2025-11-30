import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { ApolloProvider } from '@apollo/client/react';
import { App } from './App.tsx';

const link = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
