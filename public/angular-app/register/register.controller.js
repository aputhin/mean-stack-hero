angular.module('meanhotel')
  .controller('RegisterController', RegisterController);

function RegisterController($http) {
  const vm = this;

  vm.register = () => {
    if (!vm.password || !vm.username) {
      vm.error = 'Username and Password required!';
      return;
    }

    if (vm.password !== vm.passwordRepeat) {
      vm.error = 'Please make sure the passwords match';
      return;
    }

    const user = {
      username: vm.username,
      password: vm.password,
    };

    $http.post('/api/users/register', user).then(res => {
      console.log(res);
      vm.message = 'Registration successfull, please login';
      vm.error = '';
    }).catch(err => console.log(err));
  }
}
