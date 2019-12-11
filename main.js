let canvas = document.getElementById('flocking_canvas');
let ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let flock = [];

function draw(){
    for(let boid of flock){
        boid.draw(ctx);
    }
}

function update(){
    for(let boid of flock){
        boid.align(flock);
        boid.update();
    }
}

function init(){
    for(let i = 0; i < 100; i++){
        flock.push(new Boid(canvas.width/2, canvas.height/2, 10, 10));
    }
    requestAnimationFrame(animate);
}


function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(animate);
}

init();