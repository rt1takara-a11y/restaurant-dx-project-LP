// sw.js — Service Worker
//
// ── Service Workerとは ───────────────────────────────────
// ブラウザとサーバーの「間」に挟まるプログラム。
// 通常のJSはページ上で動くが、Service WorkerはページとはBASE独立した
// バックグラウンドで動き、「ネットワークリクエストを横取り」できる。
//
// 仕組み：
//   普通: ブラウザ → サーバー → ファイル取得
//   SW:   ブラウザ → SW（キャッシュあれば返す、なければサーバーへ）→ サーバー
//
// これによりオフラインでもキャッシュ済みのファイルを返せる。

// キャッシュに名前をつける（バージョン管理）
// ファイルを更新したときはここのバージョンを上げるとキャッシュが更新される
const CACHE_NAME = 'fc-manual-v2';

// 最初にキャッシュしておくファイル一覧
const PRECACHE_URLS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/chat.js',
    './data/manual.js',
    './data/config.js',
];

// ── installイベント ──────────────────────────────────────
// Service Workerが初めて登録されたときに1回だけ実行される
// ここで必要なファイルをまとめてキャッシュしておく
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        })
    );
    // 古いSWが動いていても即座に新しいSWを有効化する
    self.skipWaiting();
});

// ── activateイベント ─────────────────────────────────────
// 新しいSWが有効になったとき、古いキャッシュを削除する
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// ── fetchイベント ────────────────────────────────────────
// ブラウザがファイルを取得しようとするたびに呼ばれる
// ここで「キャッシュがあればそれを返す」処理をする
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // /api/ へのリクエストはキャッシュしない（常にサーバーへ）
    // AIの回答はリアルタイムで取得する必要があるため
    if (url.pathname.startsWith('/api/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // キャッシュがあればそれを返す（オフラインでも表示できる）
            if (cachedResponse) {
                return cachedResponse;
            }
            // キャッシュがなければネットワークから取得してキャッシュに保存
            return fetch(event.request).then((networkResponse) => {
                // レスポンスをキャッシュに保存（次回以降オフラインでも使える）
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            });
        })
    );
});
