// js/chat.js
// マニュアル検索チャットUIの制御
// ─ FABボタンでパネルを開閉
// ─ ハイブリッド検索（ベクトル検索 + キーワード検索）で返答

import { CONFIG } from '../data/config.js';
import { MANUAL_DATA } from '../data/manual.js';
import { initEmbeddings, isReady, semanticSearch } from './embeddings.js';

// ベクトル検索でヒットとみなすコサイン類似度の閾値（0〜1）
// この値未満の場合はキーワード検索にフォールバックする
const SIMILARITY_THRESHOLD = 0.35;

// ── チャットUIをDOMに追加する ────────────────────────────
export function initChat() {
    // HTMLをまとめてbodyに追加
    // テンプレートリテラルで複数行のHTMLを書きやすくする
    document.body.insertAdjacentHTML('beforeend', `
        <!-- 暗幕（パネルの背後） -->
        <div class="chat-panel-backdrop" id="chatBackdrop"></div>

        <!-- FAB：画面下中央のボタン -->
        <button class="chat-fab" id="chatFab" aria-label="AIに質問する">
            <span>AIに質問する</span>
        </button>

        <!-- チャットパネル（FABクリックで表示） -->
        <div class="chat-panel" id="chatPanel" aria-hidden="true">
            <div class="chat-panel-header">
                <div class="chat-panel-title">
                    <span>${CONFIG.chatBotName}</span>
                </div>
                <button class="chat-close-btn" id="chatCloseBtn" aria-label="閉じる">✕</button>
            </div>

            <!-- モデル読み込み状態インジケーター -->
            <div class="chat-status" id="chatStatus">🔄 高精度検索を準備中...</div>

            <!-- メッセージ一覧 -->
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message bot">
                    <div class="chat-bubble">
                        マニュアルについて何でも聞いてください。
                    </div>
                </div>
            </div>

            <!-- 入力フォーム -->
            <form class="chat-input-area" id="chatForm">
                <input
                    type="text"
                    id="chatInput"
                    class="chat-input"
                    placeholder="例：スンドゥブの作り方は？"
                    autocomplete="off"
                    required
                />
                <button type="submit" class="chat-send-btn" id="chatSendBtn">
                    送信
                </button>
            </form>
        </div>
    `);

    // イベントを設定
    setupChatEvents();

    // バックグラウンドでベクトル検索モデルを初期化
    // 完了するまではキーワード検索で動作する
    initEmbeddings({
        onReady: () => {
            const status = document.getElementById('chatStatus');
            if (status) {
                status.textContent = '✓ 高精度検索が有効';
                setTimeout(() => status.classList.add('chat-status--hidden'), 2000);
            }
        }
    });
}

// ── イベントの設定 ───────────────────────────────────────
function setupChatEvents() {
    const fab = document.getElementById('chatFab');
    const closeBtn = document.getElementById('chatCloseBtn');
    const backdrop = document.getElementById('chatBackdrop');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');

    // FABクリック → パネル開閉
    fab.addEventListener('click', () => togglePanel(true));
    closeBtn.addEventListener('click', () => togglePanel(false));
    // 暗幕クリックでも閉じる
    backdrop.addEventListener('click', () => togglePanel(false));

    // フォーム送信
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;

        input.value = '';
        await handleSend(message);
    });
}

// パネルの開閉
function togglePanel(open) {
    const panel = document.getElementById('chatPanel');
    const fab = document.getElementById('chatFab');
    const backdrop = document.getElementById('chatBackdrop');

    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    fab.classList.toggle('is-hidden', open);
    backdrop.classList.toggle('is-active', open);

    if (open) {
        setTimeout(() => document.getElementById('chatInput')?.focus(), 300);
    }
}

// ── メッセージ送信〜レスポンス表示 ──────────────────────
async function handleSend(message) {
    // 1. ユーザーのメッセージを表示
    appendMessage(message, 'user');

    // 2. ローディング表示
    const loadingId = appendLoading();

    // 3. ハイブリッド検索
    //    モデル準備済み → ベクトル検索（意味で検索）
    //    スコアが低い or 未準備 → キーワード検索にフォールバック
    let reply;
    if (isReady()) {
        const result = await semanticSearch(message);
        if (result && result.score >= SIMILARITY_THRESHOLD) {
            reply = `【${result.heading}】\n${result.text}`;
        } else {
            reply = buildReply(searchManual(message));
        }
    } else {
        reply = buildReply(searchManual(message));
    }

    // 4. ローディングを消して結果を表示
    removeLoading(loadingId);
    appendMessage(reply, 'bot');
}

// ── ローカル検索（APIなし） ───────────────────────────────

// 同義語マップ：表現の揺れに対応する
// 例：「かきの作り方」→「カキ」「仕込み」で検索できるようにする
const SYNONYMS = {
    '作り方': ['仕込み', '手順'],
    '仕込み': ['作り方', '手順'],
    '手順': ['仕込み', '作り方'],
    'かき': ['カキ', '牡蠣'],
    'カキ': ['かき', '牡蠣'],
    '牡蠣': ['かき', 'カキ'],
    'えび': ['エビ', '海老'],
    'エビ': ['えび', '海老'],
    '海老': ['エビ', 'えび'],
    '値段': ['価格', '料金'],
    '価格': ['値段', '料金'],
    '料金': ['価格', '値段'],
    'きのこ': ['マッシュルーム', 'きのこミックス'],
    'あさり': ['アサリ'],
    'アサリ': ['あさり'],
};

// キーワードを同義語で拡張する（「かき」→「かき」+「カキ」+「牡蠣」）
function expandKeywords(keywords) {
    const expanded = new Set(keywords);
    for (const kw of keywords) {
        (SYNONYMS[kw] || []).forEach(s => expanded.add(s));
    }
    return [...expanded];
}

// HTMLタグを除いてプレーンテキストにする
function stripHtml(html) {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// セクション内のHTMLを<h3>/<h4>単位に分割し、最も関連度の高い塊を返す
// 「カキ」で検索したとき prep-seafood 全体ではなく「カキ」の部分だけ返す
function extractChunk(htmlContent, keywords) {
    // <h3> または <h4> の前で分割
    const parts = htmlContent.split(/(?=<h[34])/i);

    let bestPart = null;
    let bestScore = 0;

    for (const part of parts) {
        const plain = stripHtml(part).toLowerCase();
        let score = 0;
        for (const kw of keywords) {
            // 特殊文字をエスケープしてから正規表現に使う
            const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            score += (plain.match(new RegExp(escaped, 'g')) || []).length;
        }
        if (score > bestScore) {
            bestScore = score;
            bestPart = part;
        }
    }

    return stripHtml(bestPart || htmlContent);
}

// 質問文でmanual.jsを検索し、スコアの高いセクションを返す
function searchManual(query) {
    const raw = query.toLowerCase().split(/[\s　]+/).filter(k => k.length >= 1);
    const keywords = expandKeywords(raw); // 同義語も含めて検索

    const results = [];

    for (const category of MANUAL_DATA.categories) {
        for (const section of category.sections) {
            const plainContent = stripHtml(section.content).toLowerCase();
            const titleLower = section.title.toLowerCase();

            let score = 0;
            for (const kw of keywords) {
                if (titleLower.includes(kw)) score += 5;
                const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                score += (plainContent.match(new RegExp(escaped, 'g')) || []).length;
            }

            if (score > 0) {
                results.push({ section, score });
            }
        }
    }

    results.sort((a, b) => b.score - a.score);
    return { results: results.slice(0, 1), keywords };
}

// 検索結果をチャット用の短いテキストに整形する
function buildReply({ results, keywords }) {
    if (results.length === 0) {
        return 'マニュアルに該当する情報が見つかりませんでした。\n店長に確認してください。';
    }

    const { section } = results[0];
    const chunk = extractChunk(section.content, keywords);
    return `【${section.title}】\n${chunk}`;
}

// ── DOM操作：メッセージを追加 ────────────────────────────
function appendMessage(text, role) {
    const messages = document.getElementById('chatMessages');

    const div = document.createElement('div');
    div.className = `chat-message ${role}`;

    // AIの返答はマークダウン的な改行を<br>に変換して表示
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = formatMessage(text);

    div.appendChild(bubble);
    messages.appendChild(div);

    // 常に最新メッセージまでスクロール
    messages.scrollTop = messages.scrollHeight;
}

// ── ローディング表示（「考え中...」のアニメーション） ───
function appendLoading() {
    const messages = document.getElementById('chatMessages');
    const id = `loading-${Date.now()}`;

    const div = document.createElement('div');
    div.className = 'chat-message bot';
    div.id = id;
    div.innerHTML = `
        <div class="chat-bubble chat-loading">
            <span></span><span></span><span></span>
        </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return id;
}

function removeLoading(id) {
    document.getElementById(id)?.remove();
}

// ── テキストのフォーマット ────────────────────────────────
// Geminiは**太字**や- 箇条書きを返すことがある
// シンプルな変換でHTMLとして表示する
function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **太字**
        .replace(/^- (.+)/gm, '• $1')                     // - 箇条書き
        .replace(/\n/g, '<br>');                           // 改行
}
