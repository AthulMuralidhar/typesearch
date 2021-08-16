import express  from 'express'
import elasticsearch from 'elasticsearch'
import * as path from "path";
import cors from 'cors';
import helmet from 'helmet';

/*
reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-real-time-search-engine-with-node-vue-and-elasticsearch
*/

const app = express()
const client = new elasticsearch.Client({
    hosts: ['127.0.0.1:9200']
})

// check if elastic server is running
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
// bodyparser middleware setup
app.use(express.json())
// port setup
app.set('port', 3000)
//static files - put them in public directory
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
app.use(cors())


