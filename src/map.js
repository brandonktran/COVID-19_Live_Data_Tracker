const mappa = new Mappa('Leaflet');
let myMap;
let canvas;

let data = [];

let Color;

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
  canvas = createCanvas(800, 400).parent("canvasContainer");
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  Color = color(147, 112, 219, 70); // default color
  processData();
}


function draw() {
  clear();
  for (let country of data) {
    const pix = myMap.latLngToPixel(country.lat, country.lon);
    fill(Color);
    const zoom = myMap.zoom();
    const scale = pow(2, zoom);
    ellipse(pix.x, pix.y, country.diameter * scale);
  }
}

function processData() {
  data = [];

  let max = 0;
  let min = Infinity;

  for (i = 0; i < output.length; i++) {
    let country = output[i].country.toLowerCase();
    for (let j = 0; j < countries.length; j++) {
      if (countries[j].Country.toLowerCase() === country) {
        console.log(country);
        let lat = countries[j]["Latitude (average)"];
        let lon = countries[j]["Longitude (average)"];
        let totalCases = output[i].cases;
        data.push({
          lat,
          lon,
          totalCases
        });
        if (totalCases > max) {
          max = totalCases;
        }
        if (totalCases < min) {
          min = totalCases;
        }
      }
    }
  }
  let new_min = Math.sqrt(min);
  let new_max = Math.sqrt(max);

  //remap number
  for (let country of data) {
    country.diameter = map(Math.sqrt(country.totalCases), new_min, new_max, 1, 20);
  }
}

setInterval(processData,1000);
