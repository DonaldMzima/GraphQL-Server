import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]  
  }
  
  type Review {
    id: ID!
    rating: Int!
    content: [String!]!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]  
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
  }

  type Mutation {
    editGame(id: ID!,edit:EditGameInput!):Game
    addGame (game : AddGameInput) : Game
    deleteGame(id: ID!): [Game]
  }
  
  input AddGameInput {
    title: String!
    platform: [String!]!
  }

  input EditGameInput {
    id :ID
    title: String
    platform: [String!]
  }

`

let games = [
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
]

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
]

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
]

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  // Query: {
  //   books: () => books,
  // },
  Query: {
    games: () => games,
    game: (_: unknown, args: { id: any }) =>
      games.find((game) => game.id === args.id),
    authors: () => authors,
    reviews: () => reviews,
    //this is for a single data request from the reviews.
    review: (_: unknown, args: { id: string }) =>
      reviews.find((review) => review.id === args.id),
  },

  //related resolvers are declared inside query because they are entry points to graph.
  Game: {
    //parent query for a single.
    reviews: (parent: any) => reviews.filter((r) => r.gameId === parent.id),
  },

  Author: {
    reviews: (parent: any) => reviews.filter((r) => r.authorId === parent.id),
  },

  Review: {
    author: (parent: any) => authors.filter((a) => a.id === parent.authorId),
    game: (parent: any) => games.filter((g) => g.id === parent.gameId),
  },

  Mutation: {
    // This defines a GraphQL mutation named "deleteGame."
    deleteGame(_: unknown, args: any) {
      // This is the resolver function for the "deleteGame" mutation.
      games = games.filter((g) => g.id !== args.id) // This line removes a game from the "games" array based on the provided "args.id."
      // The filter function checks each game's "id" against the provided "args.id" and keeps only those where they are not equal (!==).

      return games // After the game is deleted, the updated "games" array is returned.
    },

    addGame(_: unknown, args: any) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      }
      games.push(game)

      return game
    },

    editGame(_: unknown, args: any) {
      games = games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edit }
        }
        return g
      })

      return games.find((g) => g.id === args.id)
    },
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
})

console.log(`🚀  Server ready at: ${url}`)
