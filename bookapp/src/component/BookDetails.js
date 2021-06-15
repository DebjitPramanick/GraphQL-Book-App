import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_BOOK_DETAILS } from '../queries/Queries';

const BookDetails = (props) => {

    const {id, close} = props

    const { data, loading } = useQuery(GET_BOOK_DETAILS, {
        variables: { id: id },
    });

    if(loading){
        return <p>Loading...</p>
    }
    else{
        return (
            <div className="book-details" onClick={() => close('')}>
                <h1>{data.book.name}</h1>
                <h3>{data.book.genre}</h3>
                <h2>{data.book.author.name}</h2>
                <p>fsssssssssss</p>
    
            </div>
        )
    }
}

export default BookDetails
