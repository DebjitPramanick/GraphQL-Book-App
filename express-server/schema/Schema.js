const graphql = require('graphql');
const _ = require('lodash');

// GraphQL Schema

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql


var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '2' },
    { name: 'Haunted House', genre: 'Horror', id: '3' },
    { name: 'Galactic', genre: 'Sci-Fi', id: '4' },
    { name: 'Maze Runner', genre: 'Adventure', id: '5' },
]
    

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type : GraphQLString },
        name: { type : GraphQLString },
        genre: { type : GraphQLString }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type : BookType,
            args : { id : { type : GraphQLString } },
            resolve(parent, args){
                // Code to get data from db/other source
                
                return _.find(books, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType
})

