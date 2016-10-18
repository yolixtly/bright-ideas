import 'babel-polyfill';
import express from 'express';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var mongoose = require('mongoose');
var config = require('./config');
var Board = require('./models/board');
var Idea = require('./models/idea');
var relationship = require("mongoose-relationship");

let app = express();

/*Connecting to index in build */
app.use('/', express.static('build'));

/* Middleware injected to all endpoints */
app.use(jsonParser);

/*ENDPOINTS BEGIN HERE */

/* #1: GET ALL THE BOARDS and ITS CONTENT */
app.get('/boards', function(req, res) {

    Board.find(function(err, boards){
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.send(boards);
    });
});

/* #2: GET ONLY ALL THE BOARDS TITLES */

app.get('/boardTitles', function(req, res) {

    Board.find(function(err, boards){
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    var boardTitles = []; 
    for(var i = 0; i < boards.length; i++){
        boardTitles.push(boards[i].title);
    }
    res.json(boardTitles);
    });
});


/* #3: CREATE A NEW BOARD */

app.post('/newBoard', function(req, res){
     Board.create({
            title: req.body.title
        }, function(err, board){
            if(err){
                console.log('error creating a board: ', err);
                return res.status(500).json({
                    message: err
                });
            }
             res.status(201).send({
                message: 'New Board Created'
             });
        });
});

/* #4: Get the contents for an Specific Board */

app.get('/:boardTitle', function(req, res){
    console.log('req.params.boardTitle', req.params.boardTitle);
    Board.findOne({ title: req.params.boardTitle }, function(err, board){
        if(err){
                console.log('Board not found: ', err);
                return res.status(500).json({
                    message: err
                });
            }
        console.log('found board ', board);
        res.json(board);
    });
    //#TODO: sort Ideas comming from with the selected Board.
});

/*ENDPOINTS FINISH HERE */



/*Connection to MongoDB/mongoose */
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
    mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
    });
        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};
if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};






var DummyData = [
    {
        id: 1,
        title: 'Board1',
        items: [
            {
                id: 1,
                itemTitle: 'Idea1 of Board1',
                voteCount: 5
            },
            {
                id: 2,    
                itemTitle: 'Idea2 of Board1',
                voteCount: 4
            },
            {
                id: 3,
                itemTitle: 'Idea3 of Board1',
                voteCount: 7
            }
        ]

    },
    {
        id: 2,
        title: 'Board2',
        items: [
            {
                id: 1,
                itemTitle: 'Idea1 of Board2',
                voteCount: 4
            },
            {
                id: 2,    
                itemTitle: 'Idea1 of Board2',
                voteCount: 8
            }
        ]

    }
];

/*
 GET ENDPOINT TO:
    get all the board Dummy Data 
 */
app.get('/boards', function(request, response) {
    response.send(DummyData);
});


/*
 POST ENDPOINT TO:
    add a new item in a given board
 */
app.post('/boards', function(request, response){
    DummyData[0].items.push({itemTitle: request.body.itemTitle});
    response.status(201).json("it worked!");
});

/*
 PUT ENDPOINT TO:
    update the Voting Count of an item 
 */

app.put('/:boardId/:itemId', function(request, response){

   console.log(' DummyData[request.params.boardId].items[request.params.itemId] ',  DummyData[request.params.boardId].items[request.params.itemId].voteCount );
   console.log('request.body.voteCount ', request.body.voteCount);

   DummyData[request.params.boardId].items[request.params.itemId].voteCount = request.body.voteCount;

    response.json(DummyData);
});





exports.app = app;
exports.runServer= runServer;
