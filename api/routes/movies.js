const express = require('express');
const router = express.Router();
var id;
var fetchedcityJSON;
router.get('/:movieID',(req, res, next) => {
    id = req.params.movieID;
    fetchOneByKey();
    console.log(fetchedcityJSON);
    setTimeout(() => {
        res.status(200).json({
            fetchedcityJSON
        });
    },1000);
    
});
var AWS = require('aws-sdk');
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "", "secretAccessKey": ""
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
    var params = {
        TableName: "Movies",
        Key: {
            "id": movie_id
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            fetchedcityJSON = data;
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));        }
    })
}




module.exports = router;
