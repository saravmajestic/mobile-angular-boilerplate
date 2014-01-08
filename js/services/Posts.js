app.service('postservice', function($http, $q, $angularCacheFactory){
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	$angularCacheFactory('dataCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 3600000, // This cache will clear itself every hour.
        storageMode: 'localStorage', // This cache will sync itself with `localStorage`.
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });
	this.getPostData = function(id){
		var deferred = $q.defer(),
        start = new Date().getTime(),
        dataCache = $angularCacheFactory.get('dataCache');

	    // Now that control of inserting/removing from the cache is in our hands,
	    // we can interact with the data in "dataCache" outside of this context,
	    // e.g. Modify the data after it has been returned from the server and
	    // save those modifications to the cache.
	    if (dataCache.get(id)) {
	        deferred.resolve(dataCache.get(id));
	    } else {
	    	deferred.resolve({"pics" : []});
	    }
	    return deferred.promise;
		
//		return $http({
//		    url: "proxy.php?proxyurl=", 
//		    method: "GET",
//		    params: {}
//		 });
	};
});