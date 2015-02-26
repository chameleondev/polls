angular.module('votingSystemApp').directive('barGraph',function(){
  return {
    restrict : 'E',
    replace : true,
    link : function(scope,iElm, iAttrs){

    },
    templateUrl : 'views/directives/bar-graph.html'
  }
});

angular.module('votingSystemApp').directive('question',function(){
  return {
    restrict : 'E',
    replace : true,
    link : function(scope,iElm, iAttrs){

      scope.questionNumber = iAttrs.questionnumber;
      scope.questionText = iAttrs.questiontext;
      scope.answerA = iAttrs.answera;
      scope.answerB = iAttrs.answerb;
      scope.answerC = iAttrs.answerc;
      scope.answerD = iAttrs.answerd;
    },
    templateUrl : 'views/directives/question.html'
  }
});


//directive for the menu to slide down on click
angular.module('votingSystemApp').directive('sideBar',function($rootScope){
  return {
    restrict : 'A',
    link : function(scope,elem,attrs){
      elem.on('click',function(){

        $('.menu-icon').toggleClass('active');

        $('.cbp-spmenu').toggleClass('cbp-spmenu-open');

        attrs.push ==='yes' ? $('body').toggleClass('cbp-spmenu-push-toleft') : false;

        // $rootScope.$broadcast('refreshIscroll');

      })
    }
  }
});

//directive for the iscroll
angular.module('votingSystemApp').directive('iscroll',function($timeout,$rootScope){
  return {
    restrict : 'A',
    link : function(scope,elem,attrs){

      elem.find('a').on('click',function(){
           $('.cbp-spmenu').removeClass('cbp-spmenu-open');
           $('body').removeClass('cbp-spmenu-push-toleft');
            $('.menu-icon').removeClass('active');
      });
     

      $timeout(function(){

        var myScroll = new IScroll('.iscroll-wrapper',{
          mouseWheel: true,
          click: true
        });

        var myScroll = new IScroll('.iscroll-wrapper2',{
          mouseWheel: true,
          click: true
        });

      },200)
    }
  }
});
