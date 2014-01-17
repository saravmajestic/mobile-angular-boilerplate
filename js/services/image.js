app.service('imageservice', function($http, $q){
	this.upload = function(image, id, form, files){
		var deferred = $q.defer(),
        start = new Date().getTime();
		
		var fd = new FormData()
        for (var i in files) {
            fd.append("uploadedFile", files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", function(evt){
        	uploadProgress(evt, deferred);
        }, false)
        xhr.addEventListener("load", function(evt){
        	deferred.resolve(JSON.parse(evt.target.responseText));
        }, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "fileupload.php")
        xhr.send(fd);
        
	    return deferred.promise;
	};
	function uploadProgress(evt, deferred) {
			var progress = "";
            if (evt.lengthComputable) {
                progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                progress = 'unable to compute'
            }
            deferred.notify('Progressed: ' + progress);
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
});