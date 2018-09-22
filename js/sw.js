const cacheName = 'my-site-cache-v1';

const urlsToCache = [
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
  //clone since cant be used
//activate

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log('found event in cache');
        return response;
      }
      const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !==200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(cacheName)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          }
        );
      })
    );
  });

self.addEventListener('activate', function(event) {
  const cacheList = ['pages-cache-v1', 'pages-cache-v2'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
