import 'babel-polyfill';
import express from 'express';

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var mongoose = require('mongoose');
var config = require('./config');
var HOST = config.HOST;
var PORT = config.PORT;
var DATABASE_URL = config.DATABASE_URL;
var Board = require('./models/board');
var Idea = require('./models/idea');
var relationship = require("mongoose-relationship");

console.log(`Server running in ${process.env.NODE_ENV} mode`);
console.log(`Server CLIENT_PATH running in ${process.env.CLIENT_PATH} mode`);


const app = express();

/*Connecting to index in build */
app.use('/', express.static(process.env.CLIENT_PATH));

/* Middleware injected to all endpoints */
app.use(jsonParser);

/* #1: GET ALL THE BOARDS and ITS CONTENT - DONE */
app.get('/api/boards', function(req, res) {
    Board.find().populate('ideas').exec(function(err, boardPopulated) {
        if (err) {
            console.log('error populate', err);
        }
        // console.log(JSON.stringify(boards, null, 2));
        console.log('Updated Board after populated: ', boardPopulated);
        res.status(200).json(boardPopulated);
    });
});

/* #2: GET ONLY ALL THE BOARDS TITLES - DONE */

app.get('/api/boardTitles', function(req, res) {
    Board.find(function(err, boards) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        var boardTitles = [];
        for (var i = 0; i < boards.length; i++) {
            boardTitles.push(boards[i].title);
        }
        res.json(boardTitles);
    });
});

/* #3: CREATE A NEW BOARD - DONE */

app.post('/api/newBoard', function(req, res) {
    Board.create({
        title: req.body.title
    }, function(err, board) {
        if (err) {
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

/* #4: Get the contents for an Specific Board - FINISH SORTING IDEAS */

app.get('/api/:boardTitle', function(req, res) {
    // console.log('req.params.boardTitle', req.params.boardTitle);
    Board.findOne({
        title: req.params.boardTitle
    }).populate('ideas').exec(function(err, boardPopulated) {
        if (err) {
            console.log('error populate', err);
        }
        // console.log(JSON.stringify(boards, null, 2));
        console.log('Updated Board after populated: ', boardPopulated);
        res.status(201).json(boardPopulated);
    });
    //#TODO: sort Ideas comming from with the selected Board.
});

/* #5: CREATE A NEW IDEA - REDIRECT TO ENDPOINT #4 */

app.post('/api/:boardTitle/newIdea', function(req, res) {
    console.log('req.params.boardTitle', req.params.boardTitle);
    console.log('req.body.ideaTitle', req.body.ideaTitle);
    console.log('---STEP 1: Select the Board to alocate the new Idea---');
    //#TODO Refactor with findOneAndUpdate ??
    Board.findOne({
        title: req.params.boardTitle
    }, function(err, board) {
        if (err) {
            console.log('Board not found: ', err);
            return res.status(500).json({
                message: err
            });
        }
        console.log('Board before newIdea is Added: ', board);

        console.log('---STEP 2: Create the new Idea new Idea---');
        var newIdea = new Idea({
            ideaTitle: req.body.ideaTitle
        });
        console.log('---STEP 3: Save the new Idea new Idea---');
        newIdea.save(function(err, item) {
            if (err) {
                console.log(err);
            }
            console.log('new idea', newIdea);
        });

        console.log('---STEP 4: Push the New Idea to the Board.ideas Array---');
        board.ideas.push(newIdea);
        console.log('Board after pushing idea but no saved: ', board);

        console.log('---STEP 5: Save the board with its new Contents---');
        board.save(function(err, boardUpdate) {
            if (err) {
                console.log('update error ', err);
            }
            console.log('board after ideas added: ', boardUpdate);

        });
    });

    //#TODO REDIRECT TO ENDPOINT #4
    //If redirect Doesnt work, make sure that the res.status 
    //includes the new Item, that was just added
    console.log('---STEP 6: Populate the Board with actual content of the NewIdea---');
    Board.findOne({
        title: req.params.boardTitle
    }).populate('ideas').exec(function(err, boardPopulated) {
        if (err) {
            console.log('error populate', err);
        }
        // console.log(JSON.stringify(boards, null, 2));
        console.log('Updated Board after populated: ', boardPopulated);
        // res.status(201).json({
        //     message: "You just added a new Idea!"
        // });
        res.redirect('/api/'+boardPopulated.title);
 
    });
});

/* #6: Update Vote count specific Idea - REDIRECT TO ENDPOINT #4 */

app.put('/api/:boardTitle/voteCount/:ideaTitle', function(req, res) {
    console.log('req.params.ideaTitle', req.params.ideaTitle);
    console.log('req.params.boardTitle', req.params.boardTitle);


    Idea.findOne({
        ideaTitle: req.params.ideaTitle
    }, function(err, Idea) {
        if (err) {
            console.log('Idea not found: ', err);
            return res.status(500).json({
                message: err
            });
        }
        var oldCount = Idea.voteCount;
        var newCount = oldCount + 1;
        // console.log('Idea.voteCount before', Idea.voteCount);

        // console.log('oldCount', oldCount);
        // console.log('newCount', newCount);

        Idea.voteCount = newCount;

        Idea.save();

        // console.log('Idea.voteCount after', Idea.voteCount);
        // console.log('Board Title --> ', req.params.boardTitle);
    var boardTitle = req.params.boardTitle;
        
        res.json(Idea);
        // res.redirect('/api/'+boardTitle);
        
    });
    // var boardTitle = req.params.boardTitle;
    //     res.redirect('/api/'+boardTitle);but 

});

/*ENDPOINTS FINISH HERE */
/*Connection to MongoDB/mongoose */
function runServer(callback) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, function(err) {
            if (err && callback) {
                return callback(err);
            }
            mongoose.connection.on('error', function(err) {
                console.error('Could not connect.  Error:', err);
            });
        })
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer(err => {
        if (err) {
            console.log(err)
        }
    })
}