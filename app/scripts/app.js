'use strict';

/**
 * @ngdoc overview
 * @name votingSystemApp
 * @description
 * # votingSystemApp
 *
 * Main module of the application.
 */
angular
  .module('votingSystemApp', [
    'ngAnimate',
    'ngTouch',
    'ui.router',
    'firebase'
  ])

  .config(function($stateProvider,$urlRouterProvider){

  	$urlRouterProvider.otherwise('/');

  	$stateProvider

    .state('login',{
        url : '/',
        views: {
          'main' : {
            templateUrl : 'views/login.html',
            controller : function($scope,Auth,$state,$rootScope){

              $rootScope.submitted = {};

              // // set the users status by checking the Auth factory
              $rootScope.loggedIn = Auth.loggedIn;

              if (Auth.loggedIn()) {

                $state.go('question1');

              };

               $scope.submit = function(u,p){
                  
                  if(Auth.login(u,p) === 'error'){
                    console.log('there was an error!');
                    $scope.loginError = true;
                  }

               };

            }
          }
        }
      })
  		
  		.state('question1',{
  			url : '/',
  			views: {
  				'main' : {
  					templateUrl : 'views/questions/question1.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question1');
            }
  				}
  			}
  		})

  		.state('question2',{
  			url : '/',
  			views: {
          'main' : {
            templateUrl : 'views/questions/question2.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question2');
            }
          }
        }
  		})

      .state('question3',{
        url : '/',
        views: {
          'main' : {
            templateUrl : 'views/questions/question3.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question3');
            }
          }
        }
      })

      .state('question4',{
        url : '/',
        views: {
          'main' : {
            templateUrl : 'views/questions/question4.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question4');
            }
          }
        }
      })

      .state('question5',{
        url : '/',
        views: {
          'main' : {
            templateUrl : 'views/questions/question5.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question5');
            }
          }
        }
      })

      .state('question6',{
        url : '/',
        views: {
          'main' : {
            templateUrl : 'views/questions/question6.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question6');
            }
          }
        }
      })

      .state('question7',{
        url : '/',
        views: {
          'main' : {
            templateUrl : 'views/questions/question7.html',
            controller : function($scope,questionScope){
              questionScope($scope,'question7');
            }
          }
        }
      });


  });


// angular.module('votingSystemApp').run(function($rootScope) {
//   $rootScope.submitted = [];
// });

