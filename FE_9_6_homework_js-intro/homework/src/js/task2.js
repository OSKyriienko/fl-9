const a = parseFloat(prompt('Enter first side of triangle'));
const b = parseFloat(prompt('Enter second side of triangle'));
const PI = 3.1415;
const ANGLE180 = 180;
const angle = +prompt('Enter the angle between the sides');
if ( Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(angle)
    || a <= 0 || b <= 0 || angle <= 0 || angle >= ANGLE180 ) {
    console.log('Invalid Data');
} else {
  let c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(angle*PI/ANGLE180));
  let square = (a*b*Math.sin(angle*PI/ANGLE180)/2).toFixed(2);
  if (!Number(square)) {
    console.log('Invalid Data');
  } else {
      let perimeter = a + b + c;
      console.log(`c length: ${Number(c.toFixed(2))}
Triangle square: ${Number(square)}
Triangle perimeter: ${Number(perimeter.toFixed(2))}`);
  }
}