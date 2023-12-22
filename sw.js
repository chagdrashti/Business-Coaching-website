/**
 * Set cache name
 * Note: At the moment it is not active but we need this for the future and the service worker
 * must have `fetch` method in order to activate progressive web app
 */
var CACHE_NAME = self.domain;
var urlsToCache = [
    '/'
];

/**
 * On service worker install tell him what urls we want to cache
 * Documentation: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */
self.addEventListener('install', function(event) {
    // perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

/**
 * Fetch request from cache
 * Documentation: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */
self.addEventListener('fetch', function(event) {
    /* neutralize the service worker cache because we want to keep the website using
    our system cache */
    return false;
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // cache hit - return response
            if (response) {
                return response;
            }
            //
            return fetch(event.request).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();
                    //
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    //
                    return response;
                }
            );
        })
    );
});