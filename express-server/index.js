const express = require('express')
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/Schema.js')

const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 8000
app.get("/", (req,res) => {
    res.send("GraphQL Tutorial")
})

app.listen(port, () => console.log(`Server is running at ${port}...`))

