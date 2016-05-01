app.factory('userSetting', function() {
	var defaults = {
		theme: 'white',
		align: '',
		time: true,
		date: true,
		color: {
			text: '',
			bg: '',
			border: ''
		}
	}

	var service = {
		user: {},
		save: function() {
			localStorage.presently =
				angular.toJson(service.user);
		},
		restore: function() {
			service.user =
				angular.fromJson(localStorage.presently) || defaults

			return service.user;
		}
	};
	service.restore();
	return service;
});

app.controller('settingCtrl', function($scope, userSetting) {
	$scope.user = userSetting.user;
	$scope.save = function() {
      userSetting.save();
      var h5 = document.createElement('h5');
      var h5Text = document.createTextNode('설정을 저장했습니다.');
      h5.appendChild(h5Text);
      document.body.appendChild(h5);
    }
});