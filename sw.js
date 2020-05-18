const staticCacheName = 'static-cache-v2';
const dynamicCacheName = 'dynamic-cache-v1';

const staticAssets = [
    './',
    './weather.html',
    './script1.js',
    './script2.js',
    './style1.css',
    './style2.css',
    './js/app.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
    './images/icons/icon-128x128.png',
    './images/icons/icon-192x192.png',
    './images/no-image.jpg',
    './offline.html'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        /*if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }*/
        if (staticCacheName !== key) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
    /*event.respondWith(caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request)
    }));*/
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}