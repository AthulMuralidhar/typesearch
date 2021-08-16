import express from "express";
import * as path from "path";
import elasticsearch from 'elasticsearch'
import {addIndex, createIndex} from "./services";

export const router = express.Router();

const client = new elasticsearch.Client({
    hosts: [ '127.0.0.1:9200']
});

router.get('/', (req, res) =>{
    res.sendFile('index.html', {
        root: path.join(__dirname, 'views')
    })
})

router.get('/search',(req, res)=>{
    const body = {
        size: 200,
        from: 0,
        query:{
            match: {
                name: req.query['q']
            }
        }
    }

    client.search({
        index: process.env.ELASTIC_INDEX,
        body: body,
        type:  process.env.ELASTIC_TYPE,
    }).then(results => {
        res.send(results.hits.hits)
    }).catch(err=>{
        console.error(err)
        res.send([])
    })
})

router.post('/create-index', (req, res)=>{
    try{
        const body = {
            "Key1": "Content for key one",
            "Key2": "Content for key two",
            "key3": "Content for key three",
        }
       createIndex(client, process.env.ELASTIC_INDEX ?? 'test-index')
        addIndex(client, process.env.ELASTIC_INDEX ?? 'test-index',process.env.ELASTIC_TYPE ?? 'cities_list', body)

    } catch (e) {
        console.log(e)
    }
})