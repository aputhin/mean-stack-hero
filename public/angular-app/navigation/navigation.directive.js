angular.module('meanhotel').directive('ngNavigation', NgNavigation);

function NgNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/navigation/navigation.html'
  };
}