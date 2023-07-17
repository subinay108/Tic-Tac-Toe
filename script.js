const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('wrapper');
const newGameBtn = document.getElementById('newGame');
const winBanner = document.querySelector('.winBanner');
const toggleBtn = document.querySelector('.toggleDifficulty input');
const toggleText = document.querySelector('.text');
canvas.width = 301;
canvas.height = 301;
let level = 'Easy';

const mouse = {
    x: undefined,
    y: undefined,
}
toggleText.addEventListener('animationend', function(){
    toggleText.classList.remove('animate');
})

toggleBtn.addEventListener('change', function(){
    if(toggleText.innerText == 'Easy'){
        toggleText.innerText = 'Difficult';
        level = 'Difficult';
    }else{
        toggleText.innerText = 'Easy';
        level = 'Easy';
    }
    toggleText.classList.add('animate');
})

newGameBtn.addEventListener('click', function(){
    isGameOver = false;
    winBanner.style.opacity = '0';
    board = new Board();
})

wrapper.addEventListener('click', function(event){
    mouse.x = event.x - wrapper.getBoundingClientRect().x;
    mouse.y = event.y - wrapper.getBoundingClientRect().y;
    playGame();
})

let isGameOver = false;
function playGame(){
    if(isGameOver){
        return;
    }
    let row, col;
    [row, col] = getRowCol();
    if(row !== undefined && col !== undefined){
        board.update(row, col);
        if(board.turnCount !== 9 && board.turn === 'o'){
            playBot();
        }
    }
}

function getRowCol(){
    let row, col; 
    if(mouse.x >= 0 && mouse.x <= 97){
        col = 0;
    }else if(mouse.x >= 102 && mouse.x <= 199 ){
        col = 1;
    }else if(mouse.x >= 204 && mouse.x <= 301 ){
        col = 2;
    }
    if(mouse.y >= 0 && mouse.y <= 97){
        row = 0;
    }else if(mouse.y >= 102 && mouse.y <= 199 ){
        row = 1;
    }else if(mouse.y >= 204 && mouse.y <= 301 ){
        row = 2;
    }
    return [row, col];
}

class Board{
    constructor(){
        this.data = [];
        for(let i = 0; i < 3; i++){
            this.data[i] = [];
            for(let j = 0; j < 3; j++){
                // this.data[i][j] = (i+j) % 3 == 0 ? 'x' : 'o';
                this.data[i][j] = ' ';
            }
        }
        this.draw();   
        this.turn = 'x';
        this.turnCount = 0;
    }
    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        // vertical lines
        ctx.fillRect(97, 0, 5, 301);
        ctx.fillRect(199, 0, 5, 301);
        // horizontal lines
        ctx.fillRect(0, 97, 301, 5);
        ctx.fillRect(0, 199, 301, 5);

        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                if(this.data[row][col] == 'o'){
                    ctx.beginPath();
                    ctx.arc(col * 102 + 48.5, row * 102 + 48.5, 25, 0, 2 * Math.PI);
                    ctx.stroke();
                } else if(this.data[row][col] == 'x'){
                    ctx.beginPath();
                    ctx.moveTo(col * 102 + 23.5, row * 102 + 23.5);
                    ctx.lineTo(col * 102 + 73.5, row * 102 + 73.5);
                    ctx.moveTo(col * 102 + 23.5, row * 102 + 73.5);
                    ctx.lineTo(col * 102 + 73.5, row * 102 + 23.5);
                    ctx.stroke();
                }
            }
        }
    }

    update(row, col){
        if(this.data[row][col] !== ' '){
            return;
        }
        this.data[row][col] = this.turn;
        this.draw();
        this.check();
        this.turnCount++;
        this.turn === 'x' ? this.turn = 'o' : this.turn = 'x';
    }

    check(){
        if(this.data[0][0] !== ' ' && 
        this.data[0][0] === this.data[0][1] && 
        this.data[0][0] === this.data[0][2]){ // row 1
            isGameOver = true;
            ctx.beginPath();
            ctx.fillRect(23.5, 46, 254, 5);
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[1][0] !== ' ' && 
        this.data[1][0] === this.data[1][1] && 
        this.data[1][0] === this.data[1][2]){ // row 2
            isGameOver = true;
            ctx.beginPath();
            ctx.fillRect(23.5, 148, 254, 5);
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[2][0] !== ' ' && 
        this.data[2][0] === this.data[2][1] && 
        this.data[2][0] === this.data[2][2]){ // row 3
            isGameOver = true;
            ctx.beginPath();
            ctx.fillRect(23.5, 250, 254, 5);
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[0][0] !== ' ' && 
        this.data[0][0] === this.data[1][0] && 
        this.data[0][0] === this.data[2][0]){ // col 1
            isGameOver = true;
            ctx.beginPath();
            ctx.fillRect(46, 23.5, 5, 254);
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[0][1] !== ' ' && 
        this.data[0][1] === this.data[1][1] && 
        this.data[0][1] === this.data[2][1]){ // col 2
            isGameOver = true;
            ctx.beginPath();
            ctx.fillRect(148, 23.5, 5, 254);
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[0][2] !== ' ' && 
        this.data[0][2] === this.data[1][2] && 
        this.data[0][2] === this.data[2][2]){ // col 3
            isGameOver = true;
            ctx.beginPath();
            ctx.fillRect(250, 23.5, 5, 254);
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[0][0] !== ' ' && 
        this.data[0][0] === this.data[1][1] && 
        this.data[0][0] === this.data[2][2]){ // dia 1
            isGameOver = true;
            ctx.beginPath();
            ctx.moveTo(0 * 102 + 23.5, 0 * 102 + 23.5);
            ctx.lineTo(2 * 102 + 73.5, 2 * 102 + 73.5);
            ctx.stroke();
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(this.data[0][2] !== ' ' && 
        this.data[0][2] === this.data[1][1] && 
        this.data[0][2] === this.data[2][0]) // dia 2
        {
            isGameOver = true;
            ctx.beginPath();
            ctx.moveTo(2 * 102 + 23.5, 0 * 102 + 73.5);
            ctx.lineTo(0 * 102 + 73.5, 2 * 102 + 23.5);
            ctx.stroke();
            winBanner.innerHTML = `<p>${this.turn.toUpperCase()} Wins</p>`;
            winBanner.style.opacity = '1.0';
            console.log(`${this.turn} wins`);
        }
        else if(!this.isMovesLeft()){
            winBanner.innerHTML = '<p>Draw</p>';
            winBanner.style.opacity = '1.0';
            console.log('Draw');
        }
    }

    isMovesLeft(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(this.data[i][j] === ' '){
                    return true;
                }
            }
        }
        return false;
    }

    evaluate(){
        // checking for row for x or o victory
        for(let row = 0; row < 3; row++){
            if(this.data[row][0] === this.data[row][1] &&
               this.data[row][1] === this.data[row][2]){
                if(this.data[row][0] === 'x'){
                    return 1;
                }
                if(this.data[row][0] === 'o'){
                    return -1;
                }
               }
        }
        // checking for col for x or o victory
        for(let col = 0; col < 3; col++){
            if(this.data[0][col] === this.data[1][col] &&
               this.data[1][col] === this.data[2][col]){
                if(this.data[0][col] === 'x'){
                    return 1;
                }
                if(this.data[0][col] === 'o'){
                    return -1;
                }
               }
        }
        // checking for diagonals for x or o victory
        if(this.data[0][0] === this.data[1][1] &&
            this.data[1][1] === this.data[2][2]){
            if(this.data[0][0] === 'x'){
                return 1;
            }
            if(this.data[0][0] === 'o'){
                return -1;
            }
        }
        if(this.data[0][2] === this.data[1][1] &&
            this.data[1][1] === this.data[2][0]){
            if(this.data[1][1] === 'x'){
                return 1;
            }
            if(this.data[1][1] === 'o'){
                return -1;
            }
        }

        // else if none of them have won then return 0
        return 0;
        
    }

}

function getRandomMove(){
    // Random move algorithm
    let row, col;
    while(true){
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
        if(board.data[row][col] === ' '){
            break;
        }
    }
    return [row, col];
}

function minimax(depth, isMax){
    let score = board.evaluate();
    if(score === 1 || score === -1){
        return score;
    }
    if(board.isMovesLeft() === false){
        return 0;
    }

    // Maximizer's move
    let best;
    if(isMax){
        best = -10;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board.data[i][j] === ' '){
                    board.data[i][j] = 'x';
                    best = Math.max(best, minimax(depth + 1, !isMax));
                    board.data[i][j] = ' ';
                }
            }
        }
    }else{
        best = 10;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board.data[i][j] === ' '){
                    board.data[i][j] = 'o';
                    best = Math.min(best, minimax(depth + 1, !isMax));
                    board.data[i][j] = ' ';
                }
            }
        }
    }
    return best;
}

function getBestMove(){
    let row, col;
    // o tries to minimize the value
    let bestVal = 10;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board.data[i][j] === ' '){
                board.data[i][j] = 'o';
                let moveVal = minimax(0, true);
                board.data[i][j] = ' ';
                if(moveVal < bestVal){
                    row = i;
                    col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    console.log(bestVal);
    return [row, col];

}

function playBot(){
    if(isGameOver) return;
    // minimax algorithm
    if(level == 'Easy'){
        [row, col] = getRandomMove();
    }else{
        [row, col] = getBestMove();
    }
    
    board.update(row, col);
}



let board = new Board();



