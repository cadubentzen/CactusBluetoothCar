(function(){
	'use strict';
	angular.module('BluetoothCar',['BCarControllers','BCarServices','ngMaterial'])
	
	.config(['$mdThemingProvider',function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
	}])

	.filter('command',function(){
		return function(input){
			return (input>=0?"F":"T")+String("000"+Math.abs(input)).slice(-3);
		};
	});
})();