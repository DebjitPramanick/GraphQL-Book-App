const graphql = require('graphql');
const _ = require('lodash');
const Book = require("../models/Book.js")
const Author = require("../models/Author.js")

// GraphQL Schema

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql


var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '2', authorId: '2' },
    { name: 'Haunted House', genre: 'Horror', id: '3', authorId: '1' },
    { name: 'Galactic', genre: 'Sci-Fi', id: '4', authorId: '2' },
    { name: 'Maze Runner', genre: 'Adventure', id: '5', authorId: '3' },
]

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'David Johanson', age: 56, id: '2' },
    { name: 'Mark Sanderson', age: 39, id: '3' },
]
    

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type : GraphQLID },
        name: { type : GraphQLString },
        genre: { type : GraphQLString },
        author: { 
            type : AuthorType,
            resolve(parent, args){
                // return _.find(authors, {id: parent.authorId})
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type : GraphQLID },
        name: { type : GraphQLString },
        age: { type : GraphQLInt },
        books: {
            type : new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id})
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type : BookType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args){
                // Code to get data from db/other source
                
                // return _.find(books, {id: args.id});
            }
        },
        author: { 
            type : AuthorType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args){
                // Code to get data from db/other source
                
                // return _.find(authors, {id: args.id});
            }
        },

        // Query for list of books, authors
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType
})

