import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
{
    books{
        name
        id
    }
}
`

export const GET_AUTHORS = gql`
{
    authors{
        name
        id
        books{
            name
            genre
            id
        }
    }
}
`

export const ADD_BOOKS = gql`
    mutation AddTodo($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
        }
    }
`

export const ADD_Author = gql`
    mutation AddAuthor($name: String!, $age: Int!) {
        addAuthor(name: $name, age: $age) {
            id
            name
        }
    }
`

export const GET_BOOK_DETAILS = gql`
    query($id: ID){
        book(id:$id){
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`