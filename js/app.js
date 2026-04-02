// js/app.js
// アプリ全体のUI制御（ナビゲーション・サイドバー・検索）

// ── importの仕組み ───────────────────────────────────────
// ES Modules（type="module"）を使うと、
// ファイルをモジュールとして分割してimport/exportできる。
// これにより「data/manual.jsはデータだけ」「app.jsはロジックだけ」
// と役割を明確に分けられる。
import { MANUAL_DATA } from '../data/manual.js';
import { CONFIG } from '../data/config.js';

// ── DOM要素の取得 ─────────────────────────────────────────
// まとめて取得しておくことで、後のコードがすっきりする
const sidebarNav = document.getElementById('sidebarNav');
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');

// ── アプリの状態（State） ─────────────────────────────────
// 現在どのカテゴリ・セクションを表示しているかを追跡する
let currentCatId = null;
let currentSecId = null;

// =============================================
// 公開関数：アプリの初期化（index.htmlから呼ばれる）
// =============================================
export function initApp() {
    renderSidebar();
    renderWelcome();
    setupSearch();
    setupMobileMenu();
    setupFaqToggle();
}

// =============================================
// サイドバーの描画
// ─ MANUAL_DATA.categoriesを元にボタンを生成する
// =============================================
function renderSidebar() {
    // MANUAL_DATA.categories の各カテゴリをループして HTML 要素を生成
    MANUAL_DATA.categories.forEach(cat => {
        // カテゴリのラッパー要素
        const catEl = document.createElement('div');
        catEl.className = 'sidebar-category';
        catEl.dataset.catId = cat.id;  // data属性にIDを保持

        // カテゴリボタン（クリックで展開/折りたたみ）
        const catBtn = document.createElement('button');
        catBtn.className = 'sidebar-cat-btn';
        catBtn.style.setProperty('--cat-color', cat.color);
        catBtn.innerHTML = `
            <span class="sidebar-cat-icon">${cat.icon}</span>
            <span class="sidebar-cat-name">${cat.name}</span>
        `;
        catBtn.addEventListener('click', () => toggleCategory(cat.id));

        // セクションのリスト
        const secList = document.createElement('ul');
        secList.className = 'sidebar-sections';
        secList.id = `sections-${cat.id}`;

        cat.sections.forEach(sec => {
            const li = document.createElement('li');
            const secBtn = document.createElement('button');
            secBtn.className = 'sidebar-sec-btn';
            secBtn.textContent = sec.title;
            secBtn.dataset.catId = cat.id;
            secBtn.dataset.secId = sec.id;
            secBtn.addEventListener('click', () => {
                navigateTo(cat.id, sec.id);
                closeMobileMenu(); // モバイルでは選択後にメニューを閉じる
            });
            li.appendChild(secBtn);
            secList.appendChild(li);
        });

        catEl.appendChild(catBtn);
        catEl.appendChild(secList);
        sidebarNav.appendChild(catEl);
    });
}

// =============================================
// カテゴリの展開・折りたたみ
// =============================================
function toggleCategory(catId) {
    const secList = document.getElementById(`sections-${catId}`);
    const catBtn = sidebarNav.querySelector(`[data-cat-id="${catId}"] .sidebar-cat-btn`);

    // is-open クラスを付け外しするだけ（CSSのmax-heightで滑らかにアニメーション）
    const isOpen = secList.classList.toggle('is-open');
    catBtn.classList.toggle('is-active', isOpen);
}

// =============================================
// ページ遷移：catId + secId でコンテンツを切り替える
// 仕様書 §4.1「navigateTo」に対応
// =============================================
function navigateTo(catId, secId) {
    // 1. データから対象のカテゴリとセクションを探す
    const cat = MANUAL_DATA.categories.find(c => c.id === catId);
    if (!cat) return;
    const sec = cat.sections.find(s => s.id === secId);
    if (!sec) return;

    // 2. 状態を更新
    currentCatId = catId;
    currentSecId = secId;

    // 3. サイドバーのアクティブ状態を更新
    // 全ボタンからis-activeを外してから、対象だけに付ける
    document.querySelectorAll('.sidebar-sec-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.secId === secId);
    });

    // 4. カテゴリを展開
    const secList = document.getElementById(`sections-${catId}`);
    if (!secList.classList.contains('is-open')) {
        toggleCategory(catId);
    }

    // 5. メインコンテンツを描画
    mainContent.innerHTML = `
        <div class="section-header">
            <div class="section-breadcrumb">${cat.icon} ${cat.name}</div>
            <h2 class="section-title">${sec.title}</h2>
        </div>
        <div class="section-body" style="--section-color: ${cat.color}">
            ${sec.content}
        </div>
    `;

    // 6. FAQ要素にトグル機能を設定（コンテンツが差し替わるたびに再設定が必要）
    setupFaqToggle();

    // 7. ページ先頭にスクロール
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// ウェルカム画面の描画（初期表示）
// =============================================
function renderWelcome() {
    // カテゴリカードを動的に生成
    const cards = MANUAL_DATA.categories.map(cat => `
        <div class="category-card" style="--card-color: ${cat.color}"
             data-cat-id="${cat.id}">
            <div class="category-card-icon">${cat.icon}</div>
            <div class="category-card-name">${cat.name}</div>
            <div class="category-card-count">${cat.sections.length}項目</div>
        </div>
    `).join('');

    mainContent.innerHTML = `
        <div class="welcome-screen">
            <h2 class="welcome-title">おつかれさまです</h2>
            <p class="welcome-subtitle">確認したい項目を選んでください</p>
            <div class="category-cards">${cards}</div>
        </div>
    `;

    // カードをクリックしたらカテゴリを展開 + 最初のセクションに移動
    mainContent.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const catId = card.dataset.catId;
            const cat = MANUAL_DATA.categories.find(c => c.id === catId);
            if (cat && cat.sections.length > 0) {
                navigateTo(catId, cat.sections[0].id);
            }
        });
    });
}

// =============================================
// 検索機能
// 仕様書 §4.1「Search」に対応
// =============================================
function setupSearch() {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();

        if (query.length < 2) {
            // 2文字未満は検索しない
            searchResults.hidden = true;
            return;
        }

        const results = searchManual(query);

        if (results.length === 0) {
            searchResults.innerHTML = `<div class="search-result-item">「${query}」は見つかりませんでした</div>`;
            searchResults.hidden = false;
            return;
        }

        // 検索結果をHTMLにレンダリング
        // match.preview は本文からキーワード周辺を抜粋したもの
        searchResults.innerHTML = results.map(r => `
            <div class="search-result-item"
                 data-cat-id="${r.catId}" data-sec-id="${r.secId}">
                <div class="result-title">${highlight(r.title, query)}</div>
                <div class="result-category">${r.catIcon} ${r.catName}</div>
            </div>
        `).join('');
        searchResults.hidden = false;

        // 検索結果のクリック処理
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                navigateTo(item.dataset.catId, item.dataset.secId);
                searchResults.hidden = true;
                searchInput.value = '';
            });
        });
    });

    // 検索ボックス外をクリックしたら結果を閉じる
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-wrapper')) {
            searchResults.hidden = true;
        }
    });
}

// マニュアル全体をキーワードで検索する
function searchManual(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    // HTMLタグを除去して純粋なテキストだけを検索対象にする関数
    // 例: "<h3>スンドゥブ</h3>" → "スンドゥブ"
    const stripHtml = html => html.replace(/<[^>]+>/g, ' ');

    MANUAL_DATA.categories.forEach(cat => {
        cat.sections.forEach(sec => {
            const searchTarget = (sec.title + ' ' + stripHtml(sec.content)).toLowerCase();
            if (searchTarget.includes(lowerQuery)) {
                results.push({
                    catId: cat.id,
                    secId: sec.id,
                    catIcon: cat.icon,
                    catName: cat.name,
                    title: sec.title,
                });
            }
        });
    });

    return results;
}

// 検索キーワードをハイライトする（<mark>タグで囲む）
function highlight(text, query) {
    // RegExpの特殊文字をエスケープしてから正規表現を作る
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
}

// =============================================
// モバイルメニューの開閉
// =============================================
function setupMobileMenu() {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-active');
    });

    overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-active');
}

// =============================================
// FAQの折りたたみ機能
// ─ navigateTo() でコンテンツが差し替わるたびに呼ぶ必要がある
// =============================================
function setupFaqToggle() {
    mainContent.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            q.closest('.faq-item').classList.toggle('is-open');
        });
    });
}
