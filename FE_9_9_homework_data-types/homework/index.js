function findType(param) {
    return typeof param;
}

function forEach(array, func) {
    for ( let i = 0; i < array.length; i++ ) {
        func(array[i]);
    }
}

function map(array, func) {
    const arr = [];
    forEach(array, function(el) {
        arr.push(func(el));
    });
    return arr;
}

function filter(array, func) {
    const arr = [];
    forEach(array, function(el) {
        if (func(el)) {
          arr.push(el);
        }
    });
    return arr;
}

function getAdultAppleLovers(data) {
    return map(filter(data, function(elem) {
             return elem.age > 18 && elem.favoriteFruit === 'apple';
             }), function(elem) {
                  return elem.name;
                });
}

function keys(obj) {
    const arr = [];
    for (let key in obj) {
      if(obj.hasOwnProperty(key)) {
          arr.push(key);
      }
    }
    return arr;
}

function values(obj) {
    const arr = [];
    for (let key in obj) {
      if(obj.hasOwnProperty(key)) {
          arr.push(obj[key]);
      }
    }
    return arr;
}

function showFormattedDate(date) {
    const arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let day = date.getDate();
    let month = arr[date.getMonth()];
    let year = date.getFullYear();
    console.log(`It is ${day} of ${month}, ${year}`);
}