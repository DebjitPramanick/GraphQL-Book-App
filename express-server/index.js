const express = require('express')
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/Schema.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const URL = process.env.CONNECTION_URL
mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log("Connected to database...")
})
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

