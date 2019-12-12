class Boid{
    constructor(x,y,width,height){
        this.x = y;
        this.y = x;
        this.width = width;
        this.height = height;

        this.vx = 0;
        this.vy = 0;
    }

    /**
     * rule1
     * 
     * boids try to fly towards the centre of mass of neighboring boids
     * 
     * @param {array} flock array of boids
     */
    rule1(flock){
        let perceivedCenter = {
            x:0,
            y:0
        };
        for (const boid of flock) {
            if(this != boid){
                perceivedCenter.x += boid.x,
                perceivedCenter.y += boid.y
            }
            
        }

        perceivedCenter.x = perceivedCenter.x/(flock.length-1);
        perceivedCenter.y = perceivedCenter.y/(flock.length-1);

        perceivedCenter.x = (perceivedCenter.x - this.x)/100;
        perceivedCenter.y = (perceivedCenter.y - this.y)/100;
        
        return perceivedCenter;
        
    }

    /**
     * rule2
     * 
     * boids try to keep a small distance away from other objects(including other boids)
     * 
     * @param {array} flock array of boids
     */
    rule2(flock){
        let c = {
            x:0,
            y:0
        }
        for (const boid of flock) {
            if(this != boid){
                let a = boid.x - this.x;
                let b = boid.y - this.y;
                let distance = Math.sqrt((a*a) + (b*b));
                if(distance < 100){
                    let tmpx = boid.x - this.x;
                    let tmpy = boid.y - this.y;
                    c.x -= tmpx;
                    c.y -= tmpy;
                }
            }
        }
        return c;
    }

    /**
     * rule3
     * 
     * boids try to match velocity with near boids
     * 
     * @param {array} flock array of boids
     */
    rule3(flock){
        let perceivedVelocity = {
            x:0,
            y:0
        }
        for (const boid of flock) {
            if(this != boid){
                perceivedVelocity.x += boid.vx;
                perceivedVelocity.y += boid.vy;
            }
        }
        perceivedVelocity.x -= this.vx;
        perceivedVelocity.y -= this.vy;

        perceivedVelocity.x /= 8;
        perceivedVelocity.y /= 8;

        return perceivedVelocity;
    }

    update(){
        
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(Math.ceil(this.x), Math.ceil(this.y), this.width, this.height);
        ctx.fill();
    }
}