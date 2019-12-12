let canvas = document.getElementById('flocking_canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flock = [];

function draw(){
    for(let boid of flock){
        boid.draw(ctx);
    }
}

function update(){
    for(let boid of flock){
        let rule1 = boid.rule1(flock);
        let rule2 = boid.rule2(flock);
        let rule3 = boid.rule3(flock);
        //alert();
        
        boid.vx += rule1.x + rule2.x + rule3.x;
        boid.vy += rule1.y + rule2.y + rule3.y;

        boid.x += boid.vx;
        boid.y += boid.vy;
    }
}

function init(){
    reset();
    requestAnimationFrame(animate);
}

function reset(){
    flock = [];
    for(let i = 0; i < 100; i++){
        flock.push(new Boid(randomMinMax(10, 1000), randomMinMax(10, 1000), 10, 10));
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