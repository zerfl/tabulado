angular.module('starter.services', ['ngResource'])

.factory('Scan', function ($resource) {
	return $resource('http://zerfl.com:5555/api/scans/:ean');
});