const express = require('express');

const postRouter = require('./data/PostRouter.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.use('/', (req, res) => {
    res.status(200).send('Hello, World!');
})

const port = 5000;
server.listen(port, () => console.log('\nserver running\n'));