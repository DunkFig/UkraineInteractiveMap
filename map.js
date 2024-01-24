// These coordinates make sure you can't navigate outside of ukraine on the map.
var bounds = [
    [15, 40], // Southwest coordinates
    [50, 55]  // Northeast coordinates
];

const geojsonFiles = [
    "2022-03-31.geojson",
    "2022-04-01.geojson",
    "2022-04-03.geojson",
    "2022-04-06.geojson",
    "2022-04-09.geojson",
    "2022-04-12.geojson",
    "2022-04-15.geojson",
    "2022-04-18.geojson",
    "2022-04-21.geojson",
    "2022-04-24.geojson",
    "2022-04-27.geojson",
    "2022-04-30.geojson",
    "2022-05-07.geojson",
    "2022-05-13.geojson",
    "2022-05-20.geojson",
    "2022-05-27.geojson",
    "2022-06-05.geojson",
    "2022-06-13.geojson",
    "2022-07-05.geojson",
    "2022-08-20.geojson",
    "2022-08-27.geojson",
    "2022-09-11.geojson"
];


//access token for the mapbox API, I'm using my personal one but we might want to buy a version before we deploy it.
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVuY2FuZmlndXJza2kiLCJhIjoiY2xyNTZyeGcxMXY3dzJscW1rMmk4d3R5aCJ9.mTx5M9U67nyYqhwDgrnk8w';
var map = new mapboxgl.Map({
    center: [31.1656, 48.3794],
    zoom: 5.2,
    minZoom: 5.2,
    container: 'map',
    maxBounds: bounds,
    style: 'mapbox://styles/duncanfigurski/clrpgupsg007d01p28njtcb6a'
})


map.on('load', () => {

    // For loop loading all GeoJson Files, as well as setting their opacity to 0.0
    geojsonFiles.forEach(fileName => {
        let DateName = fileName.replace(".geojson", "");
        // Construct the source ID and file path
        const sourceId = DateName;

        const filePath = `Boundaries/${fileName}`;

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
                'fill-color': 'red',
                'fill-opacity': 0.0
            }
        });

   

    })

    fetch('Boundaries/UA_43_Avtonomna_Respublika_Krym.geojson')
        .then(response => response.json())
        .then(data => {
            geojsonData = data;
        });

         // The source for the GeoJson
    map.addSource('crimea', { // Give a unique ID for the source
        type: 'geojson',
        data: 'Boundaries/UA_43_Avtonomna_Respublika_Krym.geojson'
    });

    map.addLayer({
        id: 'crimea-layer',
        type: 'fill',
        source: 'crimea',
        layout: {},
            paint: {
                'fill-color': 'red',
                'fill-opacity': 0.3
            }
    });


})