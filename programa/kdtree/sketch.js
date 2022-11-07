var maxx = 250;
var maxy = 200;
var root;
let width = 800;
let height = 600;
let scalex = 10;
let scaley = 5;
var data_train = [];
var data_test = [];
var data_test_knn = [];

function setup() {
  createCanvas(width, height);

  background(255);
  for (var x = 0; x <= width; x += width / scalex) {
    for (var y = 0; y <= height; y += height / scaley) {
      stroke(200);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}
// function graficarKNN() {
//   crearCanvasPuntos();

//   var cantidadK = document.getElementById("cantidadK").value;
//   var knn = findKnn(root, pointP, parseInt(cantidadK)).nearestNeighbors;
//   console.log("PonitN graf: " + pointP);

//   for (let i = 0; i < knn.length; i++) {
//     fill(0, 0, 255);
//     circle(
//       (knn[i].point[0] * width) / maxx,
//       height - (knn[i].point[1] * height) / maxy,
//       10
//     );
//     console.log(knn[i].point);
//   }

//   drawPoint(pointP, 0, 255, 0);
// }

function classifier(data, data_test) {
  console.log("cantidad total de entrenamiento: " + data.length);
  data_train = data;
  data_test = data_test;
  let pointClass = "";
  let point;

  var root = build_kdtree(data);

  for (let i = 0; i < data_test.length; i++) {
    point = [data_test[i][1], data_test[i][2]];
    // console.log(point);
    pointClass = knnClassifier(root, point);
    data_test_knn[i] = [[data_test[i][0], pointClass], point];
  }
}

function knnClassifier(root, pointY) {
  var cantidadK = 7;
  var knn = findKnn(root, pointY, parseInt(cantidadK)).nearestNeighbors;
  // console.log(knn);
  var countHOF = 0,
    countNOT = 0;

  var point;

  for (let i = 0; i < knn.length; i++) {
    // console.log(knn[i].point + ", " + knn[i].value[0]);
    if (knn[i].value[0] === "HOF") {
      countHOF++;
    } else {
      countNOT++;
    }
  }

  // console.log(">>> " + x + ", " + y);

  if (countHOF > countNOT) {
    console.log("Este tweet es OFENSIVO ");
    return "HOF";
  } else {
    console.log("Este tweet NO es OFENSIVO ");
    return "NOT";
  }
}

function draw() {

  let factorx = maxx * 5; 
  let factory = maxy * 5; 
  

  for (let i = 0; i < data_train.length; i++) {
    let x = data_train[i][1] * factorx + (maxx / 2);
    let y = data_train[i][2] * factory + (maxy / 2);
    if (data_train[i][0][0] === "HOF") {
      drawPoint([x, y], 255, 0, 0);
    } else {
      drawPoint([x, y], 0, 255, 0);
    }
  }

  // for (let i = 0; i < data_test.length; i++) {
  //   let x = data_test[i][1] * factorx + (maxx / 2);
  //   let y = data_test[i][2] * factory + (maxy / 2);
  //   // console.log(x + ", " + y);
  //   drawPoint([x, y], 0, 0, 255);
  //   // if (data_test[i][0][0] === "HOF") {
  //   //   drawPoint([x, y], 255, 0, 0, 3);
  //   // } else {
  //   //   drawPoint([x, y], 0, 255, 0, 3);
  //   // }
  // }

  for (let i = 0; i < data_test_knn.length; i++) {
    let x = data_test_knn[i][1][0] * factorx + (maxx / 2);
    let y = data_test_knn[i][1][1] * factory + (maxy / 2);

    // console.log(data_test_knn[i][0] + ", " + x + ", " + y);
    if (data_test_knn[i][0][1] === "HOF") {
      drawPoint([x, y], 255, 0, 0);
    } else {
      drawPoint([x, y], 0, 255, 0);
    }
  }

}


function drawPoint(point, r = 255, g = 255, b = 255, size = 7) {
  var x = point[0];
  var y = point[1];

  // fill(r, g, b);
  // textSize(6);
  // text(Math.round(x) + ", " + Math.round(y), (x * width) / maxx + 3, height - (y * height) / maxy - 3);

  noFill();
  stroke(r, g, b);
  circle((x * width) / maxx, height - (y * height) / maxy, size); // 200 -y para q se dibuje apropiadamente
  stroke(128);
}
