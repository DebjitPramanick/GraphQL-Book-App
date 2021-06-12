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
                return Author.findById(parent.authorId)
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
                return Book.find({authorId: parent.id})
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
                
                return Book.findById(args.id)
            }
        },
        author: { 
            type : AuthorType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args){
                // Code to get data from db/other source
                
                return Author.findById(args.id)
            }
        },

        // Query for list of books, authors
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        },
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            async resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                const res = await author.save()
                return res
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            async resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                const res = await book.save()
                return res
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})

