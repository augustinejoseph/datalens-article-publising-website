import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your backend server URL
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <ApolloProvider client={client}>

 {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </ApolloProvider>

  </AuthProvider>
)
