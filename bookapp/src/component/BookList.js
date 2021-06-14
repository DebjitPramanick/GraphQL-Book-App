import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BOOKS } from '../queries/Queries';

const BookList = () => {

    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) {
        return (
            <div className="booklist">
                <p>Loading...</p>
            </div>
        )
    }
    else {
        return (
            <div className="booklist">
                <h2>Book List</h2>
                <br />
                <ul>
                    {
                        data.books.map(b => (
                            <li key={b.id}>{b.name}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }


}

export default BookList
