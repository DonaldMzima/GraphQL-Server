import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type Game{
    id:ID!,
    title:String!,
    plartform:[String!]!   
  }
  
  type Review{
    id:ID!,
    rating:Int!,
    contant:[String!]!   
  }

  type Author{
    id:ID!,
    name:String!,
    verified:Boolean!   
  }

  type Query{
    games:[Game]
    reviews:[Review]
    authors: [Author]
  }
`;
const games = [
    {
        id: '1',
        title: 'Game 1',
        platform: ['PC', 'PlayStation'],
    },
    {
        id: '2',
        title: 'Game 2',
        platform: ['Xbox', 'Nintendo Switch'],
    },
    {
        id: '3',
        title: 'Game 3',
        platform: ['PC', 'Xbox'],
    },
    {
        id: '4',
        title: 'Game 4',
        platform: ['PlayStation', 'Nintendo Switch'],
    },
    {
        id: '5',
        title: 'Game 5',
        platform: ['PC'],
    },
    {
        id: '6',
        title: 'Game 6',
        platform: ['PlayStation'],
    },
    {
        id: '7',
        title: 'Game 7',
        platform: ['Xbox'],
    },
    {
        id: '8',
        title: 'Game 8',
        platform: ['Nintendo Switch'],
    },
];
const authors = [
    {
        id: '1',
        name: 'Author 1',
        verified: true,
    },
    {
        id: '2',
        name: 'Author 2',
        verified: false,
    },
    {
        id: '3',
        name: 'Author 3',
        verified: true,
    },
    {
        id: '4',
        name: 'Author 4',
        verified: false,
    },
    {
        id: '5',
        name: 'Author 5',
        verified: true,
    },
    {
        id: '6',
        name: 'Author 6',
        verified: false,
    },
    {
        id: '7',
        name: 'Author 7',
        verified: true,
    },
    {
        id: '8',
        name: 'Author 8',
        verified: false,
    },
];
const reviews = [
    {
        id: '1',
        rating: 4,
        content: ['Good game', 'Enjoyed playing it'],
        authorId: '1',
        gameId: '1',
    },
    {
        id: '2',
        rating: 5,
        content: ['Amazing game', 'Highly recommended'],
        authorId: '2',
        gameId: '2',
    },
    {
        id: '3',
        rating: 3,
        content: ['Decent game', 'Could be better'],
        authorId: '3',
        gameId: '3',
    },
    {
        id: '4',
        rating: 4,
        content: ['Solid gameplay', 'Great graphics'],
        authorId: '4',
        gameId: '4',
    },
    {
        id: '5',
        rating: 2,
        content: ['Not impressed', 'Needs improvement'],
        authorId: '5',
        gameId: '5',
    },
    {
        id: '6',
        rating: 5,
        content: ['Fantastic!', 'A must-play'],
        authorId: '6',
        gameId: '6',
    },
    {
        id: '7',
        rating: 4,
        content: ['Enjoyed it', 'Would play again'],
        authorId: '7',
        gameId: '7',
    },
    {
        id: '8',
        rating: 3,
        content: ['Mixed feelings', 'Some pros and cons'],
        authorId: '8',
        gameId: '8',
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    // Query: {
    //   books: () => books,
    // },
    Query: {
        games: () => games,
        authors: () => authors,
        reviews: () => reviews,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
});
console.log(`🚀  Server ready at: ${url}`);
