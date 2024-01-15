// These coordinates make sure you can't navigate outside of ukraine on the map.
var bounds = [
    [15, 40], // Southwest coordinates
    [50, 55]  // Northeast coordinates
];

// An array of the GeoJson files we need to load in for hover effects, as well as selecting specific regions.
const geojsonFiles = [
    'crimea.geojson',
    'UA_05_Vinnytska.geojson',
    'UA_07_Volynska.geojson',
    'UA_09_Luhanska.geojson',
    'UA_12_Dnipropetrovska.geojson',
    'UA_14_Donetska.geojson',
    'UA_18_Zhytomyrska.geojson',
    'UA_21_Zakarpatska.geojson',
    'UA_23_Zaporizka.geojson',
    'UA_26_Ivano_Frankivska.geojson',
    'UA_32_Kyivska.geojson',
    'UA_35_Kirovohradska.geojson',
    'UA_43_Avtonomna_Respublika_Krym.geojson',
    'UA_46_Lvivska.geojson',
    'UA_48_Mykolaisvka.geojson',
    'UA_51_Odeska.geojson',
    'UA_53_Poltavska.geojson',
    'UA_56_Rivnenska.geojson',
    'UA_59_Sumska.geojson',
    'UA_61_Ternopilska.geojson',
    'UA_63_Kharkivska.geojson',
    'UA_65_Khersonska.geojson',
    'UA_68_Khmelnytska.geojson',
    'UA_71_Cherkaska.geojson',
    'UA_74_Chernihivska.geojson',
    'UA_77_Chernivetska.geojson', 
    'Mykolaiv.geojson'
];

//access token for the mapbox API, I'm using my personal one but we might want to buy a version before we deploy it.
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVuY2FuZmlndXJza2kiLCJhIjoiY2xyNTZyeGcxMXY3dzJscW1rMmk4d3R5aCJ9.mTx5M9U67nyYqhwDgrnk8w';
var map = new mapboxgl.Map({
    center: [31.1656, 48.3794],
    zoom: 5.2,
    minZoom: 5.2,
    container: 'map',
    maxBounds: bounds,
    style: 'mapbox://styles/duncanfigurski/clrfco9tw009w01qra04j91jq'
})

// this is a placeholder variable for the selected geoJSON file. 
let currentHighlightedRegion = null;

// Side Bar displaying the current ukraine region info. 
let sideBar = document.getElementById("sidebar")

map.on('load', () => {

    // For loop loading all GeoJson Files, as well as setting their opacity to 0.0
    geojsonFiles.forEach(fileName => {

        // Construct the source ID and file path
        const sourceId = fileName;
        const filePath = `MapData/${fileName}`;

        // Add a source for the GeoJSON file
        map.addSource(sourceId, {
            type: 'geojson',
            data: filePath
        });

        // Add a layer to visualize the polygon using the same source
        map.addLayer({
            id: sourceId,
            type: 'fill',
            source: sourceId, // reference the data source with the same ID
            layout: {},
            paint: {
                'fill-color': '#abe0b7',
                'fill-opacity': 0.0
            }
        });


        // Inside the loop, add event listeners for this sourceId
        map.on('mousemove', sourceId, function (e) {
            map.getCanvas().style.cursor = 'pointer'; // Change cursor style on hover

            // Extra info being loaded from the geoJSON file. 
            const regionName = e.features[0].properties['name:en'];
            const imgSrc = e.features[0].properties['flag']


            map.setPaintProperty(sourceId, 'fill-opacity', 0.2); // Adjust the opacity value as needed
            currentHoveredRegion = sourceId;

            const img = new Image();
            img.src = imgSrc;

            // add name, and flag to the sidebar when hovered on specific region.
            img.onload = function () {
                sideBar.innerHTML = '<div><h3>' + regionName + '</h3>  <img class="flag"; src="' + imgSrc + '"></div>'
            }

            
            img.onerror = function () {
                 sideBar.innerHTML = '<div><h3>' + regionName + '</h3>  <img class="flag"; src="' + imgSrc + '"></div>'
            }

        });

        map.on('mouseleave', sourceId, function () {
            map.getCanvas().style.cursor = ''; // Reset cursor style when leaving the feature
            map.setPaintProperty(sourceId, 'fill-opacity', 0.0); // Adjust the opacity value to match your original style
            sidebar.innerHTML = ''
        });
    });
});

