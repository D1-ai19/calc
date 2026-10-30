// 计算器 Service Worker（离线缓存）
// 改规则后 index.html/rules.js 走 network-first，联网时会自动取最新版，无需清缓存。
// 静态资源（图标等）走 cache-first。

var CACHE = "jialin-calc-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  var isDynamic = e.request.mode === "navigate" ||
    url.pathname.endsWith(".js") || url.pathname.endsWith(".webmanifest");

  // 动态文件：先网络，失败再回退缓存
  if (isDynamic) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () { return caches.match(e.request); })
    );
    return;
  }

  // 静态资源：先缓存，没有再网络
  e.respondWith(
    caches.match(e.request).then(function (r) { return r || fetch(e.request); })
  );
});
