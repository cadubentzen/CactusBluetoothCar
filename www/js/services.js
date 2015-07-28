(function(){
	angular.module('BCarServices',[])

	.factory('BCarService', ['$scope', function($scope){
		var _pairedDevices = [];
		return {
			pairedDevices: _pairedDevices
		};
	}])
})();