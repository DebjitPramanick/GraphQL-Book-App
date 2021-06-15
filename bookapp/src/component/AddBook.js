import React, {useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_BOOKS, GET_AUTHORS, GET_BOOKS } from '../queries/Queries';

const AddBook = () => {

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [author, setAuthor] = useState('')

    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addBook] = useMutation(ADD_BOOKS)

    const upload = (e) => {
        e.preventDefault()
        addBook({ variables: { name: name, genre: genre, authorId: author }, refetchQueries: [{query: GET_BOOKS}]  });
        setName('')
        setGenre('')
        setAuthor('')
        alert("Uploaded successfully.")
    }



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
                    <input placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                    <br/>
                    <input placeholder="Enter genre..." value={genre} onChange={(e) => setGenre(e.target.value)} />
                    <br />
                    <select value={author} onChange={(e) => setAuthor(e.target.value)} >
                        <option>None</option>
                        {
                            data.authors.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))
                        }
                    </select>
                    <br />
                    <button onClick={upload}>Add Book</button>
                </form>
            </div>
        )
    }

}

export default AddBook
