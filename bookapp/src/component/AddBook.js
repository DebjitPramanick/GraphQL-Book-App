import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../queries/Queries';

const AddBook = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);
    console.log(data)

    if (loading) {
        return (
            <div className="addBook">
                <p>Loading...</p>
            </div>
        )
    }
    else {
        return (
            <div className="addBook">
                <h2>Add Book Form</h2>
                <br/>
                <form>
                    <input placeholder="Enter name..." />
                    <br/>
                    <input placeholder="Enter genre..." />
                    <br />
                    <select>
                        <option>None</option>
                        {
                            data.authors.map(a => (
                                <option key={a.id}>{a.name}</option>
                            ))
                        }
                    </select>
                    <br />
                    <button>Add Book</button>
                </form>
            </div>
        )
    }

}

export default AddBook
