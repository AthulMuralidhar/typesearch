import express  from 'express'
import elasticsearch from 'elasticsearch'
import bodyParser from "body-parser";

const app = express()
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9000']
})

// check if elastic server is runnning
client.ping({
    requestTimeout: 30000
}, (error) => {
    if (error) {
        console.error('elastic server is down, error during ping')
    } else {
        console.log('elastic server is up')
    }
})

// app config
app.use(bodyParser.json())
app.set('port', 3000)
// app.