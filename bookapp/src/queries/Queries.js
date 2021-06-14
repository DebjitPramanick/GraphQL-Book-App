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