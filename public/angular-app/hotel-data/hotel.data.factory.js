angular.module('meanhotel').factory('HotelDataFactory', HotelDataFactory);

function HotelDataFactory($http) {
  const hotelList = () => {
    return $http.get('/api/hotels').then(complete).catch(failed);
  }
  
  const hotelDisplay = (id) => {
    return $http.get(`/api/hotels/${id}`).then(complete).catch(failed);
  }

  const postReview = (id, review) => {
    return $http.post(`/api/hotels/${id}/reviews`, review);
  }
  
  const complete = response => response.data;
  const failed = error => error.statusText;

  return {
    hotelList,
    hotelDisplay,
    postReview,
  }
}