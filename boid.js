class Boid{
    constructor(x,y,width,height){
        this.x = y;
        this.y = x;
        this.width = width;
        this.height = height;

        this.vx = randomMinMax(-.001,.001);
        this.vy = randomMinMax(-.001,.001);

        this.ax = randomMinMax(-.001,.001);
        this.ay = randomMinMax(-.001,.001);
    }

    align(boids){
        let perceptionRadius = 100;
        let steering = {
            x:0,
            y:0
        }
        let total = 0;
        for(let other of boids){
            let distance = Math.hypot(this.x-other.x, this.y-other.y);
            if(distance<100){
                steering.x += other.vx;
                steering.y += other.vy;
                total++;
            }
        }
        if(total > 0){
            steering.x /= boids.length;
            steering.y /= boids.length;
            steering.x -= this.vx;
            steering.y -= this.vy;
        }
        
    }

    update(){
        //update velocity
        this.vx += this.ax;
        this.vy += this.ay;

        //update position
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}