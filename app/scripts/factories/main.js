// factory that enables the use of repeated properties and methods in controllers
angular.module('votingSystemApp').factory('questionScope',function(Questions,Auth,$rootScope,$state,$firebase){

  return function($scope,section){

    window.scope = $scope;

    window.myroot = $rootScope;

    // if the object containing the submitted answeres does not exist then create an empty object
    // if (!sessionStorage.submitted) {
    //   sessionStorage.submitted = [];
    // };

    //set the current question, evaluates to a number
    $rootScope.currentQuestion = section[section.length-1];

    console.log(section[section.length-1]);


    // if the user is logged in then set the current question on the server to the current rootscope question, only the admin can control this
    if ($rootScope.loggedIn()) {
      Questions.getCurrentQuestion().$set($rootScope.currentQuestion);
    };   

    // next and previous states controlled by admin 
    $scope.nextState = function(){
      var num = section[section.length-1];
      num++;
      Questions.getCurrentQuestion().$set(num);
    };

    $scope.prevState = function(){
      var num = section[section.length-1];
      num--;
      Questions.getCurrentQuestion().$set(num);
    };


    // $rootScope.$watch('currentQuestion',function(){
    //   $state.go('question'+$rootScope.currentQuestion)
    // });


    // create three way binding to firebase in the question object, bind it to $scope.question
    Questions.getQuestions(section).$bindTo($scope, "question").then(function(){

      //if the question currently doesnt exist in firebase, update with an empty object 
      // if ($scope.question.$value === null) {
      //   $scope.resetQuestion();
      // };
      
    });


     // watch the object for any changes, everytime it does change, update the total scope
      $scope.$watch('question',function(newVal,oldVal){
        if (newVal) {
          // adding the scope value by itself creates an error if the value is undefined, so || is needed to use 0 if it is not defined
          $scope.total = ($scope.question.a || 0) + ($scope.question.b || 0) + ($scope.question.c || 0) + ($scope.question.d || 0);
        }
      },true);


      // create the percent method from the factory
      $scope.percent = Questions.percent;

      // on submit of the answer increment the value by one
      $scope.submit = function(answer){
        $scope.questionSubmitted = $rootScope.currentQuestion -1;

        $rootScope.submitted[$rootScope.currentQuestion -1] = { selectedAnswer : answer, answered : true};

        // sessionStorage.submitted[$rootScope.currentQuestion -1] = { selectedAnswer : answer, answered : true};

        // $scope.question[answer]++;



        // use $transaction in order to make sure that multiple request can be made at the same time
        var currentQuestionref = new Firebase("https://voting-system.firebaseio.com/").child('question'+$rootScope.currentQuestion);

        $firebase(currentQuestionref).$transaction(function(current_val) {
          console.log('original val: ',current_val);

            if( !current_val ) {
                console.log('not happening!');
                current_val = {a: 0, b: 0, c: 0, d: 0};
            }
            
            current_val[answer]++;
            return current_val;

        }).then(function(snapshot) {

          if (snapshot === null) {
            // Handle aborted transaction.
            console.log('aborted')
          } else {
            // Do something.
            console.log('new val : ',snapshot.val());
          }
        }, function(error) {
          console.log("Error:", error);
        });

      };

      //reset the current question
      $scope.resetQuestion = function(){
        $scope.question.a = 0;
        $scope.question.b = 0;
        $scope.question.c = 0;
        $scope.question.d = 0;
      };

  }

});


//factory that controls authentication
angular.module('votingSystemApp').factory('Auth',function($timeout,$state){

  var user = 'admin',
      pass = 'Access01';

  return{

    login : function(u,p){

      if(u && p){

        if (u === user && p === pass ) {

          sessionStorage.user = u;
          sessionStorage.pass = p;

          this.loggedIn();

          $state.go('question1');
          return 'success';

        }else{

          $('.alert').addClass('shake');

          $timeout(function(){
            $('.alert').removeClass('shake')
          },1000);

          this.failed = true;
          return 'error';

        }

      }

    },

    loggedIn : function(){
      if ((sessionStorage.user === user) && (sessionStorage.pass === pass)) {

        return true;

      }else{

        return false;

      }
    }

  }

});


//factory that controls the questions and answers in firebase, when a new user enters they will be sent to the current question
angular.module('votingSystemApp').factory('Questions',function($firebase,$state){

   var currentQuestionref = new Firebase("https://voting-system.firebaseio.com/").child('currentQuestion');

   currentQuestionref.on('value',function(snapshot){

      $state.go('question'+snapshot.val());

   });

  return {

    getCurrentQuestion : function(){

      return $firebase(currentQuestionref);

    },
    getQuestions : function(question){

      // get firebase reference and access the child object which is defined in the function argument
      var ref = new Firebase("https://voting-system.firebaseio.com/").child(question);

      // return the firebase sync object
      return $firebase(ref).$asObject();

    },
    percent : function(answer,total){
      // console.log(Math.round(answer / total * 100));
      return Math.round(answer / total * 100);
    }
  };

});