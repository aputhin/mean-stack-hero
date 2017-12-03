angular.module('meanhotel')
  .controller('HotelController', HotelController);

function HotelController(HotelDataFactory, $route, $routeParams) {
  const vm = this;
  vm.id = $routeParams.id;
  vm.isSubmitted = false;

  HotelDataFactory.hotelDisplay(vm.id).then((data) => {
    vm.hotel = data.hotel;
    vm.stars = _getStarRating(data.hotel.stars);
  });

  function _getStarRating(stars) {
    return new Array(stars);
  }

  vm.addReview = function() {
    const data = {
      name: vm.name,
      rating: vm.rating,
      review: vm.review,
    };

    if (vm.reviewForm.$invalid) {
      vm.isSubmitted = true;
      return;
    }

    HotelDataFactory.postReview(vm.id, data).then(res => {
      if (res.status === 201) {
        $route.reload();
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
