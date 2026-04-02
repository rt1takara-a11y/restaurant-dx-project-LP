// js/embeddings.js
// Transformers.js を使ったブラウザ内ベクトル検索
//
// ── ベクトル検索とは ─────────────────────────────────────
// 「言葉の意味」を数値の配列（ベクトル）に変換して比較する技術。
// 「かきの作り方」と「カキの仕込み手順」は文字は違うが
// 意味が近いので、ベクトルも近くなる → 検索でヒットする。
//
// ── このファイルの役割 ───────────────────────────────────
// 1. CDNから多言語AIモデルを読み込む（初回のみ約60MB）
// 2. manual.jsの各セクションをh3単位に分割してベクトル化
// 3. ユーザーの質問をベクトル化して最も近いものを返す
//
// ── 外部APIへのデータ送信ゼロ ────────────────────────────
// モデルはブラウザ内で動く。質問も答えも外には出ない。

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
import { MANUAL_DATA } from '../data/manual.js';

// ローカルモデルは使わずCDNから取得する
env.allowLocalModels = false;

// モデルと事前計算済みベクトルを保持する変数
let extractor = null;
let chunkEmbeddings = [];
let modelReady = false;

// ── 初期化（アプリ起動時にバックグラウンドで呼ぶ） ────────
// onProgress: ダウンロード進捗のコールバック
// onReady:    準備完了のコールバック
export async function initEmbeddings({ onProgress, onReady } = {}) {
    try {
        // multilingual-e5-small: 日本語を含む多言語対応モデル（約60MB）
        // 初回はCDNからダウンロード、2回目以降はブラウザキャッシュを使用
        extractor = await pipeline(
            'feature-extraction',
            'Xenova/multilingual-e5-small',
            { progress_callback: onProgress }
        );

        // manual.jsの全セクションをチャンク化してベクトル計算
        chunkEmbeddings = await buildChunkEmbeddings();

        modelReady = true;
        onReady?.();

    } catch (err) {
        // モデル読み込み失敗してもキーワード検索で動作を継続する
        console.warn('[embeddings] モデル読み込み失敗。キーワード検索で動作します:', err);
    }
}

// モデルが使える状態かどうか
export function isReady() {
    return modelReady;
}

// ── ベクトル検索：クエリに最も意味が近いチャンクを返す ────
// 戻り値: { heading, text, score } または null（モデル未準備時）
export async function semanticSearch(query) {
    if (!modelReady || chunkEmbeddings.length === 0) return null;

    // multilingual-e5はクエリに "query: " プレフィックスが必要
    const queryVec = await embed(`query: ${query}`);

    let best = null;
    let bestScore = -1;

    for (const chunk of chunkEmbeddings) {
        // 正規化済みベクトル同士のドット積 = コサイン類似度
        const score = dotProduct(queryVec, chunk.vector);
        if (score > bestScore) {
            bestScore = score;
            best = { heading: chunk.heading, text: chunk.text, score };
        }
    }

    return best;
}

// ── manual.jsを見出し（h3/h4）単位に分割してベクトル化 ────
// セクション全体より細かい粒度で検索できるようにする
// 例）prep-seafood → 「海鮮mix」「エビ」「アサリ」「カキ」「きのこ」に分割
async function buildChunkEmbeddings() {
    const chunks = [];

    for (const category of MANUAL_DATA.categories) {
        for (const section of category.sections) {

            // h3またはh4タグの前で分割
            const parts = section.content.split(/(?=<h[34])/i);

            for (const part of parts) {
                const text = stripHtml(part).trim();
                if (text.length < 10) continue;

                // 見出しテキストを抽出（なければセクションタイトルを使う）
                const headingMatch = part.match(/<h[34][^>]*>(.*?)<\/h[34]>/i);
                const heading = headingMatch ? stripHtml(headingMatch[1]) : section.title;

                // passage プレフィックス付きでベクトル化（E5モデルの仕様）
                const passageText = `passage: ${section.title} ${heading} ${text}`;
                const vector = await embed(passageText);

                chunks.push({ heading, text, vector });
            }
        }
    }

    return chunks;
}

// ── テキストをベクトルに変換（内部用） ────────────────────
async function embed(text) {
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
}

// ── コサイン類似度（正規化済みならドット積で代用可） ──────
function dotProduct(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
    return sum;
}

// ── HTMLタグ除去（ユーティリティ） ────────────────────────
function stripHtml(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
