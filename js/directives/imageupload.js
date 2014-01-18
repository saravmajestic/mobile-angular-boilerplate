/*
 * - select pic
 * - delete pic
 * - cover pic
 * - upload to server
 * - return pics - may be have it as hidden
 * - show pics without upload during edit
 * */
app.directive('ngImageUpload', function() {
    return {
//        require: 'ngModel',
    	transclude : true,
        restrict : 'EA',
    	controller : "ImageUpload",
    	scope: {
            'images' : "=image",
//            'changeImage' : function(){
//            	alert("changeImage");
//            }
         },
         templateUrl : '../views/image.html',
//         link : function(scope, element, attrs) {
//        	 console.log(element);
//        	 element.find("input[type=file]").bind("change", function(){
//         		alert("cjag");
//         	});
//         }
        compile: function(element, attributes, transclude) {
        	return {
//                pre: function(scope, element, attrs) {
//                	var prefix = attrs.prefix || "";
//        			var id = attrs.id || "";
//        			var name = attrs.name || "location";
//        			var placeholder = attrs.placeholder || "Enter your location";
//                    var htmlText = '<div class="pics_wrp">' +
//					            		'<div id="pics">' +
//						        			'<div ng-repeat="image in images"><img ng-src="{{image}}"/></div>'/* +
//						        			'<div></div>' +
//						        			'<div></div>' +
//						        			'<div></div>' +*/
//						        		'</div>' +
//						        		'<label for="take_pic" class="sell_cam">Pic</label>' +
//						        		'<span><a id="pic_del" href="javascript:;" ng-click="deletePic()">Delete</a></span>' +
//						        	'</div>';
//                    
//                    (element).after(htmlText);
//                },
                post: function(scope, element, attrs, model) {
//                	angular.element(element[0].querySelectorAll("input[type=file]")).bind("change", function(){
//                		alert("cjag");
//                	})
                }
            };
        }
    };
});