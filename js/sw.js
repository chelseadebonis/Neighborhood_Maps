const cacheName = 'my-site-cache-v1';

const cacheList = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];



console.log('Service worker is registered');


//perform install steps
  //open a cache
  //cache files
  //confirm whether required caches
//fetch events
  //clone since cant be used again

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('opened cache');
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('found event in cache');
        return response;
      }
        else {
          const fetchRequest = event.request.clone();
          const responseToCache = response.clone();
          console.log('fetching');
          return fetch(fetchRequest).then(function(response) {
            caches.open(cacheName).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(function(err) {
            console.error('error');
          });
        }
    })
  );
});
