import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const headers = {
  "x-client-id": "651e5a8612e5356e23ce5a57",
  "x-app-id": "651e5a8612e5356e23ce5a59",
};

// Initialize Apollo Client with custom cache configuration
const client = new ApolloClient({
  uri: "https://api.chargetrip.io/graphql",
  headers,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

reportWebVitals();
