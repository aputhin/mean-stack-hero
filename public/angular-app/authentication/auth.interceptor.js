angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($q, $window, $location, AuthFactory) {
  const request = config => {
    config.headers = config.headers || {};
    if ($window.sessionStorage.token) {
      config.headers.Authorization = `Bearer ${$window.sessionStorage.token}`;
    }

    return config;
  };

  const response = res => {
    if (isSuccessResponse(res.status) && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      AuthFactory.isLoggedIn = true;
    }
    if (res.status === 401) {
      AuthFactory.isLoggedIn = false;
    }
    return res || $q.when(res);
  };

  const responseError = rejection => {
    if (rejection.status === 401 || rejection.status === 403) {
      delete $window.sessionStorage.token;
      AuthFactory.isLoggedIn = false;
      $location.path('/');
    }
    return $q.reject(rejection);
  };

  const isSuccessResponse = status => status >= 200 && status < 300;

  return {
    request,
    response,
    responseError
  };
}