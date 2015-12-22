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
        '/service_worker/gallery/kit-kat.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/service_worker/gallery/kitkat.jpg');
  }));
});


