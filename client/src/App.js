import React from 'react';
import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBooks from './components/AddBooks';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <BookList />
        <AddBooks />
      </div>
    </ApolloProvider>
  );
}

export default App;
