
let dates = [
    ["2022-03-31", "March 31st 2022"],
    ["2022-04-01", "April 1st 2022"],
    ["2022-04-03", "April 3rd 2022"],
    ["2022-04-06", "April 6th 2022"],
    ["2022-04-09", "April 9th 2022"],
    ["2022-04-12", "April 12th 2022"],
    ["2022-04-15", "April 15th 2022"],
    ["2022-04-18", "April 18th 2022"],
    ["2022-04-21", "April 21st 2022"],
    ["2022-04-24", "April 24th 2022"],
    ["2022-04-27", "April 27th 2022"],
    ["2022-04-30", "April 30th 2022"],
    ["2022-05-07", "May 7th 2022"],
    ["2022-05-13", "May 13th 2022"],
    ["2022-05-20", "May 20th 2022"],
    ["2022-05-27", "May 27th 2022"],
    ["2022-06-05", "June 5th 2022"],
    ["2022-06-13", "June 13th 2022"],
    ["2022-07-05", "July 5th 2022"],
    ["2022-08-20", "August 20th 2022"],
    ["2022-08-27", "August 27th 2022"],
    ["2022-09-11", "September 11th 2022"]
]

//the DateSlider on the top
let dateSlider = document.getElementById("date")

map.on('load', () => {
    const filePath = `BattleData/units_all.geojson`;

    //placeholder variable for geoJSON data
    let geojsonData = null;

    //Date Display under the Slider
    let currentDateDisplay = document.getElementById("currentDateDisplay")

    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            geojsonData = data;
            updateMapLayer(dates[dateSlider.value][0]);
        });

    function updateMapLayer(selectedDateString) {
        const filteredData = {
            ...geojsonData,
            features: geojsonData.features.filter(feature => {
                return feature.properties.date === selectedDateString;
            })
        };

        map.getSource('battles').setData(filteredData);
    }

    // The source for the GeoJson
    map.addSource('battles', { // Give a unique ID for the source
        type: 'geojson',
        data: filePath
    });


    // Add a layer to visualize the polygon using the same source
    map.addLayer({
        id: 'battles-layer',
        type: 'circle',
        source: 'battles',
        paint: {
            'circle-radius': {
                'base': 5,
                'stops': [
                    [3, 4],
                    [22, 180]
                ]
            },
            'circle-color': [
                'match',
                ['get', 'country'],
                'ru', '#6e1704', // Color for 'ru'
                'ua', '#abe0b7', // Color for 'ua'
                '#ccc' // Default color for other types
            ]
        },// reference the data source by the unique ID you gave it
        layout: {}
    });


    // Create a popup, but don't add it to the map yet
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mousemove', 'battles-layer', (e) => {

        // Turns Cursor to pointer on each region
        map.getCanvas().style.cursor = 'pointer';

        // Singles out the first found feature.
        const feature = e.features[0];

        // This displays the popUp it is also where I'm injecting info from the GEOJSON
        popup.setLngLat(e.lngLat)
            .setHTML(`<h1>${feature.properties.unit}</h1>
            <p><span>Type: </span>${feature.properties.type}</p>
            <p><span>Country: </span>${feature.properties.country}</p>
            <p><span>Strength: </span>${feature.properties.strength}</p>
            <p><span>Source: </span> ${feature.properties.sources_url} </p>`) // Replace 'title' and 'description' with your actual property names
            .addTo(map);

        // Ensure the popup is added to the map before attempting to modify its style
        setTimeout(() => {
            if (feature && feature.properties && (feature.properties.country === 'ru' || feature.properties.country === 'ua')) {
                let popupStyle = document.querySelector('.mapboxgl-popup-content'); // Assuming there's only one popup at a time
                if (popupStyle) {
                    // Use different colors if necessary
                    if (feature.properties.country === 'ru') {
                        popupStyle.style.backgroundColor = 'rgb(110, 23, 4, 0.935)'; // Color for 'ru'
                        popupStyle.style.color = "aliceblue"
                    } else if (feature.properties.country === 'ua') {
                        popupStyle.style.backgroundColor = 'rgba(171, 224, 183, 0.925)'; // Color for 'ua'
                        popupStyle.style.color = "rgb(16, 16, 16, 0.9)"
                    }
                }
            }
        }, 10);
        //
    });

    map.on('mouseleave', 'battles-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    // Slider event listener
    dateSlider.addEventListener('input', function () {
        const selectedDateIndex = this.value;
        const selectedDate = dates[selectedDateIndex][0];
        currentDateDisplay.innerHTML = dates[selectedDateIndex][1]; // Display the formatted date
        updateMapLayer(selectedDate);
    });


});
