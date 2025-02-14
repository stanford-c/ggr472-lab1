//------
// Lab 2
//------

mapboxgl.accessToken = "pk.eyJ1Ijoic3RhbmZvcmRjaGFuZyIsImEiOiJjbTVvZHBxOHUwa3p2Mmxwbm90N2I0MzZqIn0.JfQLnEhITEAZl2kHoQP7rA";

// Initialize the map
const map = new mapboxgl.Map({
    container: "lab2-map", // map container ID
    style: "mapbox://styles/stanfordchang/cm757kysv00hs01s3bdvk1gez", // custom style URL
    center: [-73.757, 40.670], // starting position of New York City
    zoom: 8, // starting zoom level
    maxZoom: 8 // prevent zooming in past level 8
});

map.on("load", () => {

    //-----------------
    // FIRST DATA LAYER
    //-----------------

    // Add GeoJSON data source of flight routes
    map.addSource("flight-routes", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/stanford-c/ggr472-lab1/main/data/routes.geojson"
    });

    // Visualize flight routes from GeoJSON data
    map.addLayer({
        id: "flight-routes-JFK",
        type: "line",
        source: "flight-routes",
        // Filter to show JFK flights
        filter: [
        "any",
        ["==", ["get", "src"], "JFK"],
        ["==", ["get", "dst"], "JFK"]
        ],
        paint: {
        "line-color": "#c01933",
        "line-width": 0.3
        }
    });

    map.addLayer({
        id: "flight-routes-EWR",
        type: "line",
        source: "flight-routes",
        // Filter to show EWR flights
        filter: [
        "any",
        ["==", ["get", "src"], "EWR"],
        ["==", ["get", "dst"], "EWR"]
        ],
        paint: {
        "line-color": "#0033a0",
        "line-width": 0.3
        }
    });
    
    map.addLayer({
        id: "flight-routes-LGA",
        type: "line",
        source: "flight-routes",
        // Filter to show LGA flights
        filter: [
        "any",
        ["==", ["get", "src"], "LGA"],
        ["==", ["get", "dst"], "LGA"]
        ],
        paint: {
        "line-color": "#36495A",
        "line-width": 0.3
        }
    });
    
    map.addLayer({
        id: "flight-routes-ISP",
        type: "line",
        source: "flight-routes",
        // Filter to show ISP flights
        filter: [
        "any",
        ["==", ["get", "src"], "ISP"],
        ["==", ["get", "dst"], "ISP"]
        ],
        paint: {
        "line-color": "#f9b612",
        "line-width": 0.3
        }
    });
    
    map.addLayer({
        id: "flight-routes-SWF",
        type: "line",
        source: "flight-routes",
        // Filter to show SWF flights
        filter: [
        "any",
        ["==", ["get", "src"], "SWF"],
        ["==", ["get", "dst"], "SWF"]
        ],
        paint: {
        "line-color": "#ff9801",
        "line-width": 0.3
        }
    });
    
    map.addLayer({
        id: "flight-routes-TTN",
        type: "line",
        source: "flight-routes",
        // Filter to show TTN flights
        filter: [
        "any",
        ["==", ["get", "src"], "TTN"],
        ["==", ["get", "dst"], "TTN"]
        ],
        paint: {
        "line-color": "#248168",
        "line-width": 0.3
        }
    });
    
    map.addLayer({
        id: "flight-routes-HPN",
        type: "line",
        source: "flight-routes",
        // Filter to show HPN flights
        filter: [
        "any",
        ["==", ["get", "src"], "HPN"],
        ["==", ["get", "dst"], "HPN"]
        ],
        paint: {
        "line-color": "#00205b",
        "line-width": 0.3
        }
    });

    //------------------
    // SECOND DATA LAYER
    //------------------

    // Add GeoJSON data source from Lab 1 (data of airpots around NYC)
    map.addSource("airports-data", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/stanford-c/ggr472-lab1/main/data/newyorkairports.geojson" // URL to newyorkairports.geojson file
    });

    // Visualize airport points from GeoJSON data
    map.addLayer({
        id: "airports-circle",
        type: "circle",
        source: "airports-data",
        paint: {
        "circle-radius": 6,
        "circle-color": ["get", "marker-color"],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 3
        }
    });
});

//------
// Lab 1
//------

// Button and text elements
const yesJFKButton = document.getElementById("btn-yes-jfk");
const noJFKButton = document.getElementById("btn-no-jfk");
const yesJFKCountDisplay = document.getElementById("count-yes-jfk");
const noJFKCountDisplay = document.getElementById("count-no-jfk");

const yesEWRButton = document.getElementById("btn-yes-ewr");
const noEWRButton = document.getElementById("btn-no-ewr");
const yesEWRCountDisplay = document.getElementById("count-yes-ewr");
const noEWRCountDisplay = document.getElementById("count-no-ewr");

const yesLGAButton = document.getElementById("btn-yes-lga");
const noLGAButton = document.getElementById("btn-no-lga");
const yesLGACountDisplay = document.getElementById("count-yes-lga");
const noLGACountDisplay = document.getElementById("count-no-lga");

// Initialize variables
let countJFKYes = 0;
let countJFKNo = 0;
let countEWRYes = 0;
let countEWRNo = 0;
let countLGAYes = 0;
let countLGANo = 0;

// Event listeners to track button clicks for each airport poll
// Increase count variables for each airport and update their respective text displays on the home page
yesJFKButton.addEventListener("click", () => {
  countJFKYes++;
  yesJFKCountDisplay.innerHTML = countJFKYes;
});

noJFKButton.addEventListener("click", () => {
  countJFKNo++;
  noJFKCountDisplay.innerHTML = countJFKNo;
});

yesEWRButton.addEventListener("click", () => {
    countEWRYes++;
    yesEWRCountDisplay.innerHTML = countEWRYes;
});
  
noEWRButton.addEventListener("click", () => {
    countEWRNo++;
    noEWRCountDisplay.innerHTML = countEWRNo;
});

yesLGAButton.addEventListener("click", () => {
    countLGAYes++;
    yesLGACountDisplay.innerHTML = countLGAYes;
});
  
noLGAButton.addEventListener("click", () => {
    countLGANo++;
    noLGACountDisplay.innerHTML = countLGANo;
});