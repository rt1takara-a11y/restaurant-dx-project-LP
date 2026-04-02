// data/manual.js
// マニュアルの全コンテンツを管理するファイル

// export をつけることで、他のJSファイルから import して使えるようになる
export const MANUAL_DATA = {
  categories: [

    // ===== 基本オペレーション =====
    {
      id: "basic-ops", name: "基本オペレーション", icon: "🏪", color: "#6C63FF", sections: [
        {
          id: "basic-flow", title: "提供の基本フロー", content: `
<h3>ラーメン提供の基本（3ステップ）</h3>
<div class="info-box"><strong>シンプルな3ステップで提供できます</strong></div>
<ol>
<li><strong>STEP 1：スープの準備</strong>
  <ul>
    <li>仕込みスープを<strong>90〜95℃</strong>まで温める</li>
    <li>温度計で必ず確認すること</li>
  </ul>
</li>
<li><strong>STEP 2：丼の準備（タレ・油を先入れ）</strong>
  <ul>
    <li>タレをおたま<strong>1杯（約30ml）</strong>丼に入れる</li>
    <li>香味油を<strong>5ml</strong>加える</li>
    <li>麺を茹でて湯切り後、丼に入れる</li>
  </ul>
</li>
<li><strong>STEP 3：スープ注ぎ・盛り付け</strong>
  <ul>
    <li>熱いスープをおたま<strong>3杯</strong>注ぐ</li>
    <li>トッピングを決められた位置に並べて完成</li>
  </ul>
</li>
</ol>
<div class="warning-box"><strong>⚠️ 麺の茹で時間</strong>
<p>細麺は<strong>1分30秒</strong>、太麺は<strong>2分30秒</strong>が目安。必ず湯切りをしっかり行うこと。</p></div>
`
        }
      ]
    },

    // ===== 宅配・提供操作 =====
    {
      id: "delivery", name: "宅配・提供操作", icon: "🛵", color: "#06D6A0", sections: [
        {
          id: "delivery-basics", title: "基本業務・流れ", content: `
<h3>📱 宅配サービス（Uber Eats等）</h3>
<div class="info-box"><strong>重要</strong>
<p>デリバリーの注文受け〜お渡しのフローです。</p></div>
<h4>注文〜受け渡しの流れ</h4>
<ol>
<li>注文が入る</li>
<li>商品を作成（スープは別容器に分けて梱包）</li>
<li>専用容器にラーメンを盛り付ける
  <ul>
    <li>麺とスープは<strong>必ず別容器</strong>に入れる（麺が伸びるため）</li>
    <li>トッピングはトレーまたは小袋に分ける</li>
    <li>レシートは袋の外側に貼る</li>
  </ul>
</li>
<li>箸・れんげ・ウェットティッシュを人数分入れる</li>
<li>ドライバーが来たら注文番号を確認して渡す</li>
</ol>
<div class="warning-box"><strong>⚠️ 注意</strong><p>スープは熱いため、蓋をしっかり締めてから袋に入れること。</p></div>
<h3>タブレットやプリンターのエラー対処</h3>
<ol>
<li>タブレットの電源を落とす → 再起動</li>
<li>プリンターの電源を落とす → 再起動</li>
<li>タブレットの設定を開く</li>
<li>「領収書の印刷」→「プリンターを管理」を押す</li>
<li>プリンター再接続</li>
<li>テスト印刷</li>
</ol>
`
        },
        {
          id: "delivery-ramen", title: "各ラーメンの作り方", content: `
<h3>豚骨醤油ラーメン</h3>
<ol>
<li>丼に醤油タレ<strong>30ml</strong>・白醤油香味油<strong>5ml</strong>を入れる</li>
<li>細麺を<strong>1分30秒</strong>茹でてしっかり湯切り</li>
<li>豚骨スープを<strong>3杯</strong>注ぐ</li>
<li>チャーシュー2枚・メンマ・ネギ・のり1枚・味玉1/2個を盛り付ける</li>
</ol>
<h3>濃厚豚骨ラーメン</h3>
<ol>
<li>丼に塩タレ<strong>20ml</strong>・豚骨香味油<strong>8ml</strong>を入れる</li>
<li>細麺を<strong>1分30秒</strong>茹でてしっかり湯切り</li>
<li>濃厚豚骨スープを<strong>3杯</strong>注ぐ</li>
<li>チャーシュー2枚・刻みネギ・のり2枚・黒マー油<strong>3滴</strong>をかける</li>
</ol>
<h3>辛味噌ラーメン</h3>
<ol>
<li>丼に味噌タレ<strong>40ml</strong>・辛味油<strong>10ml</strong>を入れる</li>
<li>太麺を<strong>2分30秒</strong>茹でてしっかり湯切り</li>
<li>豚骨スープを<strong>3杯</strong>注いでよくかき混ぜる</li>
<li>チャーシュー2枚・コーン・バター・ネギ・もやしを盛り付ける</li>
</ol>
<h3>つけ麺（醤油）</h3>
<ol>
<li>つけ汁丼に醤油タレ<strong>50ml</strong>・鶏油<strong>5ml</strong>を入れる</li>
<li>太麺を<strong>2分30秒</strong>茹でて冷水で締め、ザルに盛る</li>
<li>濃厚つけ汁スープを<strong>2杯半</strong>注ぐ</li>
<li>つけ汁にチャーシュー・メンマ・味玉を入れ、麺の器にのりを添える</li>
</ol>
`
        },
        {
          id: "delivery-toppings", title: "トッピング分量", content: `
<h3>トッピング分量一覧</h3>
<table class="manual-table">
<thead><tr><th>トッピング</th><th>分量</th><th>備考</th></tr></thead>
<tbody>
<tr><td>チャーシュー（通常）</td><td>2枚</td><td>1枚約30g</td></tr>
<tr><td>チャーシュー増し</td><td>+2枚</td><td></td></tr>
<tr><td>味玉</td><td>1/2個</td><td>縦半切り</td></tr>
<tr><td>メンマ</td><td>30g</td><td></td></tr>
<tr><td>ネギ（刻み）</td><td>15g</td><td></td></tr>
<tr><td>ネギ増し</td><td>30g</td><td></td></tr>
<tr><td>のり</td><td>1枚</td><td>濃厚豚骨のみ2枚</td></tr>
<tr><td>コーン</td><td>20g</td><td>辛味噌のみ標準</td></tr>
<tr><td>バター</td><td>10g（1片）</td><td>辛味噌のみ標準</td></tr>
<tr><td>もやし</td><td>40g</td><td>辛味噌のみ標準</td></tr>
<tr><td>黒マー油</td><td>3滴</td><td>濃厚豚骨のみ標準</td></tr>
</tbody></table>
`
        }
      ]
    },

    // ===== 仕込み手順 =====
    {
      id: "prep", name: "仕込み手順", icon: "🔪", color: "#1B2A4A", sections: [
        {
          id: "prep-chashu", title: "チャーシューの仕込み", content: `
<h3>チャーシュー（豚バラ巻き）</h3>
<ol>
  <li>豚バラ肉を巻いてタコ糸で縛る（直径約7cm）</li>
  <li>フライパンで表面全体に焼き色をつける</li>
  <li>醤油<strong>200ml</strong>・みりん<strong>100ml</strong>・砂糖<strong>30g</strong>・水<strong>300ml</strong>を合わせて煮立てる</li>
  <li>チャーシューをタレに入れ<strong>弱火で60分</strong>煮込む（途中で裏返す）</li>
  <li>そのままタレに漬けて冷ます（最低<strong>2時間</strong>）</li>
  <li>冷蔵後、1枚<strong>5mm厚</strong>にスライスして使用</li>
</ol>
<div class="warning-box"><strong>⚠️ 保存期間</strong>
<p>チャーシューはタレごと冷蔵で<strong>3日以内</strong>に使用。日付をラベルに記入すること。</p></div>
`
        },
        {
          id: "prep-ajitama", title: "味玉の仕込み", content: `
<h3>味玉（煮玉子）</h3>
<ol>
  <li>卵を冷蔵庫から出し、<strong>常温に30分</strong>おく</li>
  <li>沸騰した湯に入れ<strong>7分</strong>茹でる</li>
  <li>すぐに氷水に移し<strong>10分</strong>冷やす</li>
  <li>殻を丁寧にむく（ひびを入れてから水の中でむくとやりやすい）</li>
  <li>漬けダレ（醤油<strong>100ml</strong>・みりん<strong>50ml</strong>・水<strong>50ml</strong>）に入れ冷蔵で<strong>12〜24時間</strong>漬ける</li>
</ol>
<div class="tip-box"><strong>ポイント</strong>
<p>黄身がトロトロになるのが目標。7分で茹でると半熟状態になります。漬け時間が長すぎると塩辛くなるため注意。</p></div>
`
        },
        {
          id: "prep-soup", title: "スープの仕込み", content: `
<h3>豚骨スープ（仕込み）</h3>
<ol>
  <li>豚骨を<strong>水から</strong>強火で沸騰させ、<strong>アク抜き10分</strong></li>
  <li>一度湯を捨て、豚骨を水で洗う</li>
  <li>新しい水<strong>10L</strong>で豚骨を入れ、<strong>強火で4時間</strong>炊く（白濁するまで）</li>
  <li>炊き上がったら目の細かいザルでこす</li>
  <li>使用する分だけ<strong>90〜95℃</strong>に温めてから提供</li>
</ol>
<div class="warning-box"><strong>⚠️ 温度管理</strong>
<p>スープは<strong>一度沸騰させると風味が飛ぶ</strong>ため、提供時は90〜95℃を保つこと。温度計で定期確認すること。</p></div>
<h3>濃厚豚骨スープ</h3>
<p>通常の豚骨スープを<strong>さらに2時間</strong>強火で炊き詰めたもの。白く濃厚になったら完成。</p>
`
        },
        {
          id: "prep-menma", title: "メンマの仕込み", content: `
<h3>メンマ</h3>
<ol>
  <li>乾燥メンマを<strong>水で1時間</strong>戻す</li>
  <li>戻したメンマを食べやすい大きさに切る（5cm程度）</li>
  <li>ごま油<strong>小さじ1</strong>でメンマを炒める</li>
  <li>醤油<strong>大さじ2</strong>・砂糖<strong>小さじ1</strong>・鶏ガラスープ<strong>100ml</strong>を加え、汁気がなくなるまで炒め煮</li>
  <li>冷まして冷蔵保存</li>
</ol>
<div class="tip-box"><strong>保存</strong><p>冷蔵で<strong>5日以内</strong>に使用。タッパーに日付を記入すること。</p></div>
`
        }
      ]
    },

    // ===== メニュー・価格 =====
    {
      id: "menu", name: "メニュー・価格", icon: "💰", color: "#FF6B35", sections: [
        {
          id: "menu-price", title: "販売価格表", content: `
<h3>🍜 メニュー販売価格</h3>
<table class="manual-table">
<thead><tr><th>メニュー</th><th>価格</th></tr></thead>
<tbody>
<tr><td>豚骨醤油ラーメン</td><td>¥900</td></tr>
<tr><td>濃厚豚骨ラーメン</td><td>¥950</td></tr>
<tr><td>辛味噌ラーメン</td><td>¥980</td></tr>
<tr><td>つけ麺（醤油）</td><td>¥1,000</td></tr>
<tr><td>特製ラーメン【全部のせ】</td><td>¥1,380</td></tr>
<tr><td>替え玉</td><td>¥150</td></tr>
</tbody></table>
`
        },
        {
          id: "menu-toppings-price", title: "トッピング追加料金", content: `
<h3>トッピング加算料金</h3>
<table class="manual-table">
<thead><tr><th>トッピング</th><th>追加料金</th></tr></thead>
<tbody>
<tr><td>チャーシュー増し（2枚）</td><td>+¥200</td></tr>
<tr><td>味玉</td><td>+¥100</td></tr>
<tr><td>のり</td><td>+¥50</td></tr>
<tr><td>メンマ増し</td><td>+¥100</td></tr>
<tr><td>ネギ増し</td><td>+¥100</td></tr>
<tr><td>コーン</td><td>+¥100</td></tr>
<tr><td>バター</td><td>+¥100</td></tr>
</tbody></table>
`
        }
      ]
    }

  ]
};
