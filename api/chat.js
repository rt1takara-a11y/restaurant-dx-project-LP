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
=== 店舗業務マニュアル（麺屋 龍虎） ===

【基本オペレーション（3ステップ）】
STEP 1: スープの準備 → 仕込みスープを90〜95℃まで温める。温度計で必ず確認すること
STEP 2: 丼の準備（タレ・油を先入れ） → タレをおたま1杯（約30ml）丼に入れ、香味油5mlを加える。麺を茹でて湯切り後、丼に入れる
STEP 3: スープ注ぎ・盛り付け → 熱いスープをおたま3杯注ぎ、トッピングを決められた位置に並べて完成
麺の茹で時間: 細麺は1分30秒、太麺は2分30秒。必ず湯切りをしっかり行うこと

【各ラーメンの作り方】
豚骨醤油ラーメン:
1. 丼に醤油タレ30ml・白醤油香味油5mlを入れる
2. 細麺を1分30秒茹でてしっかり湯切り
3. 豚骨スープを3杯注ぐ
4. チャーシュー2枚・メンマ・ネギ・のり1枚・味玉1/2個を盛り付ける

濃厚豚骨ラーメン:
1. 丼に塩タレ20ml・豚骨香味油8mlを入れる
2. 細麺を1分30秒茹でてしっかり湯切り
3. 濃厚豚骨スープを3杯注ぐ
4. チャーシュー2枚・刻みネギ・のり2枚・黒マー油3滴をかける

辛味噌ラーメン:
1. 丼に味噌タレ40ml・辛味油10mlを入れる
2. 太麺を2分30秒茹でてしっかり湯切り
3. 豚骨スープを3杯注いでよくかき混ぜる
4. チャーシュー2枚・コーン・バター・ネギ・もやしを盛り付ける

つけ麺（醤油）:
1. つけ汁丼に醤油タレ50ml・鶏油5mlを入れる
2. 太麺を2分30秒茹でて冷水で締め、ザルに盛る
3. 濃厚つけ汁スープを2杯半注ぐ
4. つけ汁にチャーシュー・メンマ・味玉を入れ、麺の器にのりを添える

【宅配業務の流れ（Uber Eats等）】
1. 注文が入る
2. 商品を作成（スープは別容器に分けて梱包）
3. 専用容器にラーメンを盛り付ける
   - 麺とスープは必ず別容器に入れる（麺が伸びるため）
   - トッピングはトレーまたは小袋に分ける
   - レシートは袋の外側に貼る
4. 箸・れんげ・ウェットティッシュを人数分入れる
5. ドライバーが来たら注文番号を確認して渡す
注意: スープは熱いため、蓋をしっかり締めてから袋に入れること

【タブレット・プリンターのエラー対処】
1. タブレットの電源を落とす → 再起動
2. プリンターの電源を落とす → 再起動
3. タブレットの設定を開く
4. 「領収書の印刷」→「プリンターを管理」を押す
5. プリンター再接続
6. テスト印刷

【トッピング分量一覧】
チャーシュー（通常）: 2枚（1枚約30g）
チャーシュー増し: +2枚
味玉: 1/2個（縦半切り）
メンマ: 30g
ネギ（刻み）: 15g
ネギ増し: 30g
のり: 1枚（濃厚豚骨のみ2枚）
コーン: 20g（辛味噌のみ標準）
バター: 10g（辛味噌のみ標準）
もやし: 40g（辛味噌のみ標準）
黒マー油: 3滴（濃厚豚骨のみ標準）

【仕込み：チャーシュー】
1. 豚バラ肉を巻いてタコ糸で縛る（直径約7cm）
2. フライパンで表面全体に焼き色をつける
3. 醤油200ml・みりん100ml・砂糖30g・水300mlを合わせて煮立てる
4. チャーシューをタレに入れ弱火で60分煮込む（途中で裏返す）
5. そのままタレに漬けて冷ます（最低2時間）
6. 冷蔵後、1枚5mm厚にスライスして使用
保存: タレごと冷蔵で3日以内に使用。日付をラベルに記入すること

【仕込み：味玉（煮玉子）】
1. 卵を冷蔵庫から出し、常温に30分おく
2. 沸騰した湯に入れ7分茹でる
3. すぐに氷水に移し10分冷やす
4. 殻を丁寧にむく
5. 漬けダレ（醤油100ml・みりん50ml・水50ml）に入れ冷蔵で12〜24時間漬ける

【仕込み：豚骨スープ】
1. 豚骨を水から強火で沸騰させ、アク抜き10分
2. 一度湯を捨て、豚骨を水で洗う
3. 新しい水10Lで豚骨を入れ、強火で4時間炊く（白濁するまで）
4. 炊き上がったら目の細かいザルでこす
5. 使用する分だけ90〜95℃に温めてから提供
注意: スープは一度沸騰させると風味が飛ぶため、提供時は90〜95℃を保つこと

【仕込み：メンマ】
1. 乾燥メンマを水で1時間戻す
2. 戻したメンマを食べやすい大きさに切る（5cm程度）
3. ごま油小さじ1でメンマを炒める
4. 醤油大さじ2・砂糖小さじ1・鶏ガラスープ100mlを加え、汁気がなくなるまで炒め煮
5. 冷まして冷蔵保存（5日以内）

【メニュー・価格】
豚骨醤油ラーメン: ¥900
濃厚豚骨ラーメン: ¥950
辛味噌ラーメン: ¥980
つけ麺（醤油）: ¥1,000
特製ラーメン【全部のせ】: ¥1,380
替え玉: ¥150

【トッピング追加料金】
チャーシュー増し（2枚）: +¥200
味玉: +¥100
のり: +¥50
メンマ増し: +¥100
ネギ増し: +¥100
コーン: +¥100
バター: +¥100
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
    const systemPrompt = `あなたは麺屋 龍虎のスタッフ向けアシスタントです。
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
