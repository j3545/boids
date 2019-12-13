function randomMinMax(min, max) { // min and max included 
    let random = 0;
    while(!random){
      random = (Math.random() * (max - min + 1) + min);
    }
    
    return random;
  }

  function distance(v1, v2){
    let tmp = v1.subtract(v2);
    //get absolute value of the distance
    let a = tmp.x;
    let b = tmp.y;
    let abs = Math.sqrt(a*a + b*b)
    return abs;
  }