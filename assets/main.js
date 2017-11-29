angular.module('meanhotel', ['ngRoute'])
  .config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'assets/templates/hotels.html',
      controller: HotelsController,
      controllerAs: 'vm'
    });
}
