(function(){
	'use strict';
	angular.module('BCarServices',[])

	.factory('BCar',function(){
		var _pairedDevices = [];
		var _status = "";
		var _message = "";

		return {
			pairedDevices: function(){return _pairedDevices},
			status: function(){return _status},
			message: function(){return _message}
		};
	});
})();