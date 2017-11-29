angular.module('meanhotel')
  .controller('HotelsController', HotelsController);

function HotelsController(HotelDataFactory) {
  const vm = this;
  vm.title = 'MEAN Hotel App';
  HotelDataFactory.hotelList().then(data => vm.hotels = data);
}
