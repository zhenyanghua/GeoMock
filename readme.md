# GeoMock

This is an updated fork to the original GeoMock from [https://github.com/janmonschke/GeoMock](janmonschke/GeoMock) with added failure and recovery option to simulate all cases in Geolocation API environment.

## Usage

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