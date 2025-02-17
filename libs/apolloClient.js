// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // Replace with your Strapi GraphQL endpoint
  cache: new InMemoryCache(),
});

export default apolloClient;
