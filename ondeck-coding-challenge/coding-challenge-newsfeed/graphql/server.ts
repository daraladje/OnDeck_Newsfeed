import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from './resolvers';

const typeDefs = gql`
  type Project implements Event {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User implements Event {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Announcement implements Event {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
  }

  interface Event {
    id: Int!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    announcement(id: Int!): Announcement!
    events(filter: String!, limit: Int!, offset: Int!): [Event!]!
    count(filter: String!): Int!
    search(where: String!): [Event!]!
  }
`;
export const server = new ApolloServer({ typeDefs, resolvers });
