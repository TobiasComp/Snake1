

const boardSize = 9;

drawBoard(boardSize);
var interval;
let random_x="";
let random_y="";

let snake = {
    length: 1,
    
    snakeArr: [
        {
        pos_x:0,
        pos_y:0
    }
],
    direction:"Right",
      
}
generateRandomBlock();
// initiateLongSnake();

function generateRandomBlock(){
    let randomNumber = Math.floor(Math.random()*(boardSize*boardSize));
    random_y = Math.floor(randomNumber/boardSize);
    random_x = randomNumber%boardSize;
    drawRandomBlock( "p"+random_y+random_x);
}

function drawBlock(id){
    document.getElementById(id).style="background-color:black";

}

function drawRandomBlock(id){
    document.getElementById(id).style="background-color:green";

}
function drawBoard(size){
    let boardElement = document.getElementById("board");
    let boardBody = "";
    for (var i=0; i<size; i++) {
        boardBody += "<tr>"
        for (var j=0; j<size; j++){
            boardBody +="<td id=p"+ (i+"")+(j+"")+"></td>";

        }
        boardBody += "</tr>"

    }
    boardElement.innerHTML = boardBody;
}

function drawSnake(){
    
    // document.getElementById("p"+snake.snakeArr[0].pos_y+snake.snakeArr[0].pos_x).style="background-color:white";
    let cloneSnake = copySnake();
    // debugger;
    switch(snake.direction){
        case "Up":
            if (snake.snakeArr[0].pos_y==0)
                snake.snakeArr[0].pos_y=boardSize-1;
            else  
                snake.snakeArr[0].pos_y = (snake.snakeArr[0].pos_y-1);
            break;  
        case "Down":
            if (snake.snakeArr[0].pos_y==boardSize-1)
                snake.snakeArr[0].pos_y=0;
            else
                snake.snakeArr[0].pos_y = (snake.snakeArr[0].pos_y+1);
            break;
        case "Left":
            if (snake.snakeArr[0].pos_x ==0)
                snake.snakeArr[0].pos_x = boardSize-1;
            else
                snake.snakeArr[0].pos_x = snake.snakeArr[0].pos_x-1;
            break;
        case "Right":
                if (snake.snakeArr[0].pos_x == boardSize-1)
                snake.snakeArr[0].pos_x = 0;
            else
                snake.snakeArr[0].pos_x = snake.snakeArr[0].pos_x+1;
            break;
    }       
    document.getElementById("p"+snake.snakeArr[0].pos_y+snake.snakeArr[0].pos_x).style="background-color:black";
    let i="";
    for ( i=1; i<snake.length;i++){
        snake.snakeArr[i] = cloneSnake[i-1];
        drawBlock("p"+snake.snakeArr[i].pos_y+snake.snakeArr[i].pos_x);
        // debugger;
    }
    if ( snake.snakeArr[0].pos_x==random_x && snake.snakeArr[0].pos_y==random_y) {
        snake.snakeArr[i] = cloneSnake[i-1];
        snake.length++;
        generateRandomBlock();
        // debugger;
    }
    else {
        var lastElement = snake.length-1;
        document.getElementById("p"+cloneSnake[lastElement].pos_y+cloneSnake[lastElement].pos_x).style="background-color:white";
    }
    
}

function changeDirection(event){
        snake.direction = event.code.replace("Arrow","");
        console.log(snake,event);

}

function stopInterval(){
    clearInterval(interval);
}

function startInterval(){
    interval = setInterval(drawSnake,100);

}

document.addEventListener("keydown", event => {
    changeDirection(event);
    }
);

function initiateLongSnake(){
    let position = {pos_x:2,pos_y:0};
    snake.snakeArr.push(position);
    position = {pos_x:1,pos_y:0};
    snake.snakeArr.push(position);
    position = {pos_x:0,pos_y:0};
    snake.snakeArr.push(position);
    snake.length = 3;
    // debugger;
}

function copySnake(){
    let variable="";
    let newArr = [];
    snake.snakeArr.forEach( cell => {
        newArr.push({pos_x:cell.pos_x,pos_y:cell.pos_y})
    })
    return newArr;
}