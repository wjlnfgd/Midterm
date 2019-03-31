/* =====================
  Set different layouts for selection standards
===================== */

//"Area", "Unit Price", "Year Built", "Within School District"
var selectStyles = function(myObject, currentSlide) {
  switch (currentSlide) {
    case 0: return selection0;
    case 1: return selection1(myObject);
    case 2: return selection2(myObject);
    case 3: return selection3(myObject);
    case 4: return selection4(myObject);
    }
  };

//Overview of the available houses
  var selection0 = {
      radius: 2.5,
      color: '#6d6d6d',
      weight: 5,
      opacity: 0.8
  }

//Recategorize houses into three groups by the total area
  var selection1 = function(myObject) {
    if (myObject.properties.area <= 70){
      return {
        radius: 2.5,
        color: '#A8E0FF',
        weight: 5,
        opacity: 0.8
      };
    }
    if (myObject.properties.area > 70 && myObject.properties.area <= 100){
      return {
        radius: 2.5,
        color: '#70CAD1',
        weight: 10,
        opacity: 0.8
      };
    }
    else {
      return {
        radius: 2.5,
        color: '#3E517A',
        weight: 15,
        opacity: 0.8
      };
    }
  };

//Recategorize houses into three groups by the price per unit
var selection2 = function(myObject) {
  if (myObject.properties.priceperm2 <= 20000){
    return {
      radius: 2.5,
      color: '#DEB986',
      weight: 5,
      opacity: 0.8
    };
  }
  if (myObject.properties.priceperm2 > 20000 && myObject.properties.priceperm2 <= 40000){
    return {
      radius: 2.5,
      color: '#DB6C79',
      weight: 10,
      opacity: 0.8
    };
  }
  else {
    return {
      radius: 2.5,
      color: '#ED4D6E',
      weight: 15,
      opacity: 0.8
    };
  }
};

//Recategorize houses into four groups by the built year
var selection3 = function(myObject) {
  if (myObject.properties. yearbuilt <= 1990){
    return {
      radius: 2.5,
      color: '#5b827f',
      weight: 5,
      opacity: 0.8
    };
  }
  if (myObject.properties.yearbuilt > 1990 && myObject.properties.yearbuilt <= 2000){
    return {
      radius: 2.5,
      color: '#77a8a5',
      weight: 5,
      opacity: 0.8
    };
  }
  if (myObject.properties.yearbuilt <= 2010 && myObject.properties.yearbuilt > 2000){
    return {
      radius: 2.5,
      color: '#90ccc8',
      weight: 5,
      opacity: 0.8
    };
  }
  else {
    return {
      radius: 2.5,
      color: '#abf2ee',
      weight: 5,
      opacity: 0.8
    };
  }
};

//Recategorize houses into two groups by whether within the school disctrict
var selection4 = function(myObject) {
  if (myObject.properties.schooldistrict === "1"){
    return {
      radius: 2.5,
      color: '#cfcfd1',
      weight: 5,
      opacity: 0.8
    };
  }
  else {
    return {
      radius: 2.5,
      color: '#333333',
      weight: 5,
      opacity: 0.8
    };
  }
};
