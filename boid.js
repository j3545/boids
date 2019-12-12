class Boid{
    constructor(x,y,width,height){
        this.width = width;
        this.height = height;

        this.position = new Vector();
        this.velocity = new Vector();        

        this.position.x = x;
        this.position.y = y;
    }

    /**
     * rule1
     * 
     * boids try to fly towards the centre of mass of neighboring boids
     * 
     * @param {boid array} flock array of boids
     */
    rule1(flock){
        let perceivedCenter = new Vector();
        for (const boid of flock) {
            if(this != boid){
                perceivedCenter = perceivedCenter.add(boid.position)
            }
        }
        perceivedCenter = perceivedCenter.divide(flock.length-1);

        perceivedCenter = perceivedCenter.subtract(this.position)

        perceivedCenter = perceivedCenter.divide(100)
        
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
        let c = new Vector(0,0);

        for (const boid of flock) {
            if(this != boid){
                let tmp = boid.position.subtract(this.position);
                //get absolute value of the distance
                let a = tmp.x;
                let b = tmp.y;
                let abs = Math.sqrt(a*a + b*b)
                if(abs < 100){
                    tmp = boid.position.subtract(this.position)
                    c = c.subtract(tmp);
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
        let perceivedVelocity = new Vector();

        for (const boid of flock) {
            if(this != boid){
                perceivedVelocity = perceivedVelocity.add(boid.velocity)
            }
        }
        perceivedVelocity = perceivedVelocity.divide(flock.length-1)        

        perceivedVelocity = perceivedVelocity.subtract(this.velocity);

        perceivedVelocity = perceivedVelocity.divide(8);

        return perceivedVelocity;
    }

    bound_position(canvas){
        let Xmin = 0;
        let Xmax = canvas.width;
        let Ymin = 0;
        let Ymax = canvas.height;
    
        let v = new Vector();
    
        if(this.position.x < Xmin){
            v.x = 10
        }else if(this.position > Xmax){
            v.x = -10
        }else if(this.position.y < Ymin){
            v.y = 10
        }else if(this.position.y > Ymax){
            v.y = -10
        }
    
        return v;
    }

    limit_velocity(){
        let vlim = 30;
        let v = new Vector();
        let a = this.velocity.x;
        let b = this.velocity.y;
        let abs = Math.sqrt(a*a + b*b)
        if(abs > vlim){
            let tmp = this.velocity.divide(abs);
            this.velocity = tmp.multiply(vlim);
        }
    }

    update(){
        
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(Math.ceil(this.position.x), Math.ceil(this.position.y), this.width, this.height);
        ctx.fill();
    }
}