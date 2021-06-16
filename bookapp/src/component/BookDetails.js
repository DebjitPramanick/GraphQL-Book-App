import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_BOOK_DETAILS } from '../queries/Queries';

const BookDetails = (props) => {

    const { id, close } = props

    const { data, loading } = useQuery(GET_BOOK_DETAILS, {
        variables: { id: id },
    });

    console.log(data)

    if (loading) {
        return <p>Loading...</p>
    }
    else {
        return (
            <div className="book-details" onClick={() => close('')}>
                <h1>{data.book.name}</h1>
                <h3>{data.book.genre}</h3>
                <h2>{data.book.author.name}</h2>
                {data.book.author.books.map(b => {
                    if (b.id !== id) {
                        return (
                            <div className="other-books">
                                {b.name}
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

export default BookDetails
