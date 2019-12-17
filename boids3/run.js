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
let flockSize = 500;

let mouse = {
    x:100,
    y:100,
    down:false
}

//common functions
function randBetw(min,max){
    return (Math.random() * (max-min) + min);
}
function randSign(){
    return Math.random() < 0.5 ? 1 : -1;
}

/**
 * 
 * @param {x,y} point vector to scale
 * @param {int} scale scalar
 * 
 * https://stackoverflow.com/questions/3592040/javascript-function-that-works-like-actionscripts-normalize1
 */
function normalize(point, scale){
    let vector = { x:0, y:0 };
    let norm = Math.sqrt(point.x * point.x + point.y * point.y);
    if (norm != 0) { // as3 return 0,0 for a point of zero length
        vector.x = scale * point.x / norm;
        vector.y = scale * point.y / norm;
    }
    return vector;
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
    for(let i = 0; i < flockSize; i++){
        let color;
        if(i % 3 == 0){
            color = "#3ad94e"
        }else if(i % 2 == 0){
            color = "#0000ff";
        }else{
            color = "#9a00ff";
        }
        let boid = new Boid(randBetw(0,worldX), randBetw(0,worldY), 10, 0, 0 , color);
        flock.push(boid);
    }
    requestAnimationFrame(animate);
}

//animate functions
function update(){
    for(const boid of flock){
        //check if past the edge
        boid.edges(worldX, worldY);
        boid.update(flock, mouse);
    }
}

function draw(){
    let i = 0;
    for (const boid of flock) {
        if(i % 3 == 0){            
            boid.draw(ctx, "#FFFFFF");
        }else if(i % 2 == 0){
            boid.draw(ctx, "#617bff");
        }else{
            boid.draw(ctx, "#9aceff");
        }
        i++;
    }
    for (const boid of flock) {
        //boid.lookNear(flock, ctx);
    }
}

function animate(){
    ctx.clearRect(0,0,worldX, worldY);
    update();
    draw();    
    requestAnimationFrame(animate);
}



canvas.addEventListener('mousedown', (e)=>{
    mouse.down = true;
});

canvas.addEventListener('mouseup', (e)=>{
    mouse.down = false;
});

canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})


function touchHandler(e) {
    if(e.touches) {
        mouse.x = e.touches[0].pageX - canvas.offsetLeft;
        mouse.y = e.touches[0].pageY - canvas.offsetTop;
        e.preventDefault();
    }
}

document.addEventListener("touchstart", ()=>{
    mouse.down = true;
});

document.addEventListener("touchend", ()=>{
    mouse.down = false;
});

document.addEventListener("touchmove", touchHandler);

canvas.addEventListener('touchstart', (e)=>{
    mouse.down = true;
});

canvas.addEventListener('mouseup', (e)=>{
    mouse.down = false;
});

canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

setup();
