// data/manual.js
// マニュアルの全コンテンツを管理するファイル

// export をつけることで、他のJSファイルから import して使えるようになる
export const MANUAL_DATA = {
  categories: [

    // ===== 基本オペレーション =====
    {
      id: "fc-info", name: "基本オペレーション", icon: "🏪", color: "#6C63FF", sections: [
        {
          id: "fc-operation", title: "基本オペレーション", content: `
<h3> FCオペレーション（3ステップ）</h3>
<div class="info-box"><strong> シンプルな3ステップで提供できます</strong></div>
<ol>
<li><strong>STEP 1：冷凍BOX 受け取り・保管</strong>
  <ul>
    <li>届いた冷凍BOXをすぐに冷凍庫へ</li>
    <li>在庫数を記録する</li>
  </ul>
</li>
<li><strong>STEP 2：解凍 → 鍋へ（3袋投入）</strong>
  <ul>
    <li>1鍋につき3袋を使用</li>
    <li>冷凍のまま鍋に投入してOK</li>
  </ul>
</li>
<li><strong>STEP 3：10分で提供完了</strong>
  <ul>
    <li>沸騰後10分で提供可能な状態になる</li>
    <li>トッピングを加えて仕上げる</li>
  </ul>
</li>
</ol>
<div class="warning-box"><strong>⚠️ 温度管理</strong>
<p>提供温度は<strong>80〜90℃</strong>。レンジで温めすぎると容器が変形するため注意。</p></div>
`
        }
      ]
    },

    // ===== 宅配・提供操作 =====
    {
      id: "uber", name: "宅配・提供操作", icon: "🛵", color: "#06D6A0", sections: [
        {
          id: "uber-basics", title: "基本業務・流れ", content: `
<h3>📱 宅配サービス（Uber Eats等）</h3>
<div class="info-box"><strong>重要</strong>
<p>デリバリーの注文受け〜お渡しのフローです。</p></div>
<h4>注文〜受け渡しの流れ</h4>
<ol>
<li>注文が入る</li>
<li>商品を作成</li>
<li>紙袋にレシートを貼る
  <ul>
    <li>紙袋は無理に詰め込まず、何枚かに分けてOK</li>
    <li>ジュースなどは、暖かい商品とは別の紙袋に入れる</li>
    <li>レシートは全ての紙袋に貼る（足りなければ印刷）</li>
  </ul>
</li>
<li>カトラリー人数分（必要であれば）、店舗の注意書きカードを入れる（一枚）</li>
<li>ドライバーが来たら、番号を確認して渡す</li>
</ol>
<div class="warning-box"><strong>⚠️ 注意</strong><p>商品のとり違いには注意してください。</p></div>
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
          id: "uber-sundubu", title: "スンドゥブ", content: `
<h3>スンドゥブ（FCプロセス）</h3>
<p>スープは本部から届く冷凍BOXを使用します。1鍋あたり<strong>3袋</strong>を使用。</p>
<div class="info-box"><strong>前日ストックの扱い</strong>
<p>前日から残っているストックは、容器内の<strong>スープだけ捨てる</strong>（具はそのまま）。新しくスープを入れ直してください。</p></div>
<h4>調理手順</h4>
<ol>
<li>コンロに網を置き、小さいトゥッペギ（鍋）を並べる</li>
<li>アサリ2つ、豆腐1/2パックを4等分にして入れる（アサリ→豆腐の順）</li>
<li>スープをよくかき混ぜてから入れる。<strong>スープ缶を底からよくかき混ぜて、具材をバランスよくおたますり切り一杯</strong>入れます。</li>
<li>火をつけ煮込む</li>
<li>沸騰後10分で提供可能</li>
<li>容器に移し蓋をしめる</li>
</ol>
<div class="tip-box"><strong>こだわり：具沢山である理由</strong>
<p>「具沢山スンドゥブ」は最大の武器です。具材が偏らないよう、しっかり底からすくってください。</p></div>
<h4>盛り付けの順番</h4>
<ol>
<li>各トッピング
  <ul>
    <li>豆腐増しの場合は豆腐が1番最初（3きれ）</li>
    <li>海鮮、豚キムチ、豚バラ、きのこ、かき、エビ、キムチ</li>
  </ul>
</li>
<li>レンジ</li>
<li>卵 — ボールに割ってからスプーンでとり中央に入れる</li>
<li>長ネギ（チーズ、ネギマシは注文があれば）</li>
<li>胡麻油（中辛オイルひと回し ＝ 辛さカスタマイズ中辛の注文があれば）</li>
</ol>
`
        },
        {
          id: "uber-toppings", title: "トッピング分量", content: `
<h3>トッピング分量一覧</h3>
<table class="manual-table">
<thead><tr><th>トッピング</th><th>分量</th><th>備考</th></tr></thead>
<tbody>
<tr><td>豚キムチ</td><td>60g</td><td></td></tr>
<tr><td>キムチマシ</td><td>40g</td><td></td></tr>
<tr><td>きのこ</td><td>40g</td><td></td></tr>
<tr><td>チーズ</td><td>30g</td><td></td></tr>
<tr><td>ねぎまし</td><td>60-70g</td><td>ボールに出し、ねぎ油・丼たれを入れ混ぜる</td></tr>
<tr><td>エビドゥブ</td><td>8本</td><td></td></tr>
<tr><td>豚バラ肉</td><td>ラップに包まれたもの一つ</td><td></td></tr>
<!-- <tr><td>パクチー</td><td>10〜15g</td><td>ライス用の器に入れ別途で袋に</td></tr> -->
<!--<tr><td>激辛</td><td>—</td><td>別途のカップを袋に入れる</td></tr>-->
<!--<tr><td>ネギドゥブ</td><td>ネギ60-70g</td><td>
  <ol>
    <li>小さいボールにネギ・丼タレ少し・白油少しを入れ絡める</li>
    <li>スンドゥブに温玉・ごま油をのせ、その上にトッピング。最後にフライドオニオンを散らす</li>
  </ol>
</td></tr>-->
</tbody></table>
<h4>海鮮・かき</h4>
<table class="manual-table">
<thead><tr><th>メニュー</th><th>内容</th></tr></thead>
<tbody>
<tr><td>海鮮ドゥブ</td><td>イカ2、ホタテ2、ボール2、エビ1</td></tr>
<tr><td>海鮮トッピング</td><td>イカ2、ホタテ2、エビ1</td></tr>
<tr><td>かきドゥブ</td><td>かき3、イカ2、ホタテ2</td></tr>
<tr><td>ダブルかきドゥブ</td><td>かき6、イカ4、ホタテ4</td></tr>
</tbody></table>
<!-- <h4>もつ</h4>
<ul>
<li>レンジで15秒くらい温める</li>
<li>温め終わったスンドゥブにのせる</li>
<li>ねぎ、フライドオニオン、温たま、ごま油を載せる</li>
</ul> -->
`
        }
      ]
    },

    // ===== 仕込み手順（トッピング・タレ類） =====
    {
      id: "prep", name: "仕込み手順", icon: "🔪", color: "#1B2A4A", sections: [
        //                 {
        //                     id: "prep-sauces", title: "オイル・タレ", content: `
        // <h3>🍶 白油（パイユ）</h3>
        // <p>ディスペンサーに以下の割合で作ってください：</p>
        // <ul>
        // <li><strong>鶏油（チーユ）</strong>：半分</li>
        // <li><strong>ねぎ油</strong>：半分</li>
        // </ul>
        // `
        //                 },
        //                 {
        //                     id: "prep-onsen", title: "温玉の作り方", content: `
        // <h3>🥚 温玉</h3>
        // <ol>
        // <li>温度を<strong>65℃</strong>に設定</li>
        // <li>水位を写真くらいに設定する</li>
        // <li>ネットにワンパレット（<strong>54個</strong>）入れる</li>
        // <li>タイマー<strong>30分</strong>にセットする</li>
        // <li>鍋に卵を投入したら設定温度を<strong>63℃</strong>に変更する</li>
        // <li>30分経ったら1〜2個割って確認する（白身が白くて黄身が生に近かったらOK）</li>
        // <li>水と氷を入れて冷やす</li>
        // <li>乾かすか紙で拭いてタッパーへ</li>
        // </ol>
        // `
        //                 },
        //                 {
        //                     id: "prep-negi", title: "ねぎの仕込み", content: `
        // <h3>🧅 ねぎ</h3>
        // <ol>
        // <li>ネギ切り機（ネギ平Jr）の蓋のネジを締める</li>
        // <li>根を切ったネギを垂直の板に沿うように機械に入れる</li>
        // <li>スライスされたネギは、1番大きなザルとボールで水にさらす（さらすさいはほぐすように優しく揉んで）</li>
        // <li>全体的にほぐれたら、流水に<strong>10分</strong>ほどさらす</li>
        // <li>10分経ったら、ざるは斜めに置いて出来るだけ水を切る</li>
        // <li>水を切ったら、いっぺんにやらずに少しづつ箸で取ってタッパーに詰める</li>
        // </ol>
        // `
        //                 },
        {
          id: "prep-seafood", title: "海鮮・かきの仕込み", content: `
<h3>海鮮mix</h3>
<ol>
  <li>凍ったパックのまま電子レンジに入れる。</li>
  <li>途中2.3回揉んだりひっくり返したりして、<strong>袋がぱんぱんになるまで</strong>火入れしてください。</li>
  <li>イカを良く確認して、しっかり火が通っていたら完成。</li>
  <li>タッパーに移し、<strong>中の汁は捨ててください</strong>。</li>
</ol>
<h3>エビ</h3>
<p>タッパーに移し、中の汁（解凍中に出る水）は捨ててください。</p>
<h3>アサリ</h3>
<p>出しっぱなしにしないこと（貝類なので温度管理に注意）。凍ったまま使ってもOKです。</p>
<h3>カキ</h3>
<ol>
<li>牡蠣を<strong>30分</strong>酒につける</li>
<li>酒捨てる</li>
<li>1番大きいタッパーに重ならないように入れて酒少しふりかける</li>
<li>ラップして<strong>1分40秒</strong>レンチン（途中で様子見ながらゆすったりして面倒みてください）</li>
<li>触ってみて火が通っていたら完成</li>
</ol>
<h3>きのこの仕込み</h3>
<p>※マッシュルーム（生）ときのこミックス（冷凍）を使用します。</p>
<ol>
  <li><strong>きのこミックス</strong>：冷凍のまま耐熱容器に入れ、レンジで<strong>1分40秒</strong>加熱します。</li>
  <li><strong>マッシュルーム</strong>：
    <ul>
      <li>2パック分を使用。</li>
      <li>石づきを取り、サイズに合わせて<strong>1/4または1/2</strong>にカットします。</li>
      <li>タッパーに入れ、ラップをして加熱します。</li>
    </ul>
  </li>
  <li><strong>仕上げ</strong>：加熱したきのこをすべてボウルに入れ、<strong>丼たれ（黒）を2まわし</strong>て和えれば完成です。</li>
</ol>
<div class="tip-box"><strong>ポイント</strong>
<p>加熱時間は目安です。マッシュルームにしっかり火が通り、全体がしんなりしていればOKです。</p></div>
`
        },
        //                 {
        //                     id: "prep-motsu", title: "もつ・バターの仕込み", content: `
        // <h3>もつ</h3>
        // <ol>
        // <li>冷凍のままか半解凍でもつを切る</li>
        // <li><strong>1kg</strong>で袋分けする</li>
        // <li>タレを<strong>140g</strong>入れる</li>
        // <li>小分けにする（1個<strong>65g〜70g</strong>）</li>
        // </ol>
        // <div class="warning-box"><strong>⚠️</strong><p>小分け後は蓋に「もつ 日付」を記入して冷凍。</p></div>
        // <h3>🧈 バター</h3>
        // <p>トッピングバターは冷凍庫にストックします。</p>
        // `
        //                 },
        //                 {
        //                     id: "prep-mushroom", title: "きのこの仕込み", content: `
        // <h3>🍄 きのこの仕込み</h3>
        // <p>※マッシュルーム（生）ときのこミックス（冷凍）を使用します。</p>
        // <ol>
        //   <li><strong>きのこミックス</strong>：冷凍のまま耐熱容器に入れ、レンジで<strong>1分40秒</strong>加熱します。</li>
        //   <li><strong>マッシュルーム</strong>：
        //     <ul>
        //       <li>2パック分を使用。</li>
        //       <li>石づきを取り、サイズに合わせて<strong>1/4または1/2</strong>にカットします。</li>
        //       <li>タッパーに入れ、ラップをして加熱します。</li>
        //     </ul>
        //   </li>
        //   <li><strong>仕上げ</strong>：加熱したきのこをすべてボウルに入れ、<strong>丼たれ（黒）を2まわし</strong>て和えれば完成です。</li>
        // </ol>
        // `
        //                 },
        //                 {
        //                     id: "prep-tare", title: "各種タレ・辛味仕込み", content: `
        // <h3>🌶️ 辛味</h3>
        // <ul><li>赤唐辛子 7g / 青唐辛子 65g / ナンプラー 160g</li></ul>
        // <p>上記を<strong>さっとわかす</strong>。</p>
        // <h3>🥢 豚キムチ丼たれ / 丼ベースたれ</h3>
        // <ul>
        // <li>金蘭醤油 1094g</li>
        // <li>老抽王 163g</li>
        // <li>オイスターソース 327g</li>
        // <li>上白糖 54.6g</li>
        // <li>ごま油 120g</li>
        // </ul>
        // <p>ごま油以外を沸かしアクを取り、冷めたらごま油を入れる。</p>
        // `
        //                 },
        //                 {
        //                     id: "prep-spice", title: "激辛パウダー・辛味オイル", content: `
        // <h3>🌋 激辛パウダー</h3>
        // <p>ハバネロ 50g / ハラペーニョ 30g</p>
        // <h3>🫙 辛味オイル</h3>
        // <ul>
        // <li>サラダ油 865g / 一味 90g / 青ネギ 2束 / 生姜 2〜3枚 / 激辛パウダー 4g</li>
        // </ul>
        // <h4>手順</h4>
        // <ol>
        //   <li><strong>弱火</strong>でフライパンにかける</li>
        //   <li>ネギが<strong>しなしなになったら</strong>火を止める</li>
        //   <li>激辛パウダーで<strong>味を調整する</strong></li>
        //   <li>ざるとリード（ペーパー）で<strong>こす</strong></li>
        // </ol>
        // `
        //                 }
      ]
    },

    // ===== メニュー・価格 =====
    {
      id: "menu", name: "メニュー・価格", icon: "💰", color: "#FF6B35", sections: [
        {
          id: "menu-price", title: "販売価格表", content: `
<h3>🍲 メニュー販売価格帯</h3>
<table class="manual-table">
<thead><tr><th>メニュー</th><th>価格</th></tr></thead>
<tbody>
<tr><td>スンドゥブ（基本）</td><td>¥1,460</td></tr>
<tr><td>豚キムチドゥブ【No.1】</td><td>¥1,660</td></tr>
<tr><td>海鮮ドゥブ</td><td>¥1,780</td></tr>
<tr><td>海老ドゥブ / 牡蠣ドゥブ</td><td>¥2,200</td></tr>
<tr><td>ダブル牡蠣ドゥブ【限定】</td><td>¥2,980</td></tr>
</tbody></table>
`
        },
        {
          id: "menu-toppings-price", title: "トッピング追加料金", content: `
<h3> トッピング加算（+¥200〜/食）</h3>
<table class="manual-table">
<thead><tr><th>トッピング</th><th>追加料金</th></tr></thead>
<tbody>
<tr><td>チーズ</td><td>+¥200</td></tr>
<tr><td>キムチマシ</td><td>+¥200</td></tr>
<tr><td>豆腐マシ</td><td>+¥200</td></tr>
<tr><td>豚バラ肉（人気）</td><td>+¥300</td></tr>
<tr><td>海鮮（海老・イカ・ホタテ）</td><td>+¥300</td></tr>
<tr><td>ねぎマシ</td><td>+¥300</td></tr>
</tbody></table>
`
        },
        //                 {
        //                     id: "menu-profit", title: "利益モデル（参考）", content: `
        // <h3>📊 利益モデル（店内・基本想定）</h3>
        // <table class="manual-table">
        // <thead><tr><th>項目</th><th>金額</th><th>備考</th></tr></thead>
        // <tbody>
        // <tr><td>販売単価（平均）</td><td>¥1,660</td><td></td></tr>
        // <tr><td>スープ原価</td><td>− ¥100</td><td>材料費のみ</td></tr>
        // <tr><td>その他原価（人件費等）</td><td>− ¥1,150</td><td>目安</td></tr>
        // <tr><td><strong>1杯あたり利益</strong></td><td><strong>¥410</strong></td><td></td></tr>
        // <tr><td>1日提供食数（目安）</td><td>30食</td><td></td></tr>
        // <tr><td>月間稼働日数</td><td>30日</td><td></td></tr>
        // <tr><td><strong>月間利益（概算）</strong></td><td><strong>¥369,000</strong></td><td></td></tr>
        // </tbody></table>
        // <div class="info-box"><strong>ℹ️</strong><p>30食/日 × 30日 × ¥410 の概算値。実績により変動します。</p></div>
        // `
        //                 }
      ]
    }

  ],

  // checklists: {
  //     open: {
  //         title: "開店チェックリスト",
  //         icon: "🌅",
  //         items: [
  //             "全プラットフォームのタブレット電源ON",
  //             "Uber Eats をオープンに切り替え",
  //             "品切れメニューの確認・停止設定",
  //             "梱包資材（袋・レシート・カトラリー）の在庫確認",
  //             "タブレット・プリンターの動作確認",
  //             "スンドゥブストックの確認（最低6個）",
  //             "冷凍BOXの在庫確認",
  //         ]
  //     },
  //     close: {
  //         title: "閉店チェックリスト",
  //         icon: "🌙",
  //         items: [
  //             "全プラットフォームをクローズに切り替え",
  //             "当日の売上・注文数を確認",
  //             "低評価・クレームがあれば店長に報告",
  //             "翌日分の仕込み確認",
  //             "冷凍BOXの残数確認・発注判断",
  //             "タブレットを充電状態にしてから終了",
  //         ]
  //     }
  // }
};
