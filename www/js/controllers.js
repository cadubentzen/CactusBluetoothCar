/* global bluetoothSerial */
(function(){
	'use strict';
	angular.module('BCarControllers',['BCarServices'])

	.controller('BCarController', ['$scope','$mdDialog','$interval','BCar',function($scope,$mdDialog,$interval,BCar){
		$scope.bcar = {
			left: 0,
			right: 0,
			message: "AF000F000",
			bluetooth: {
				status: "",
				connectedDevice: {
					name: "Cadu",
					mac: "45:67:45:A5:43"
				},
				sending: false
			}
		};

		var updateStatus = function() {
			bluetoothSerial.isEnabled(
		    function() {
		    	bluetoothSerial.isConnected(function(){
		    		$scope.bcar.bluetooth.status = "CONNECTED";
		    		$scope.bcar.bluetooth.sending = true;
		    	},
		    	function(){
		    		$scope.bcar.bluetooth.status = "DISCONNECTED";
		    		$scope.bcar.bluetooth.sending = false;
		    	});
		      //console.log('isEnabled');
				},
		    function() {
	        $scope.bcar.bluetooth.status = "DISABLED";
	        $scope.bcar.bluetooth.sending = false;
	        //console.log('isDisabled');
		    }
			);
		};

		var statusTimer = $interval(updateStatus,1000);

		$scope.sendCommand = function(left,right){
			//console.log('left: ',left,' right: ',right);
			$scope.bcar.message = "A"
														+(left>=0?"F":"T")+String("000"+Math.abs(left)).slice(-3)
														+(right>=0?"F":"T")+String("000"+Math.abs(right)).slice(-3);
			//console.log('message: ',$scope.bcar.message);
			bluetoothSerial.write($scope.bcar.message,function(){
				//console.log("write was successfull");
			},function(){
				//console.log("write was unsuccessfull");
			});
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

		$scope.showConnect = function(ev){
			bluetoothSerial.list(function(success){
				BCar.setPaired(success);
			}, function(){
				BCar.setPaired([]);
			});

			$mdDialog.show({
				controller: ConnectController,
				templateUrl: 'connectDialog.html',
				parent: angular.element(document.body),
      	targetEvent: ev
			})
			.then(function(answer){
				$scope.connectBluetooth(answer);
			}, function(){
				$scope.bcar.bluetooth.status = "DISCONNECTED";
				$scope.bcar.bluetooth.sending = false;
			});
		}

		var ConnectController = function($scope,$interval,$mdDialog,BCar){
			$scope.connect = {
				devices: BCar.pairedDevices()
			}

			var connectTimer = $interval(function(){
				$scope.connect.devices = BCar.pairedDevices();
			},1000);

			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
				$interval.cancel(connectTimer);
			}

			$scope.hide = function() {
				$mdDialog.hide();
				$interval.cancel(connectTimer);
			}
		};

		$scope.connectBluetooth = function(device){
			bluetoothSerial.connect(device.address,
				function(){
					$scope.bcar.bluetooth.connectedDevice.name = device.name;
					$scope.bcar.bluetooth.connectedDevice.mac = device.address;
					$scope.bcar.bluetooth.status = "CONNECTED";
					$scope.bcar.bluetooth.sending = true;
				},function(){
					$scope.bcar.bluetooth.connectedDevice.name = "Failed to connect";
					$scope.bcar.bluetooth.connectedDevice.mac = "";
					$scope.bcar.bluetooth.status = "DISCONNECTED";
					$scope.bcar.bluetooth.sending = false;
			});
			
		};
	}]);
})();