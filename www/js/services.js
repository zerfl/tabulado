angular.module('starter.services', ['ngResource'])

.factory('Api', function ($resource) {
    var resource = {
        Product: $resource('http://zerfl.com:5555/product/search/:ean', { ean: '@ean' })
    };

    return resource;
	
});