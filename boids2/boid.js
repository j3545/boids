class Boid{
    constructor(x,y,radius,vx,vy){
        this.position = {
            x: x || randBetw(1,10),
            y: y || randBetw(1,10)
        }

        this.radius = radius || 5;

        this.velocity = {
            x: vx || randBetw(1,2) * randSign(),
            y: vy || randBetw(1,2)*randSign()
        }

        this.acceleration = {
            x:0,
            y:0
        }
    }

    lookNear(flock, ctx){
        let perceptionRadius = 80;
        for(let other of flock){
            //get distance between this and other
            if(other != this && distance(this.position, other.position) < perceptionRadius){
                ctx.beginPath();
                ctx.strokeStyle = "white"
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(other.position.x, other.position.y);
                ctx.stroke();
            }
        }
    }

    steer(force){
        this.acceleration.x += force.x,
        this.acceleration.y += force.y
    }

    edges(worldX, worldY){
        if(this.position.x > worldX){
            this.position.x = 0;
        }else if(this.position.x < 0){
            this.position.x = worldX;
        }
        if(this.position.y > worldY){
            this.position.y = 0;
        }else if(this.position.y < 0){
            this.position.y = worldY;
        }
    }

    update(){

        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx, color){
        var angle = Math.atan2(this.velocity.y, this.velocity.x);
        ctx.save();
        //rectMode(CENTER);
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.fillStyle = color;
        //create a triangle
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, 6);
        ctx.lineTo(-20, -6);
        ctx.fill();
        ctx.restore();
    }
}