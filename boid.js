class Boid{
    constructor(canvas){
        this.position = new Vector(randomMinMax(0,canvas.width), randomMinMax(0,canvas.height));
        this.velocity = new Vector.randomDirection();
        this.velocity = this.velocity.multiply(randomMinMax(2, 3));
        this.acceleration = new Vector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }
    
    edges(canvas) {
        if (this.position.x > canvas.width) {
          this.position.x = 1;
        } else if (this.position.x < 0) {
          this.position.x = canvas.width-1;
        }
        if (this.position.y > canvas.height) {
          this.position.y = 1;
        } else if (this.position.y < 0) {
          this.position.y = canvas.height-1;
        }
    }

    align(flock){
        let perceptionRadius = 80;
        let steering = new Vector();
        let total = 0;
        for(let boid of flock){
            if(boid != this && distance(this.position, boid.position) < perceptionRadius){
                steering = steering.add(boid.velocity);
                total++;
            }
        }
        if(total > 0){
            steering = steering.divide(total);
            steering = steering.normalize();
            steering = steering.multiply(this.maxSpeed);
            steering = steering.subtract(this.velocity);
        }
        return steering;
    }

    separation(flock){
        let perceptionRadius = 80;
        let steering = new Vector();
        let total = 0;
        for (let other of flock) {
          let d = distance(this.position, other.position);
          if (other != this && d < perceptionRadius){
            let diff = this.position.subtract(other.position);
            diff = diff.divide(d*d);
            steering = steering.add(diff);
            total++;
          }
        }
        if (total > 0) {
            steering = steering.divide(total);
            steering = steering.normalize();
            steering = steering.multiply(this.maxSpeed);
            steering = steering.subtract(this.velocity);
          //steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(flock) {
        let perceptionRadius = 50;
        let steering = new Vector();
        let total = 0;
        for (let other of flock) {
          let d = distance(this.position, other.position);
          if (other != this && d < perceptionRadius) {
            steering = steering.add(other.position);
            total++;
          }
        }
        if (total > 0) {
            steering = steering.divide(total);
            steering = steering.subtract(this.position);
            steering = steering.normalize();
            steering = steering.multiply(this.maxSpeed);
            steering = steering.subtract(this.velocity);
          //steering.limit(this.maxForce);
        }
        return steering;
      }

    flock(flock){
        let alignment = this.align(flock);
        let cohesion = this.cohesion(flock);
        let separation = this.separation(flock);
    
        // alignment.mult(alignSlider.value());
        // cohesion.mult(cohesionSlider.value());
        // separation.mult(separationSlider.value());
    
        this.acceleration = this.acceleration.add(alignment);
        //this.acceleration = this.acceleration.add(cohesion);
        //this.acceleration = this.acceleration.add(separation);
    }

    update(){
        this.position = this.position.add(this.velocity);
        this.velocity = this.velocity.add(this.acceleration);
        //this.velocity.limit(this.maxSpeed);
        this.acceleration = this.acceleration.multiply(0);
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "teal";
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI*2)
        ctx.fill();
    }
}