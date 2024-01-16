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
    style: 'mapbox://styles/duncanfigurski/clrfco9tw009w01qra04j91jq'
})


