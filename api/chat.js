// api/chat.js
// Vercel Serverless Function — Gemini API呼び出し
//
// ── Serverless Functionとは ──────────────────────────────
// 通常のJSファイルと違い、Vercelのサーバー上で動く関数。
// ブラウザからは見えないため、APIキーを安全に使える。
// /api/chat というURLにPOSTリクエストが来たら、
// この関数が自動的に呼び出される仕組み。
//
// ── CommonJS形式で書く理由 ────────────────────────────────
// Vercelのサーバーレス関数はデフォルトでCommonJS（require/module.exports）。
// フロントエンドのimport/exportとは別の仕組みだが動作は同じ。

// マニュアルの内容をテキストとしてAIに渡す（システムプロンプト用）
// HTMLタグなしの純粋なテキストにすることでAIが読みやすくなる
const MANUAL_TEXT = `
=== FC業務マニュアル（Sundubu Tanakaya FC） ===

【基本オペレーション（3ステップ）】
STEP 1: 冷凍BOX受け取り・保管 → 届いた冷凍BOXをすぐに冷凍庫へ、在庫数を記録する
STEP 2: 解凍→鍋へ（3袋投入） → 1鍋につき冷凍スープ袋を3袋使用、冷凍のまま投入してOK
STEP 3: 10分で提供完了 → 沸騰後10分で提供可能な状態になる、トッピングを加えて仕上げる
提供温度: 80〜90℃（レンジで温めすぎると容器が変形するため注意）

【宅配業務の流れ（Uber Eats等）】
1. 注文が入る
2. 商品を作成
3. 紙袋にレシートを貼る
   - 無理に詰め込まず、何枚かに分けてOK
   - ジュースなどは温かい商品とは別の紙袋に入れる
   - レシートは全ての紙袋に貼る（足りなければ印刷）
4. カトラリー人数分（必要であれば）、店舗の注意書きカードを1枚入れる
5. ドライバーが来たら、番号を確認して渡す
注意: 商品のとり違いに注意

【タブレット・プリンターのエラー対処】
1. タブレットの電源を落とす → 再起動
2. プリンターの電源を落とす → 再起動
3. タブレットの設定を開く
4. 「領収書の印刷」→「プリンターを管理」を押す
5. プリンター再接続
6. テスト印刷

【スンドゥブ調理手順】
1. コンロに網を置き、小さいトゥッペギ（鍋）を並べる
2. アサリ2つ、豆腐1/2パックを4等分にして入れる（アサリ→豆腐の順）
3. スープをよくかき混ぜてから入れる。スープ缶を底からよくかき混ぜて、具材をバランスよくおたますり切り一杯入れる
4. 火をつけ煮込む
5. 沸騰後10分で提供可能
6. 容器に移し蓋をしめる
前日ストック: 容器内のスープだけ捨てて（具はそのまま）新しくスープを入れ直す
こだわり: 具沢山である「具沢山スンドゥブ」が最大の武器。具材が偏らないようしっかり底からすくう

【盛り付けの順番】
1. 各トッピング（豆腐増しの場合は豆腐が最初、海鮮・豚キムチ・豚バラ・きのこ・かき・エビ・キムチの順）
2. レンジ
3. 卵（ボールに割ってからスプーンで中央に入れる）
4. 長ネギ（チーズ、ネギマシは注文があれば）
5. 胡麻油（中辛オイルひと回しは注文があれば）

【トッピング分量】
豚キムチ: 60g
キムチマシ: 40g
きのこ: 40g
チーズ: 30g
ねぎまし: 60-70g（ボールに出し、ねぎ油・丼たれを入れ混ぜる）
エビドゥブ: 8本
豚バラ肉: ラップに包まれたもの一つ

【海鮮・かき分量】
海鮮ドゥブ: イカ2、ホタテ2、ボール2、エビ1
海鮮トッピング: イカ2、ホタテ2、エビ1
かきドゥブ: かき3、イカ2、ホタテ2
ダブルかきドゥブ: かき6、イカ4、ホタテ4

【仕込み：海鮮・かき】
海鮮mix: 凍ったパックのままレンジで袋がぱんぱんになるまで火入れ（途中2〜3回揉んだりひっくり返す）、イカの火通りを確認、タッパーに移して汁は捨てる
エビ: タッパーに移し、解凍中に出る水は捨てる
アサリ: 出しっぱなしにしないこと、凍ったまま使用可
カキ: 30分酒につける→酒を捨てる→大きいタッパーに重ならないように入れ酒少々→ラップして1分40秒レンチン（途中で様子を見る）→触って火が通っていたら完成

【仕込み：きのこ】
きのこミックス（冷凍）: 冷凍のまま耐熱容器に入れ、レンジで1分40秒加熱
マッシュルーム（生）: 2パック分、石づきを取り1/4または1/2にカット、タッパーに入れラップをして加熱
仕上げ: 加熱したきのこをボウルに入れ、丼たれ（黒）を2まわしして和える

【メニュー・価格】
スンドゥブ（基本）: ¥1,460
豚キムチドゥブ【No.1】: ¥1,660
海鮮ドゥブ: ¥1,780
海老ドゥブ / 牡蠣ドゥブ: ¥2,200
ダブル牡蠣ドゥブ【限定】: ¥2,980

【トッピング追加料金】
チーズ: +¥200
キムチマシ: +¥200
豆腐マシ: +¥200
豚バラ肉（人気）: +¥300
海鮮（海老・イカ・ホタテ）: +¥300
ねぎマシ: +¥300
`;

// Vercelのサーバーレス関数はこの形式でエクスポートする
module.exports = async function handler(req, res) {

    // CORSヘッダー：ブラウザからのリクエストを許可する設定
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONSリクエスト（ブラウザの事前確認）には空レスポンスを返す
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // リクエストボディから message と会話履歴(history)を取得
    const { message, history = [] } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'message is required' });
    }

    // 環境変数からAPIキーを取得（コードに直接書かないことが重要）
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    // ── システムプロンプトの設計 ────────────────────────────
    // AIの「役割」と「制約」を定義する最重要部分。
    // マニュアルの全内容を渡すことで、AIがマニュアルを参照して回答できる。
    const systemPrompt = `あなたはSundubu Tanakaya FCの加盟店スタッフ向けアシスタントです。
以下の業務マニュアルの内容だけをもとに、スタッフの質問に日本語で答えてください。

ルール:
- マニュアルに記載のある内容だけ答える
- マニュアルに載っていない質問には「マニュアルに記載がないため、店長に確認してください」と答える
- 返答は簡潔に、箇条書きや番号リストを使ってわかりやすく
- 新人スタッフにもわかるような言葉遣いで

${MANUAL_TEXT}`;

    // ── Gemini APIのリクエスト形式 ───────────────────────────
    // contents: 会話の履歴 + 今回のメッセージを配列で渡す
    // role: "user"（スタッフ）または "model"（AI）
    const contents = [
        // 過去の会話履歴（最大10件）
        ...history.slice(-10).map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
        })),
        // 今回のメッセージ
        {
            role: 'user',
            parts: [{ text: message }]
        }
    ];

    try {
        // Gemini REST APIを直接fetchで呼び出す
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    contents,
                    generationConfig: {
                        temperature: 0.3,    // 低いほど一貫した回答になる
                        maxOutputTokens: 1024,
                    }
                })
            }
        );

        if (!response.ok) {
            const err = await response.json();
            console.error('Gemini API error:', err);
            return res.status(response.status).json({ error: 'Gemini API error' });
        }

        const data = await response.json();

        // Geminiのレスポンスから回答テキストを取り出す
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: 'Empty response from Gemini' });
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
