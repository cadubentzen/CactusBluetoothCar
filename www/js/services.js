(function(){
	'use strict';
	angular.module('BCarServices',[])

	.factory('BCar',function(){
		var _pairedDevices = [];
		var _status = "";
		var _message = "";

		return {
			setPaired: function(newPaired){
				_pairedDevices = newPaired;
			},
			pairedDevices: function(){
				return _pairedDevices
			},
			status: function(){
				return _status
			},
			message: function(){
				return _message
			}
		};
	});
})();