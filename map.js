// These coordinates make sure you can't navigate outside of ukraine on the map.
var bounds = [
    [15, 40], // Southwest coordinates
    [50, 55]  // Northeast coordinates
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

document.getElementById('slider2Div').style.display = "none"

//This is the toggle button on the side that switches between our custom map style and the sattelite map style.
document.getElementById('mapButton').addEventListener('click', function() {
    var currentStyle = map.getStyle().sprite;
    if (currentStyle.includes('clrpgupsg007d01p28njtcb6a')) {
        // If current style is standard, switch to satellite
        map.setStyle('mapbox://styles/duncanfigurski/clr57sc2s00ww01qr9czt4saf');
        document.getElementById('sliderDiv').style.display = 'none';
        document.getElementById('slider2Div').style.display = "block"
        document.getElementById('cameraButtonTog').style.display = "block"
        document.getElementById('lineTogButton').style.display = "block"
        document.getElementById('infoContainer').style.display = "none"
    } else {
        // If current style is satellite, switch back to standard
        document.getElementById('sliderDiv').style.display = 'block';
        document.getElementById('slider2Div').style.display = "none"
        document.getElementById('cameraButtonTog').style.display = "none"
        document.getElementById('lineTogButton').style.display = "none"
        document.getElementById('infoContainer').style.display = "block"
        
        map.setStyle('mapbox://styles/duncanfigurski/clrpgupsg007d01p28njtcb6a');
    }
});

