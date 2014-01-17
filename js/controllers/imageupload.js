//http://jsfiddle.net/danielzen/utp7j/
app.controller('ImageUpload', function ($scope, imageservice) {
	$scope.images = [];//["http://docs.angularjs.org/img/angularjs-for-header-only.svg","http://docs.angularjs.org/components/bootstrap/img/glyphicons-halflings-white.png"];
	$scope.key = 0;
	$scope.changeImage = function(curEl){
		$scope.$apply(function($scope) {
	    	var files = curEl.files;
			for (var i=0, l=files.length; i<l; i++) {
				var file = files[i];
				if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
					var reader = new FileReader();
					reader.onload = (function () {
						return function (evt) {
							$scope.$apply($scope.images.push(evt.target.result));
							$scope.key = $scope.images.length - 1;
							$scope.$apply($scope.upload(evt.target.result, ($scope.images - 1)));
						};
					}());
					reader.readAsDataURL(file);
				}
			}
		    });
	}
	$scope.upload = function(image, index){
		var form = document.querySelector("#form");
		var p = imageservice.upload("", 0, form, form.querySelector("input[type=file]").files);
		p.then(function(url, index) {//Done								
			console.log(url, index);
		}, function(){
			console.log(arguments);
		}, function(){//Notifications
			console.log(arguments);
		});
	}
	$scope.deletePic = function(){
		//Delete the first picture
		$scope.images.splice(0, 1);
	}
	$scope.cameraSuccess = function(imageData, dontUpload){
		$scope.images.push(imageData);
		/*var image = document.getElementById('myImage');
	    image.src = "data:image/jpeg;base64," + imageData;*/
	    /*var itemImgPrefix = dontUpload ? itemImgCtx : "";
		var totalImages = angular.element("#pics input[type=hidden]").length;
	    var imageTpl = $('<div data-img="true"><img/><input type="hidden" value="" name="images"/></div>');
		imageTpl.find("img")
			.attr("src", itemImgPrefix + imageData)//"data:image/jpeg;base64," + imageData)
			.click(setMainPic)
			.end();
		imageTpl.find("input[name=images]")
			.attr("name", "images[" + totalImages + "]")
			.end();
		
		var emptyDivs = $("#pics > div").not("[data-img]"), emptyCount = emptyDivs.length;
		$("#pics").prepend(imageTpl);
		if(emptyCount){
			$(emptyDivs[0]).remove();
		}else{
			$("#pics > div:last").remove();
		}
		$("#pic_del").show();
		
		//If in edit mode, dont need to upload
		if(dontUpload){
			postPicUpload({"isSuccess" : true, url : imageData});
		}else{
			setTimeout(function(){uploadImgToServer(imageData, imageTpl.find("input[type=hidden]"));},0);
		}*/
	}
});