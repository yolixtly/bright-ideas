import 'babel-polyfill';
import express from 'express';
var bodyParser = require('body-parser');


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

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

let app = express();

 app.use(bodyParser.json());
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

app.use(express.static(process.env.CLIENT_PATH));

function runServer() {
    return new Promise((resolve, reject) => {
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
    runServer();
}
