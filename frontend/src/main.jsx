import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ToastProvider } from './Contexts/ToastContext.jsx';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", 
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      {/* <React.StrictMode> */}
      <ChakraProvider>
      <ToastProvider>
        <App />
        </ToastProvider>
      </ChakraProvider>
      ,{/* </React.StrictMode> */}
    </ApolloProvider>
  </AuthProvider>
);
