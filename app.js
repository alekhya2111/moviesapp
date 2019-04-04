const express = require('express');
const cors = require('cors');
const app = express();
const file = require('fs');
const bodyparser = require('body-parser');
const moviesRoute = require('./api/routes/movies');


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//         res.status(200).json({});
//     }
// });

app.use('/movies',moviesRoute);
app.use('/',(req, res, next) => {
    res.status(200).sendFile(__dirname + "/index.html");
});
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message:error.message
    });
});
module.exports = app;