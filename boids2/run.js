//canvas stuff
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//setup sizing for canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//world contraints
let worldX = canvas.width;
let worldY = canvas.height;

//flock array and count of flockSize
let flock = [];
let flockSize = 20;

//common functions
function randBetw(min,max){
    return (Math.random() * (max-min) + min);
}
function randSign(){
    return Math.random() < 0.5 ? 1 : -1;
}

function getSign(val){
    let sign = 1;
    if(val < 0){
        sign = -1;
    }
    return sign;
}

//distance between two vectors
function distance(v1,v2){
    let a = v1.x - v2.x;
    let b = v1.y - v2.y;
    return Math.sqrt(a*a + b*b)
}

//setup the objects, called on load, calls animation to start
function setup(){
    for(let i = 0; i < 10; i++){
        //let boid = new Boid(randBetw(0, worldX), randBetw(0, worldY), 10, 1, 1);
        let boid = new Boid(randBetw(0,worldX), randBetw(0,worldY), 10);
        flock.push(boid);
    }
    requestAnimationFrame(animate);
}

//animate functions
function update(){
    for(const boid of flock){
        //check if past the edge
        boid.edges(worldX, worldY);
        boid.update();
    }
}

function draw(){
    let i = 0;
    for (const boid of flock) {
        if(i % 3 == 0){
            boid.draw(ctx, "#4a69ff");
            boid.lookNear(flock, ctx);
        }else if(i % 2 == 0){
            boid.draw(ctx, "#617bff");
            boid.lookNear(flock, ctx);
        }else{
            boid.draw(ctx, "#9aceff");
            boid.lookNear(flock, ctx);
        }
        i++;
    }
    //draw boid one red
    
}

function animate(){
    ctx.clearRect(0,0,worldX, worldY);
    update();
    draw();    
    requestAnimationFrame(animate);
}

setup();