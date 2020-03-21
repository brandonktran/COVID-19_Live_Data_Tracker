const mappa = new Mappa('Leaflet');
let trainMap;
let canvas;

let data = [];

let currentColor;

let output = [];


const options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
  fetch('https://coronavirus-19-api.herokuapp.com/countries')
    .then((response) => response.json())
    .then((countries) => {
      for (i = 0; i < countries.length - 1; i++) {
        output.push(countries[i]);
      }
    });
}

function setup() {
  canvas = createCanvas(1000, 600).parent("canvasContainer");
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);

  currentColor = color(255, 0, 200, 100); // default color
  processData();
}


function draw() {
  clear();
  for (let country of data) {
    const pix = trainMap.latLngToPixel(country.lat, country.lon);
    fill(currentColor);
    const zoom = trainMap.zoom();
    const scl = pow(2, zoom); // * sin(frameCount * 0.1);
    ellipse(pix.x, pix.y, country.diameter * scl);
  }
}

function processData() {
  data = []; // always clear the array when picking a new type

  let maxValue = 0;
  let minValue = Infinity;

  for (i = 0; i < output.length; i++) {
    let country = output[i].country.toLowerCase();
    for (let j = 0; j < countries.length; j++) {
      if (countries[j].Country.toLowerCase() === country) {
        console.log(country);
        let lat = countries[j]["Latitude (average)"];
        let lon = countries[j]["Longitude (average)"];
        let count = output[i].cases;
        data.push({
          lat,
          lon,
          count
        });
        if (count > maxValue) {
          maxValue = count;
        }
        if (count < minValue) {
          minValue = count;
        }
      }
    }
  }
  let minD = sqrt(minValue);
  let maxD = sqrt(maxValue);

  for (let country of data) {
    country.diameter = map(sqrt(country.count), minD, maxD, 1, 20);
  }
}
