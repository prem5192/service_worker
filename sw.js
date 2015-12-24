this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/service_worker/',
        '/service_worker/index.html',
        '/service_worker/style.css',
        '/service_worker/bootstrap.min.css',
        '/service_worker/bootstrap.min.js',
        '/service_worker/jquery-2.1.4.min.js',
        '/service_worker/app.js',
        '/service_worker/image-list.js',
        '/service_worker/foodzone_logo.jpg',
        '/service_worker/gallery/',
        '/service_worker/gallery/kit-kat.jpg',
        '/service_worker/gallery/hersheys.jpg',
        '/service_worker/gallery/junior_mints.jpg',
        '/service_worker/gallery/m&m.jpg',
        '/service_worker/gallery/nabisco-crackers.jpg',
        '/service_worker/gallery/salisbury-steak.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    console.log("from network"::::::::::");
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    console.log("from network................");
    return response.clone();
  }).catch(function() {
    console.log("from cache");
    return caches.match('/service_worker/gallery/kitkat.jpg');
  }));
});

/*this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        console.log("from network...");
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          console.log("from cache...");
          return response;
        });
      });
    })
  );
});
*/
