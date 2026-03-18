const CACHE_NAME = 'megaport-festival-v5'
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
          return Promise.resolve()
        })
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/__/')) return

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    )
    return
  }

  const isCriticalAsset =
    event.request.destination === 'script' ||
    event.request.destination === 'style' ||
    url.pathname.startsWith('/assets/')

  if (isCriticalAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          }
          return response
        })
        .catch(() => caches.match(event.request))
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
        return response
      })
    })
  )
})
