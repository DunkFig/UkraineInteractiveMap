
const geojsonLineFiles = [
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


map.on('load', () => {

    // For loop loading all GeoJson Files, as well as setting their opacity to 0.0
    geojsonLineFiles.forEach(fileName => {
        let DateName = fileName.replace(".geojson", "");
        // Construct the source ID and file path
        const LinesourceId = DateName + "Line";

        const LinefilePath = `GeoJsonLines/${fileName}`;

        // Add a source for the GeoJSON file
        map.addSource(LinesourceId, {
            type: 'geojson',
            data: LinefilePath
        });


        // Add a layer to visualize the polygon using the same source
        map.addLayer({
            id: LinesourceId,
            type: 'line',
            source: LinesourceId, // reference the data source with the same ID
            layout: {},
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });

   

    })


})