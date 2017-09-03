(function() {
  'use strict';

  angular
    .module('assignment')
    .controller('UserFormController', UserFormController);

  /** @ngInject */
  function UserFormController(UserService, HomeService, $sessionStorage) {
    var vm = this;
    
    HomeService.callMap();
    vm.userDetails = $sessionStorage.userDetails;
    // vm.userDetails = UserService.userDetails;
    vm.newUser = {};
    vm.addNewUser = function(){
      vm.newUser.date = new Date().toLocaleDateString('en-GB'),
      vm.userDetails.push(vm.newUser);
      vm.newUser = {};
    }
  
    vm.search = function() {
      vm.apiError = false;
      HomeService.search(vm.searchPlace)
      .then(
        function(res) {
            HomeService.addMarker(res);
            vm.newUser.lat = res.geometry.location.lat();
            vm.newUser.lng = res.geometry.location.lng();
            vm.newUser.location = res.name;
        },
        function(status) {
            vm.apiError = true;
            vm.apiStatus = status;
        }
      );
    }
    
    
    

  }
})();
