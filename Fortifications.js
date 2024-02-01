const fortifications = [
    "Crimea.geojson",
    "Donetsk_Oblast.geojson",
    "Kharkiv_and_Luhansk_Oblasts.geojson",
    "Kherson_Oblast.geojson",
    "Russia_and_Belarus.geojson",
    "Zaporizhzhia_Oblast_1_of_2.geojson",
    "Zaporizhzhia_Oblast_2_of_2.geojson"
];

const FortificationDates = [
    ['0\/0\/', "Clear Map"],
    ['2022\/10\/', "October 2022"],
    ['2022\/11\/', "November 2022"],
    ['2022\/12\/', "December 2022"],
    ['2023\/01\/', "January 2023"],
    ['2023\/02\/', "February 2023"],
    ['2023\/03\/', "March 2023"],
    ['2023\/04\/', "April 2023"],
    ['2023\/05\/', "May 2023"],
    ['2023\/06\/', "June 2023"],
    ['2023\/07\/', "July 2023"],
    ['2023\/08\/', "August 2023"]
];

let currentSliderIndex = 0; // Default to the first position, adjust as necessary.



function createLayerId(fileName, dateString) {
    // Sanitize the dateString to remove slashes
    const sanitizedDate = dateString.replace(/\//g, '_');
    return 'fortification_' + fileName.replace('.geojson', '') + '_' + sanitizedDate;
}




function createMonthFilter(monthString) {
    if (monthString === '0/0/') {
        // A filter that effectively matches no features.
        return ['!=', ['get', 'Name'], '']; // Adjust as necessary.
    }
    // The monthString is in the format "YYYY/MM/", we need to compare just the "YYYY/MM" part.
    // Create a regex pattern to match the year and month at the start of the Name property.
    // Note: Mapbox expressions do not support regex directly, so we use string operations.
    // Extract the year and month part from the Name property.
    let yearMonthPattern = monthString.slice(0, -1); // Remove the trailing slash for comparison.
    // Use the 'has' expression to check if the 'Name' starts with the yearMonthPattern.
    // This isn't a direct replacement for regex, but should work based on your described structure.
    return ['==', ['slice', ['get', 'Name'], 0, 7], yearMonthPattern];
}

map.on('style.load', () => {
    updateMapLayer(currentSliderIndex)
});


function ResetFortifications() {

    map.loadImage('CameraIcon.png', (error, image) => {
        if (error) throw error;
        map.addImage('CameraIcon.png', image);
    });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

        map.addSource('Russian_and_Belarusian_Fortifications/Russian_and_Belarusian_fortifications_traced.geojson', {
        type: 'geojson',
        data: "Russian_and_Belarusian_Fortifications/Russian_and_Belarusian_fortifications_traced.geojson"
    })

    map.addLayer({
        id: 'Russian_and_Belarusian_Fortifications/Russian_and_Belarusian_fortifications_traced.geojson',
        type: 'line',
        source: "Russian_and_Belarusian_Fortifications/Russian_and_Belarusian_fortifications_traced.geojson", // reference the data source with the same ID
        layout: {},
        paint: {
            "line-color": "#DEC400",
            "line-width": 3,
            "line-opacity": 1
        }
    });

    fortifications.forEach(file => {
        FortificationDates.forEach((date) => {
            const monthString = date[0];
            const layerId = createLayerId(file, monthString);

            map.addSource(layerId, {
                type: 'geojson',
                data: 'Russian_and_Belarusian_Fortifications/' + file
            });

            map.addLayer({
                id: layerId,
                type: 'heatmap',
                source: layerId,
                layout: {
                    'visibility': 'none' // start with all layers hidden
                },
                paint: {
                    // increase weight as diameter breast height increases
                    'heatmap-weight': {
                      property: 'dbh',
                      type: 'exponential',
                      stops: [
                        [1, 0],
                        [62, 1]
                      ]
                    },
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                      stops: [
                        [11, 1],
                        [15, 3]
                      ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                      'interpolate',
                      ['linear'],
                      ['heatmap-density'],
                      0,
                      'rgba(0,0,0,0)',
                      0.2,
                      '#F16D25',
                      0.4,
                      '#F14C25',
                      0.6,
                      '#DB160D',
                      0.8,
                      '#980700'
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                      stops: [
                        [11, 15],
                        [15, 20]
                      ]
                    },
                    // decrease opacity to transition into the circle layer
                    'heatmap-opacity': {
                      default: 1,
                      stops: [
                        [14, 1],
                        [15, 0]
                      ]
                    }
                  },
                filter: createMonthFilter(monthString)
            });
        });
    });

    map.addSource("Russian_and_Belarusian_Fortifications/High_resolution_images.geojson", {
        type: 'geojson',
        data: "Russian_and_Belarusian_Fortifications/High_resolution_images.geojson"
    })

    map.addLayer({
        id: 'Russian_and_Belarusian_Fortifications/High_resolution_images.geojson',
        type: 'symbol',
        source: "Russian_and_Belarusian_Fortifications/High_resolution_images.geojson", // reference the data source with the same ID
        layout: {
            'icon-image': 'CameraIcon.png',
            'icon-size': 0.3
        }
    })

    map.on('mousemove', 'Russian_and_Belarusian_Fortifications/High_resolution_images.geojson', (e) => {

        // Turns Cursor to pointer on each region
        map.getCanvas().style.cursor = 'pointer';

        // Singles out the first found feature.
        const feature = e.features[0];

        // This displays the popUp it is also where I'm injecting info from the GEOJSON
        popup.setLngLat(e.lngLat)
            .setHTML(`
                <p><span>Reported: </span>${feature.properties.Name}</p>
                <br>
                <img src= ${feature.properties.URL} style="width: 220px;">`)

            .addTo(map);

    })

    map.on('click', 'Russian_and_Belarusian_Fortifications/High_resolution_images.geojson', (e) => {
        const feature = e.features[0];
        window.open(feature.properties.URL);
    })

    // remove the popup when the mouse moves away
    map.on('mouseleave', 'Russian_and_Belarusian_Fortifications/High_resolution_images.geojson', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    if (cameraToggle) {
        map.setPaintProperty('Russian_and_Belarusian_Fortifications/High_resolution_images.geojson', 'icon-opacity', 1.0)
} else {
        map.setPaintProperty('Russian_and_Belarusian_Fortifications/High_resolution_images.geojson', 'icon-opacity', 0.0)
}

if(LineToggle){
    map.setPaintProperty('Russian_and_Belarusian_Fortifications/Russian_and_Belarusian_fortifications_traced.geojson', 'line-opacity', 1.0)
}else{
    map.setPaintProperty('Russian_and_Belarusian_Fortifications/Russian_and_Belarusian_fortifications_traced.geojson', 'line-opacity', 0.0)
}
    

}

function updateMapLayer(selectedIndex) {
    const selectedMonth = FortificationDates[selectedIndex][0];

    // Check if the "Clear Map" option is selected based on the monthString
    const isClearMapSelected = selectedMonth === '0/0/';

    fortifications.forEach(file => {
        FortificationDates.forEach((date, index) => {
            const monthString = date[0];
            const layerId = 'fortification_' + file.replace('.geojson', '').replace(/[^a-zA-Z0-9]/g, '_') + '_' + monthString.replace(/\//g, '_');

            // If "Clear Map" is selected, hide all layers. Otherwise, update visibility based on the selected month.
            const visibility = isClearMapSelected ? 'none' : (selectedMonth === monthString ? 'visible' : 'none');
            
            // Ensure the layer exists before trying to set its visibility.
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', visibility);
            }
        });
    });
}

BombSlider.addEventListener('input', function () {
    selectedDateIndex = this.value;
    currentSliderIndex = selectedDateIndex; // Update the global variable.
    let currentBombDisplay = document.getElementById('currentBombDisplay');
    currentBombDisplay.innerHTML = "Reported:" + FortificationDates[selectedDateIndex][1];
    updateMapLayer(selectedDateIndex);
});




ResetFortifications();