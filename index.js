"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var elasticsearch_1 = require("elasticsearch");
var body_parser_1 = require("body-parser");
var app = express_1.default();
var client = new elasticsearch_1.default.Client({
    hosts: ['http://localhost:9000']
});
// check if elastic server is runnning
client.ping({
    requestTimeout: 30000
}, function (error) {
    if (error) {
        console.error('elastic server is down, error during ping');
    }
    else {
        console.log('elastic server is up');
    }
});
// app config
app.use(body_parser_1.default.json());
app.set('port', 3000);
// app.
//# sourceMappingURL=index.js.map