import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/antd/dist/reset.css";
import { MonopolyProvider } from "./containers/hooks/useMonopoly";
import {ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpuri = process.env.NODE_ENV === "production"
  ? "/graphql"
  : "http://localhost:4000/graphql";

const WS_URL = process.env.NODE_ENV === "production"
  ? window.location.origin.replace(/^http/, "ws")
  : "ws://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
  });

const wsLink = new GraphQLWsLink(createClient({
  url: "ws://localhost:4000/graphql",
  options: {
    lazy: true,
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>  
      <MonopolyProvider><App /></MonopolyProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
