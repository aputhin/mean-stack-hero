angular.module('meanhotel')
  .controller('HotelController', HotelController);

function HotelController(HotelDataFactory, $routeParams) {
  const vm = this;
  vm.id = $routeParams.id;

  HotelDataFactory.hotelDisplay(vm.id).then((data) => {
    vm.hotel = data.hotel;
  });
}
