import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { API_GRAPHQL_IP, API_GRAPHQL_PORT } from "./config/const";

const wsLink = new WebSocketLink({
  uri: `ws://${API_GRAPHQL_IP}:${API_GRAPHQL_PORT}`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
  uri: `http://${API_GRAPHQL_IP}:${API_GRAPHQL_PORT}`,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
