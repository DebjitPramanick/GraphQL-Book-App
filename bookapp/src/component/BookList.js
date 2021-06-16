import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_BOOKS, GET_BOOK_DETAILS } from '../queries/Queries';
import BookDetails from './BookDetails';

const BookList = () => {

    const { loading, error, data } = useQuery(GET_BOOKS);

    const [cur, setCur] = useState(null)


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
                            <div key={b.id} className="book-item">
                                <li onClick={() => setCur(b.id)}>{b.name}</li>
                                {cur === b.id ? <BookDetails id={cur} close={setCur}/> : null}
                            </div>

                        ))
                    }
                </ul>
            </div>
        )
    }


}

export default BookList
