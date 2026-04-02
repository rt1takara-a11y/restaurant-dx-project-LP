# 業務マニュアルPWA — 新店舗セットアップ引き継ぎ書

このシステムは **テンプレート化されており**、特定のファイルを書き換えるだけで別の店舗のマニュアルとして再利用できます。

---

## プロジェクトの構成と役割

```
プロジェクトフォルダ/
│
├── data/
│   ├── config.js       ★ 店舗の基本設定（最初に書き換える）
│   └── manual.js       ★ マニュアルの内容（メインの作業）
│
├── js/
│   ├── app.js          　 起動処理（基本触らない）
│   ├── chat.js            チャットUI（基本触らない）
│   └── embeddings.js      AI検索エンジン（触らない）
│
├── css/
│   └── style.css          デザイン（カラー変更時のみ）
│
├── manifest.json       ★ PWAアプリ名の設定
├── index.html             メインHTML（基本触らない）
└── sw.js                  オフライン対応（触らない）
```

★ のファイルだけ書き換えれば新しい店舗のマニュアルになります。

---

## STEP 1: プロジェクトのコピー

### GitHubからテンプレートとして使う場合

1. GitHubでリポジトリを開く
2. 右上の「Use this template」→「Create a new repository」
3. 新しいリポジトリ名を付けて作成（例: `yakitori-manual`）
4. ローカルにclone

### フォルダをコピーして使う場合

```bash
# ターミナルで実行
cp -r restaurant-dx-project 新店舗名-manual
cd 新店舗名-manual
git init
git remote add origin [新しいGitHubリポジトリのURL]
```

---

## STEP 2: 店舗基本設定の変更（data/config.js）

```js
export const CONFIG = {
    storeName: "★ お店の名前",           // 例: "焼き鳥 田中屋"
    manualTitle: "★ マニュアルのタイトル",  // 例: "スタッフ業務マニュアル"
    description: "★ 説明文",              // 例: "ホール・キッチン共通マニュアル"
    icon: "★ 絵文字",                     // 例: "🍗"（アプリアイコンになる）
    themeColor: "★ テーマカラー（16進数）", // 例: "#FF6B35"
    chatApiUrl: "/api/chat",              // 変更不要
    chatBotName: "★ チャットボット名",      // 例: "業務アシスタント"
    welcomeMessage: "★ 最初のメッセージ",   // 例: "何でも聞いてください。"
};
```

---

## STEP 3: マニュアル内容の作成（data/manual.js）

### 構造の説明

```js
export const MANUAL_DATA = {
    categories: [          // カテゴリ一覧
        {
            id: "一意のID",         // 英数字・ハイフンのみ
            name: "カテゴリ名",     // サイドバーに表示される名前
            icon: "絵文字",
            color: "#カラーコード",
            sections: [             // このカテゴリ内のページ一覧
                {
                    id: "一意のID",
                    title: "ページタイトル",
                    content: `
                        <!-- ここにHTMLでマニュアル内容を書く -->
                    `
                }
            ]
        }
    ]
};
```

### 使えるHTMLパーツ

```html
<!-- 情報ボックス（青系） -->
<div class="info-box"><strong>タイトル</strong><p>内容</p></div>

<!-- 警告ボックス（赤系） -->
<div class="warning-box"><strong>⚠️ 注意</strong><p>内容</p></div>

<!-- ポイントボックス（緑系） -->
<div class="tip-box"><strong>ポイント</strong><p>内容</p></div>

<!-- 番号付きリスト -->
<ol><li>手順1</li><li>手順2</li></ol>

<!-- 箇条書き -->
<ul><li>項目</li></ul>

<!-- 表 -->
<table class="manual-table">
  <thead><tr><th>列1</th><th>列2</th></tr></thead>
  <tbody><tr><td>内容</td><td>内容</td></tr></tbody>
</table>
```

---

## STEP 4: PWAアプリ名の変更（manifest.json）

```json
{
    "name": "★ アプリのフルネーム",     // 例: "焼き鳥田中屋 業務マニュアル"
    "short_name": "★ 短い名前",         // 例: "田中屋"
    "description": "★ 説明",
    "theme_color": "★ config.jsと同じカラーコード",
    "icons": [
        {
            "src": "data:image/svg+xml,...<text>★絵文字</text>...</svg>",
            // ↑ config.jsのiconと同じ絵文字に変える
        }
    ]
}
```

---

## STEP 5: Vercelへのデプロイ

1. [vercel.com](https://vercel.com) にログイン
2. 「Add New Project」→ GitHubリポジトリを選択
3. 設定はそのままで「Deploy」
4. 完了するとURLが発行される（例: `https://yakitori-manual.vercel.app`）

> 環境変数（GEMINI_API_KEY）は現在未使用のため設定不要です。

---

## チャット検索の仕組み（参考）

このシステムのチャットは **外部APIを使わずブラウザ内で完結** します。

```
ユーザーの質問
    ↓
Transformers.js（ブラウザ内AIモデル）でベクトル化
    ↓
manual.jsの各セクションのベクトルと比較
    ↓
最も意味が近いセクションを返す
    ↓
店舗情報が外部に出ることはない
```

初回アクセス時にAIモデル（約60MB）をダウンロードします。2回目以降はキャッシュされます。

---

## よくある変更パターン

| やりたいこと | 変更ファイル |
|---|---|
| 店舗名・カラーを変えたい | `data/config.js` |
| マニュアルの内容を追加・変更 | `data/manual.js` |
| カテゴリを追加したい | `data/manual.js`（categoriesに追加） |
| アプリアイコン・名前を変えたい | `manifest.json` |
| チャットの検索精度を上げたい | `data/manual.js`の内容を充実させる |

---

## サービスキャッシュの更新

`data/manual.js`を更新しても画面が変わらない場合は、`sw.js`のキャッシュバージョンを上げてください。

```js
// sw.js の1行目
const CACHE_NAME = 'fc-manual-v2';
//                            ↑ この数字を増やす（v3, v4...）
```

---

## 開発者向けメモ

- フレームワーク不使用（Vanilla HTML/CSS/JS）
- ES Modules使用のため `file://` では動かない → Vercelか `npx serve .` で確認
- `api/chat.js` は現在未使用（Gemini API連携コードが残存）
