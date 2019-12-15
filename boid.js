class Boid{
    constructor(x,y,radius,vx,vy){
        this.position = {
            x: x || randBetw(1,10),
            y: y || randBetw(1,10)
        }

        this.radius = radius || 5;

        this.velocity = {
            x: vx || randBetw(1,2)*randSign(),
            y: vy || randBetw(1,2)*randSign()
        }
    }

    lookNear(flock, ctx){
        let perceptionRadius = 80;
        for(let other of flock){
            //get distance between this and other
            if(other != this && distance(this.position, other.position) < perceptionRadius){
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(other.position.x, other.position.y);
                ctx.stroke();
            }
        }
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
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.position.x,this.position.y, this.radius, 0, Math.PI*2)
        ctx.fill();
    }
}