// data/config.js
// アプリ全体で使う店舗情報の一元管理ファイル
// この1ファイルを書き換えるだけで、別の店舗に転用できる設計

export const CONFIG = {
    storeName: "配達フランチャイズ店",   // ← 店舗名をここに入れる
    manualTitle: "デリバリー業務マニュアル",
    description: "Uber Eats / 出前館 / RocketNow 対応マニュアル",
    icon: "🛵",
    themeColor: "#06C755",              // メインカラー（LINE緑）
    chatApiUrl: "/api/chat",
    chatBotName: "マニュアルAI",
    welcomeMessage: "デリバリー業務でわからないことがあればここで確認できます。",
};
