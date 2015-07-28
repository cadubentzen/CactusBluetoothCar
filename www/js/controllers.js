(function(){
	'use strict';
	angular.module('BCarControllers',['BCarServices'])

	.controller('BCarController', ['$scope','$mdDialog',function($scope,$mdDialog){
		$scope.bcar = {
			left: 0,
			right: 0,
			message: "AF000F000",
			bluetooth: {
				status: "DISCONNECTED"
			}
		};

		$scope.sendCommand = function(left,right){
			console.log('left: ',left,' right: ',right);
			$scope.bcar.message = "A"
														+(left>=0?"F":"T")+String("000"+Math.abs(left)).slice(-3)
														+(right>=0?"F":"T")+String("000"+Math.abs(right)).slice(-3);
			console.log('message: ',$scope.bcar.message);
		};

		$scope.reset = function(){
			$scope.bcar.left = 0;
			$scope.bcar.right = 0;
			$scope.sendCommand(0,0);
		};

		$scope.showAbout = function(ev){
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.body))
					.title('About')
					.content('App made to test Bluetooth Car of the project Cactus Robot Soccer.')
					.ariaLabel('About')
					.ok('Got it!')
					.targetEvent(ev)
			);
		};
	}]);
})();