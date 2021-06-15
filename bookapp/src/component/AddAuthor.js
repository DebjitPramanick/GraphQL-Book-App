import React, {useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_Author, ADD_BOOKS, GET_AUTHORS, GET_BOOKS } from '../queries/Queries';

const AddAuthor = () => {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)

    const { loading, error, data } = useQuery(GET_AUTHORS);
    
    const [addAuthor] = useMutation(ADD_Author)

    const upload = (e) => {
        e.preventDefault()
        addAuthor({ 
            variables: { name: name, age: Number(age) }, 
            refetchQueries: [{query: GET_AUTHORS}] 
        });
        setName('')
        setAge(0)
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
                <h2>Add Author Form</h2>
                <br/>
                <form>
                    <input placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                    <br/>
                    <input placeholder="Enter genre..." value={age} onChange={(e) => setAge(e.target.value)} />
                    <br />
                    <button onClick={upload}>Add Author</button>
                </form>
            </div>
        )
    }

}

export default AddAuthor
