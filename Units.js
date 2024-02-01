//This has all of the dates for the Slider.
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
];

//This hold an array of all of the Icons for easy access. 
const icons = [
    { id: 'ruCorps', url: 'Icons/ruCorps.png' },
    { id: 'ruArmy', url: 'Icons/ruArmy.png' },
    { id: 'ruArtillery', url: 'Icons/ruArtillery.png' },
    { id: 'ruBattalion', url: 'Icons/ruBattalion.png' },
    { id: 'ruBattle', url: 'Icons/ruBattle.png' },
    { id: 'ruBrigade', url: 'Icons/ruBrigade.png' },
    { id: 'ruCavalry', url: 'Icons/ruCavalry.png' },
    { id: 'ruDivision', url: 'Icons/ruDivision.png' },
    { id: 'ruHeadquarters', url: 'Icons/ruHeadquarters.png' },
    { id: 'ruInfantry', url: 'Icons/ruInfantry.png' },
    { id: 'ruRegiment', url: 'Icons/ruRegiment.png' },
    { id: 'uaArmy', url: 'Icons/uaArmy.png' },
    { id: 'uaArtillery', url: 'Icons/uaArtillery.png' },
    { id: 'uaBattalion', url: 'Icons/uaBattalion.png' },
    { id: 'uaBattle', url: 'Icons/uaBattle.png' },
    { id: 'uaBrigade', url: 'Icons/uaBrigade.png' },
    { id: 'uaCavalry', url: 'Icons/uaCavalry.png' },
    { id: 'uaDivision', url: 'Icons/uaDivision.png' },
    { id: 'uaHeadquarters', url: 'Icons/uaHeadquarters.png' },
    { id: 'uaInfantry', url: 'Icons/uaInfantry.png' },
    { id: 'uaRegiment', url: 'Icons/uaRegiment.png' },
    { id: 'GeneralRussia', url: 'Icons/GeneralIconRussia.png' },
    { id: "GeneralUkraine", url: 'Icons/GeneralIconUkraine.png' }

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



// This variable is used as a placeholder to cycle through the array of dates
let DateIndex = 0

//Global declartion of selected Date Index
let selectedDateIndex = 0

// This variable will be a placeholder used for accessing and comparing against the array
let selectedDate = "2022-03-31";


//the DateSlider on the top
let dateSlider = document.getElementById("date")
let BombSlider = document.getElementById("dateFort")


map.on('style.load', () => {
    var currentStyle = map.getStyle().sprite;
    if (currentStyle.includes('clrpgupsg007d01p28njtcb6a')) {
        ResetBattle()
    } else {
        ResetFortifications()
    }
});

function ResetBattle() {

    // For loop loading all GeoJson Files, as well as setting their opacity to 0.0
    geojsonLineFiles.forEach(fileName => {
        let DateName = fileName.replace(".geojson", "");

        // Construct the source ID and file path
        const sourceId = DateName;

        const filePath = `Boundaries/${fileName}`;

        // Construct the source ID and file path
        const LinesourceId = DateName + "Line";

        const LinefilePath = `GeoJsonLines/${fileName}`;

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

        // Add a source for the GeoJSON LINE file
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
                'line-color': '#db9e02',
                'line-width': 11
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
            'fill-opacity': 0.4
        }
    });

    map.fadeDuration = 400

    //load all of the images from Icons
    icons.forEach(icon => {
        map.loadImage(icon.url, (error, image) => {
            if (error) throw error;
            map.addImage(icon.id, image);
        });
    });

    //filepath for Battles
    const filePath = `Units&BattleData/units_all.geojson`;

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

    //Update the map, is called when the slider is moved.
    function updateMapLayer(selectedDateString) {
        const filteredData = {
            ...geojsonData,
            features: geojsonData.features.filter(feature => {
                const iconName = `${feature.properties.country}${feature.properties.strength}`;
                feature.properties.icon = iconName; // Construct icon name from feature properties
                return feature.properties.date === selectedDateString;
            })
        };
        DateIndex = dates.findIndex(date => date[0] === selectedDate);

        dates.forEach(date => {
            map.setPaintProperty(
                date[0],
                'fill-opacity',
                0.0
            );
            map.setPaintProperty(
                date[0],
                'fill-color', 'red'
            );
            map.setPaintProperty(
                date[0] + "Line",
                'line-opacity',
                0.0
            );
        })
        map.setPaintProperty(
            selectedDate,
            'fill-opacity',
            0.5
        );
        map.setPaintProperty(
            selectedDate + "Line",
            'line-opacity',
            0.6
        );
        if (DateIndex != 0) {
            map.setPaintProperty(
                dates[DateIndex - 1][0],
                'fill-color', '#2A6BF5',
            );
            map.setPaintProperty(
                dates[DateIndex - 1][0],
                'fill-opacity', 0.2
            );
        }
        map.getSource('battles').setData(filteredData);
    }

    // The source for the GeoJson
    map.addSource('battles', { // Give a unique ID for the source
        type: 'geojson',
        data: filePath
    });

    // Add the Layers from the GeoJson file, and attach the icons to it. 
    //Detailed View
    map.addLayer({
        id: 'battles-layer',
        type: 'symbol',
        source: 'battles',
        layout: {
            'icon-image': ['get', 'icon'],
        },
        minzoom: 6
    });

    map.addLayer({
        id: 'battles-general-russia',
        type: 'symbol',
        source: 'battles',
        layout: {
            'icon-image': 'GeneralRussia'
        },
        filter: ['==', ['get', 'country'], 'ru'],
        maxzoom: 6
    });

    map.addLayer({
        id: 'battles-general-ukraine',
        type: 'symbol',
        source: 'battles',
        layout: {
            'icon-image': 'GeneralUkraine'
        },
        filter: ['==', ['get', 'country'], 'ua'],
        maxzoom: 6
    });



    // Create a popup, but don't add it to the map yet
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    //Pop Up info.
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
            <p><span>Subordinate to : </span>${feature.properties.subordinate_to}</p>`)
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
    });


    // remove the popup when the mouse moves away
    map.on('mouseleave', 'battles-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    // Slider event listener
    dateSlider.addEventListener('input', function () {
        selectedDateIndex = this.value;
        selectedDate = dates[selectedDateIndex][0];
        currentDateDisplay.innerHTML = dates[selectedDateIndex][1]; // Display the formatted date
        updateMapLayer(selectedDate);
    });




}


ResetBattle()


