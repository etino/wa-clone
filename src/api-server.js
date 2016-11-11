const express = require('express');

console.log(require('./redis-client'));

const {setupRedis, redisClient} = require( './redis-client');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Express.js!');
});

app.get('/redis-test', (req, res) => {
    redisClient.incr('inc-test', (err, result) => {
        if (err) {
            console.err(err);
            res.send('Error incrementing redis test');
        }
        else {
            res.send('Redis increment test result ${result}');
        }
    });
});

setupRedis();

app.listen(port, () => {
    console.log('Express app listening on port 3000');
});
