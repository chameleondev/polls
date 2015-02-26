'use strict';

/**
 * @ngdoc function
 * @name votingSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the votingSystemApp
 */
angular.module('votingSystemApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
