import React from 'react'
import BookList from './component/BookList'
import AddBook from './component/AddBook';
import AddAuthor from './component/AddAuthor';
import "./Style.css"

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";



const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="container">
                <BookList />
                <div className="forms">
                    <AddBook />
                    <AddAuthor />
                </div>
            </div>
        </ApolloProvider>
    )
}

export default App
