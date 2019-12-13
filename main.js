let canvas = document.getElementById('flocking_canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight/1.1;

let flock = [];

function draw(){
    for(let boid of flock){
        boid.draw(ctx);
    }
}

function update(){
    for(let boid of flock){
        boid.edges(canvas);
        boid.flock(flock);
        boid.update();
    }
}

function init(){
    reset();
    requestAnimationFrame(animate);
}

function reset(){
    flock = [];
    for(let i = 0; i < 100; i++){
        flock.push(new Boid(canvas));
    }
}


function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(animate);
}

init();

document.getElementsByClassName('reset')[0].addEventListener('click',function(){
    reset();
});