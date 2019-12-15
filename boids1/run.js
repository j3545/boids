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

//distance between two vectors
function distance(v1,v2){
    let a = v1.x - v2.x;
    let b = v1.y - v2.y;
    return Math.sqrt(a*a + b*b)
}

//setup the objects, called on load, calls animation to start
function setup(){
    for(let i = 0; i < flockSize; i++){
        //worldX/2,worldY/2,10,10
        let boid = new Boid(randBetw(0, worldX), randBetw(0, worldY));
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
        if(boid == flock[1]){
            boid.draw(ctx, "blue");
            boid.lookNear(flock, ctx);
        }else{
            boid.draw(ctx, "black");
            //boid.lookNear(flock, ctx);
        }
    }
    //draw boid one red
    
}

function animate(){
    ctx.clearRect(0,0,worldX, worldY);
    update();
    draw();    
    requestAnimationFrame(animate);
}

//acceleration;
let acceleration = false;
document.addEventListener('keydown', (e)=>{
    if(e.key == ' ' && !acceleration){
        let force  = {
            x: 0.01,
            y: 0.01
        }
        //store the velocity so we can go back to it
        flock[1].steer(force);
        acceleration = true;
    }
});

document.addEventListener('keyup', (e)=>{
    if(e.key == ' ' && acceleration){
        let force  = {
            x: -0.02,
            y: -0.02
        }
        flock[1].steer(force);
        acceleration = false;
    }
});

setup();