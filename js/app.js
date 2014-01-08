var app = angular.module('boilerplate', ['ngRoute', 'ngCookies','pasvaz.bindonce', 'jmdobry.angular-cache']).run(['$rootScope', '$location', function ($rootScope, $location) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.error = null;
        console.log("Route change!!!");
        
    });
    console.log("App Loaded!!!");
    
}]);
app.factory('utils', function ($window) {
	 //Utility methods which are common across application
});

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl:'views/index.html',
    controller:'IndexCtrl'
  })
  .when('/login', {
    controller:"LoginCtrl",
    templateUrl:'views/login.html'
  })
  .when("/home", {
    templateUrl: "views/home.html"
  })
  .when("/buy", {
    templateUrl: "views/buy.html"
  })
  .when("/sell", {
    templateUrl: "views/sell.html"
  })
  .otherwise({
    redirectTo:'/'
  });
});

app.controller('AppCtrl', ['$rootScope', '$scope', '$window', function($rootScope, $scope, $window) {
	$scope.back = function(){
        $window.history.back();
	}
}]);

//Transition end stuff, copied from bootstrap:
//http://twitter.github.com/bootstrap/assets/js/bootstrap-transition.js
app.value('transitionEndEvents', [
'webkitTransitionEnd', 'transitionend', 'oTransitionEnd','otransitionend', 'transitionend'
]);

//Each time you go back, add one to isBack counter
//If isBack counter >0 ,we do a back transition on next page
//We set it to -1 at start because there's a random back
//event at very start of DOM load for some reason, and we want to ignore that
var backCounter = -1;
window.onpopstate = function() {
backCounter++;
console.log('pop!!', backCounter);
};

app.directive('myView', function ($http, $templateCache, $route, $anchorScroll, $compile, $controller, transitionEndEvents, $location, $window) {    
function onTransitionEnd(element, callback) {
  for (var i=0; i<transitionEndEvents.length; i++) {
    element[0].addEventListener(transitionEndEvents[i], callback);
  }
}

return {
  restrict: 'ECA',
  terminal: true,
  link: function (scope, parentElm, attr) {
    var currentView;
    var views = [];
    var locations = [];
    var classes = scope.$eval(attr.transClasses) || {
      forward: 'forward',
      back: 'back',
      in: 'in',
      out: 'out'
    };

    scope.$on('$routeChangeSuccess', update);
    update();
    
    function View(routeData) {
      //Bug: if we do angular.element(template) on some templates,
      //angular.element will throw an error. so we manually do innerHTML
      //and get the child
      var el = document.createElement("div");
      el.innerHTML = routeData.locals.$template || '';
      this.element = angular.element(el.children[0] || el);
      this.locals = routeData.locals;
      this.scope = this.locals.$scope = scope.$new();
      if (routeData.controller) {
        this.controller = $controller(routeData.controller, this.locals);
        this.element.contents().data('$ngControllerController', this.controller);
      }
    }

    function insertView(view) {
      $compile(view.element.contents())(view.scope);
      parentElm.append(view.element);
      view.scope.$emit('$viewContentLoaded');
    }

    function destroyView(view) {
      view.scope.$destroy();
      view.element.remove();
      delete view;
    }

    function transition(inView, outView) {
      //Do a timeout so the initial class for the
      //element has time to 'take effect'
      var transClass = inView.isBack ? classes.back : classes.forward;
      inView.element.addClass(transClass);
      if (outView) {
        outView.element.removeClass(classes.forward+' '+classes.back);
        outView.element.addClass(transClass);
      }
      
      setTimeout(function() {
        inView.element.addClass(classes.in);
        onTransitionEnd(inView.element, updateViewQueue);
        if (outView) {
          outView.element.removeClass(classes.in);
          outView.element.addClass(classes.out);
          onTransitionEnd(outView.element, function() {
            destroyView(outView);
          });
        }
      });
    }

    function updateViewQueue() {
      //Bring in a new view if it exists
      if (views.length > 0) {         
        var view = views.shift();
        insertView(view);
        transition(view, currentView);
        currentView = view; 
      }
    } 

    function update() {
      if ($route.current && $route.current.locals.$template) {
        var view = new View($route.current);
        console.log('update!!')
        if (backCounter > 0) {
          backCounter--;
          view.isBack = true;
        }          
        views.push(view);
        updateViewQueue();
      }
    }
  }
};
});