/**
 * GeoMock
 *
 * An updated fork from janmonschke/GeoMock with failure and recovery option.
 */ 
(function() {
    if (typeof navigator === "undefined" || navigator === null) {
        window.navigator = {};
    }
    if (navigator.geolocation == null) {
        window.navigator.geolocation = {};
    }
    navigator.geolocation.delay = 1000;
    navigator.geolocation.shouldFail = true;
    navigator.geolocation.failsAfterSteps = 6;
    navigator.geolocation.recoversAfterSteps = 3;
    navigator.geolocation.errorMessage = "There was an error retrieving the position!";
    navigator.geolocation.currentTimeout = -1;
    navigator.geolocation.lastPosReturned = 0;
    navigator.geolocation._sanitizeLastReturned = function() {
        if (this.lastPosReturned > this.waypoints.length - 1) {
            return this.lastPosReturned = 0;
        }
    };
    navigator.geolocation._geoCall = function(method, success, error) {
        var _this = this;
        var failsAfterSteps = this.failsAfterSteps, recoversAfterSteps = this.recoversAfterSteps;
        if (this.shouldFail && (error != null)) {
            if(failsAfterSteps > -1) {
                if (success != null) {
                    return this.currentTimeout = window[method].call(null, function() {
                        if (failsAfterSteps === -1) {
                            clearInterval(_this.currentTimeout);
                            _this.currentTimeout = window[method].call(null, function() {
                                if (recoversAfterSteps === -1) {
                                    clearInterval(_this.currentTimeout);
                                    return _this._geoCall(method, success, error);
                                }
                                recoversAfterSteps--;
                                _this.lastPosReturned++;
                                return error(_this.errorMessage);
                            }, _this.delay);
                        }
                        success(_this.waypoints[_this.lastPosReturned++]);
                        failsAfterSteps--;
                        return _this._sanitizeLastReturned();
                    }, this.delay);
                }
            }
            return this.currentTimeout = window[method].call(null, function() {
                return error(_this.errorMessage);
            }, this.delay);
        } else {
            if (success != null) {
                return this.currentTimeout = window[method].call(null, function() {
                    success(_this.waypoints[_this.lastPosReturned++]);
                    return _this._sanitizeLastReturned();
                }, this.delay);
            }
        }
    };
    navigator.geolocation.getCurrentPosition = function(success, error) {
        return this._geoCall("setTimeout", success, error);
    };
    navigator.geolocation.watchPosition = function(success, error) {
        this._geoCall("setInterval", success, error);
        return this.currentTimeout;
    };
    navigator.geolocation.clearWatch = function(id) {
        return clearInterval(id);
    };
    return navigator.geolocation.waypoints = [
        {
            coords: {
                latitude: 41.982988,
                longitude: -87.905238,
                heading: 260,
                accuracy: 1500
            }
        }, {
            coords: {
                latitude: 41.982988,
                longitude: -87.906483,
                heading: 250,
                accuracy: 1334
            }
        }, {
            coords: {
                latitude: 41.982893,
                longitude: -87.907513,
                heading: 240,
                accuracy: 631
            }
        }, {
            coords: {
                latitude: 41.982542,
                longitude: -87.908671,
                heading: 230,
                accuracy: 361
            }
        }, {
            coords: {
                latitude: 41.982287,
                longitude: -87.909401,
                heading: 220,
                accuracy: 150
            }
        }, {
            coords: {
                latitude: 41.982127,
                longitude: -87.909873,
                heading: 210,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.981808,
                longitude: -87.910517,
                heading: 200,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.981393,
                longitude: -87.911075,
                heading: 195,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.98117,
                longitude: -87.911418,
                heading: 190,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.98066,
                longitude: -87.911847,
                heading: 185,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.980532,
                longitude: -87.962401,
                heading: NaN,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.983467,
                longitude: -87.960856,
                heading: null,
                accuracy: 65
            }
        }, {
            coords: {
                latitude: 41.985508,
                longitude: -87.957595,
                heading: 100,
                accuracy: 65
            }
        }
    ];
})();
