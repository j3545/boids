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
let flockSize = 10;

//common functions
function randBetw(min,max){
    return (Math.random() * (max-min) + min);
}
function randSign(){
    return Math.random() < 0.5 ? 1 : -1;
}

//distance between two vectors
function distanceVec(v1,v2){
    let a = v1.x - v2.x;
    let b = v2.y - v2.y;
    return Math.sqrt(a*a + b*b)
}

//setup the objects, called on load, calls animation to start
function setup(){
    for(let i = 0; i < flockSize; i++){
        //worldX/2,worldY/2,10,10
        let boid = new Boid(worldX/2, worldY/2);
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
    for (const boid of flock) {
        boid.draw(ctx);
        boid.lookNear(flock, ctx);
    }
}

function animate(){
    ctx.clearRect(0,0,worldX, worldY);
    update();
    draw();    
    requestAnimationFrame(animate);
}

setup();