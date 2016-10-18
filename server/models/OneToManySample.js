/* Sample on how to create A BOARD, AN IDEA and how to USE POPULATE TO RELATE ONE ANOTHER! */
    
    /*create a sample Board: it Works! */
    Board.create({
     title: 'TestBoard'
    }, function(err, board){
        if(err){
        console.log(err);
        }
        console.log(board);
    });

    /*Finds a Board and Creates a new Idea: it Works! */
    Board.findOne({title: 'TestBoard'}, function(err, board){ 
        if(err){
            console.log(err);
        }
        console.log('Board before Ideas: ', board);

        /*STEP 1: Create a new Idea Works!*/
        var item = new Idea({
            ideaTitle: 'Last test Before endpoints!!',
            voteCount: 15
        });

        /*STEP 2: Save the Idea Works!*/
        item.save(function(err, item){
                if(err) {
                    console.log(err);
                }
                console.log('new idea', item);
        });

        /*this works by saving the reference of the Idea Works!*/
        /* STEP 3: Push the Idea into the Board.ideas Array section, this will only save the reference */
        board.ideas.push(item);
        board.save(function(err, boardUpdate){
            if(err){
                console.log('update error ', err);
            }
            console.log('board after ideas added: ', boardUpdate);
        });
    });

    /*Step 4: Populate your ideas with the actual objects, rather than just their reference! */
    Board.findOne({title: 'TestBoard'}).populate('ideas').exec(function(err, board){
        if(err){
            console.log('error populate', err);
        }
        // console.log(JSON.stringify(boards, null, 2));
        console.log('Updated Board after populate!!', board);
    });