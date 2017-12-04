angular.module('meanhotel')
  .controller('LoginController', LoginController);

function LoginController($http, $location, $window, jwtHelper, AuthFactory) {
  const vm = this;
  vm.isLoggedIn = () => AuthFactory.isLoggedIn;
  vm.isActiveTab = url => (url === $location.path().split('/')[1] ? 'active' : '');

  vm.loggedInUser = () => {
    const token = $window.sessionStorage.token;
    return jwtHelper.decodeToken(token).username;
  }

  vm.login = () => {
    if (!vm.username || !vm.password) return;

    const user = {
      username: vm.username,
      password: vm.password,
    };

    $http.post('/api/users/login', user).then(res => {
      if (res.data.success) {
        $window.sessionStorage.token = res.data.token;
        AuthFactory.isLoggedIn = true;
      }
    }).catch(err => console.error(err));
  };

  vm.logout = () => {
    delete $window.sessionStorage.token;
    AuthFactory.isLoggedIn = false;
    $location.path('/');
  }
}
