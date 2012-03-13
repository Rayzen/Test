/* Homework */

var sqrt = Math.sqrt;
var pow = Math.pow;
var random = Math.random;

/* POINT */

var Point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Point.prototype.translate = function(dx, dy) {
  this.x += dx;
  this.y += dy;

  return this;
};

var randomPoint = function () {
  var x1 = random() * 200 - 100;
  var y1 = random() * 200 - 100;
  
  return new Point(x1, y1);
};

var randomPoints = function (n) {
  var n = n || 1;
  var res = new Array(n);

  for (var i = 0; i < n ; i += 1) {
    res[i] = randomPoint();
  }

  return res;
}

var points = randomPoints(100);

var filterBisettrice = function (arrayPunti){

  return arrayPunti.filter(function(item, index, array){
    return (item.y-item.x > 0);
  });

};

Point.prototype.membership = function (eqFunction){
  var piano = eqFunction(this.x,this.y);
  return (piano > 0)? 1 : (piano <0)? -1: 0;
};

Point.prototype.getDistanceFromPoint = function(point) {
  return sqrt(pow(point.y - this.y, 2) + pow(point.x - this.y, 2));
};

Point.prototype.getDistanceFromLine = function (line){
  return ((Math.abs(line.a*this.x + line.b*this.y + line.c))/(sqrt(pow(line.a,2) + pow(line.b,2))));
}

Point.prototype.getDistance = function (x){
  if ( x instanceof Point) {
    return this.getDistanceFromPoint(x);
  }

  if ( x instanceof Line) {
    return this.getDistanceFromLine(x);
  }

  throw  new Error('x is not a Point neither a Line');
};
/* TRIANGLE */

var Triangle = function (p1, p2, p3) {

  /*
  
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  
  this.l1 = p2.getDistance(p3);
  this.l2 = p3.getDistance(p1);
  this.l3 = p1.getDistance(p2);
  */
  //Refactoring
  this.points = [p1, p2, p3];

  this.lengths = this.points.map(function(item, index, array){
      if(index === array.length ){
        return item.getDistance(array[0]);
      }
      return item.getDistance(array[index+1])
    });



}

Triangle.prototype.getPerimeter = function() {
  //return this.l1 + this.l2 + this.l3;

  
  var perimiter = 0;
  /*
  for (l in this.lengths){
    perimiter += l;
  }
  */
  this.lengths.forEach(function(item){
	perimiter += item;
  });
  return perimiter;
};

Triangle.prototype.getArea = function() {
  var p = this.getPerimeter() / 2;
  var area = 1;

  for (l in lengths){
    area *= (p-l);
  }
  return sqrt(area*p);

  //return sqrt(p*(p - this.l1)*(p - this.l2)*(p - this.l3));
};


Triangle.prototype.above = function (line){
  /**
  var result = 0;
  for(point in this.points){
    result += point.membership(line);
  }
  return result > 2
  */
  return this.points.every(function(item) { 
    return (item.getDistance(line) > 0);
  });

};

Triangle.prototype.below = function (line){
  /**
  var result = 0;

  for(point in this.points){
    result += point.membership(line);
  }

  return result < -2;
  */
  return this.points.every(function(item,index,array){ return (item.getDistance(line) < 0);});

};

Triangle.prototype.intersect = function (line){

  return (!this.above(line)&&!this.below(line));
};

/* LINE */
var Line = function (a, b, c){

  //Per forzare a lanciare cil costruttore con il new anche se l'utente non lo mette
  if(!(this instanceof Line)) {
    return new Line(a, b, c);
  }

  this.a = a;
  this.b = b;
  this.c = c;
};


