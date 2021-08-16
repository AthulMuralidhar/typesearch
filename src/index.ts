import express  from 'express'
import elasticsearch from 'elasticsearch'
import * as path from "path";
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from "dotenv";
import {router} from "./router";

/*
reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-real-time-search-engine-with-node-vue-and-elasticsearch
*/
dotenv.config();

const app = express()
const client = new elasticsearch.Client({
    hosts: [process.env.ELASTIC_PORT]
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
app.set('port', process.env.PORT)
//static files - put them in public directory
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
app.use(cors())
// router mounting
app.use("/", router);
app .listen( app.get( 'port' ), ()=>{
    console.log( 'Express server listening on port ' + app.get( 'port' ));
} );


