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
