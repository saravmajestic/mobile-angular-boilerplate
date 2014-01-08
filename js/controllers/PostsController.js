app.controller('Posts', function ($scope, postservice, $angularCacheFactory) {
	$scope.message = "one!";
	$scope.posts = [];
	$scope.getData = function(){
		var p = postservice.getPostData(1);			
		p.then(function(posts) {								
			$scope.posts.pushAll(posts.pics);//.data.pics);
		}, function(){
			console.log(arguments);
		}, function(){
			console.log(arguments);
		});
	};
	$scope.clearData = function(){
		$angularCacheFactory.get('dataCache').destroy();
	};
	$scope.getData();
});