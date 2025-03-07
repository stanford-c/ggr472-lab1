/*------------------------------
GGR472 Lab 3 (replaces Lab 2 map)
Incorporates feedback from Lab 2
--------------------------------*/

/*------------------------------
INITIALIZE MAP
--------------------------------*/

mapboxgl.accessToken = "pk.eyJ1Ijoic3RhbmZvcmRjaGFuZyIsImEiOiJjbTVvZHBxOHUwa3p2Mmxwbm90N2I0MzZqIn0.JfQLnEhITEAZl2kHoQP7rA";

const map = new mapboxgl.Map({
    container: "lab3-map", // map container ID
    style: "mapbox://styles/stanfordchang/cm757kysv00hs01s3bdvk1gez", // custom style URL
    center: [-73.757, 40.670], // starting position of New York City
    zoom: 8, // starting zoom level
    maxZoom: 10
});


/*------------------------------
MAP CONTROLS
--------------------------------*/

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());


/*------------------------------
ACCESS AND VISUALIZE DATA
--------------------------------*/

map.on("load", () => {
    /*-----------
    Flight routes
    -------------*/

    // Add GeoJSON data source of flight routes
    map.addSource("flight-routes", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/stanford-c/ggr472-lab1/main/data/routes.geojson"
    });

    // Add layers and classify by src
    map.addLayer({
        id: "flight-routes-layer",
        type: "line",
        source: "flight-routes",
        // Filter select airports
        filter: [
            "match",
            ["get", "src"],
            ["JFK", "EWR", "LGA", "ISP", "SWF", "TTN", "HPN"], true, false
        ],
        // Colour-code based on the src property
        paint: {
        "line-width": [
            "interpolate", ["linear"], ["zoom"], // Adjust width according to zoom
            0, 0.5, // Thinner lines zoomed out
            8, 1,
            10, 2, // Thicker lines zoomed in
        ],
        "line-color": [
            "match",
            ["get", "src"],
            "JFK", "#c01933",
            "EWR", "#0033a0",
            "LGA", "#36495A",
            "ISP", "#f9b612",
            "SWF", "#ff9801",
            "TTN", "#248168",
            "HPN", "#00205b",
            "#888888" // Fallback
            ]
        }
    });

    /*-----------
    Airports
    -------------*/
    map.addSource("airports-data", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/stanford-c/ggr472-lab1/main/data/newyorkairports.geojson" // URL to newyorkairports.geojson file
    });
    
    map.addLayer({
        id: "airports-circle",
        type: "circle",
        source: "airports-data",
        paint: {
        "circle-radius": [
            "interpolate", ["linear"], ["zoom"], // Adjut size according to zoom
            0, 2, // Smaller circles zoomed out
            8, 5,  
            10, 10, // Larger circles zoomed in
            ],
        "circle-color": ["get", "marker-color"],
        "circle-stroke-color": "#fff",
        "circle-stroke-width": 3
        }
    });
    
});


/*------------------------------
LEGEND
--------------------------------*/

// Declare legend variables
const legend = document.getElementById('legend');
const legendlabels = ["JFK", "EWR", "LGA", "ISP", "SWF", "TTN", "HPN"];
const legendcolours = ["#c01933", "#0033a0", "#36495A", "#f9b612", "#ff9801", "#248168", "#00205b"];

// Create a block for the colours and labels of each layer
legendlabels.forEach((label, i) => {
    const colour = legendcolours[i];

    const item = document.createElement('div'); // Create row for each layer
    const key = document.createElement('span'); // Create key for each row

    key.className = 'legend-key'; // Properties defined in CSS
    key.style.backgroundColor = colour; // Colour retrieved from layers array

    const value = document.createElement('span'); // Add value variable to legend row
    value.innerHTML = `${label}`; // Assign value variable text based on label

    item.appendChild(key); // Add key to legend row
    item.appendChild(value); // Add value to legend row

    legend.appendChild(item); // Add row to legend
});

/*------------------------------
LISTENERS FOR HTML ELEMENTS
--------------------------------*/

// Toggle visibility of legend
let legendcheck = document.getElementById('legendcheck');

legendcheck.addEventListener('click', () => {
    if (legendcheck.checked) {
        legendcheck.checked = true;
        legend.style.display = 'block';
    }
    else {
        legend.style.display = "none";
        legendcheck.checked = false;
    }
});

// Filter routes by dropdown
document.getElementById('airportDropdown').addEventListener('change', (e) => {
    const choice = e.target.value;
    // If the user chooses to show all routes
    if (choice === 'All') {
        map.setFilter('flight-routes-layer', [
            "match",
            ["get", "src"],
            ["JFK", "EWR", "LGA", "ISP", "SWF", "TTN", "HPN"], true, false
        ]);
    }
    // Otherwise, filter by airport
    else {
        map.setFilter('flight-routes-layer', [
        'any',
        ['==', ['get', 'src'], choice],
        ]);
    }
});


/*------------------------------
MOUSE EVENTS
--------------------------------*/

/*-----------
Flight routes
-------------*/

// Change cursor when mouse enters or leaves
map.on('mouseenter', 'airports-circle', () => {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'airports-circle', () => {
    map.getCanvas().style.cursor = '';
});

// Show popup when clicked
map.on('click', 'airports-circle', (e) => {

    new mapboxgl.Popup()
        .setLngLat(e.lngLat) // Set coordinates of popup based on mouse click location
        .setHTML(`
            <h5>${e.features[0].properties.name}</h5>
            Largest airline: ${e.features[0].properties["largest-airline"]}
        `)
        .addTo(map); // Show popup on map
});


// /*-----------
// Airports
// -------------*/

// Create popup
let hoverPopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// Listen for when mouse enters
map.on("mouseenter", "flight-routes-layer", (e) => {
    map.getCanvas().style.cursor = "pointer";
    const popupText = `${e.features[0].properties.src} → ${e.features[0].properties.dst}`; // Origin to destination (e.g., JFK → YYZ)
    hoverPopup
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${popupText}</strong>`)
        .addTo(map);
});

// Listen for when mouse leaves
map.on("mouseleave", "flight-routes-layer", () => {
    map.getCanvas().style.cursor = "";
    hoverPopup.remove();
});