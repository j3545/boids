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

    let v1,v2,v3 = new Vector();

    for(let boid of flock){
        v1 = boid.rule1(flock);
        v2 = boid.rule2(flock);
        v3 = boid.rule3(flock);
        v4 = boid.bound_position(canvas);

        boid.velocity = boid.velocity.add(v1);
        boid.velocity = boid.velocity.add(v2);
        boid.velocity = boid.velocity.add(v3);
        boid.velocity = boid.velocity.add(v4);

        boid.limit_velocity();

        boid.position = boid.position.add(boid.velocity)
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