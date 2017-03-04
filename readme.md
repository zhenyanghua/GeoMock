# GeoMock

This is an updated fork to the original GeoMock from [janmonschke/GeoMock](https://github.com/janmonschke/GeoMock) with added failure and recovery option to simulate all cases in Geolocation API environment.

## Usage
To import just add the script to the index.html before your entry point. Make sure you remove it after testing or in production.

```html
<!-- the script should be loaded before your application entry point -->
<script src="path/to/geomock.js"></script>
<!-- your application main entry point -->
<script src="app_or_bundle.js"></script>
```
## Configuration
```JavaScript
// setup the interval for watchPosition()
navigator.geolocation.delay = 1000;

// failure and recovery 
navigator.geolocation.shouldFail = true;
navigator.geolocation.failsAfterSteps = 6;
navigator.geolocation.recoversAfterSteps = 3;

// custom error message
navigator.geolocation.errorMessage = "There was an error retrieving the position!";

// waypoints - array of Position object.
navigator.geolocation.waypoints = [
	{
        coords: {
            latitude: 41.980532,
            longitude: -87.962401,
            heading: NaN,
            accuracy: 65
        },
        timestamp: 123456789
    },
    ...
];

```

## License
MIT
