// data/config.js
// アプリ全体で使う店舗情報の一元管理ファイル
// この1ファイルを書き換えるだけで、別の店舗に転用できる設計

export const CONFIG = {
    storeName: "麺屋 龍虎",               // ← 店舗名をここに入れる
    manualTitle: "店舗業務マニュアル",
    description: "ラーメン・つけ麺専門店 業務マニュアル",
    icon: "🍜",
    themeColor: "#C0392B",                // メインカラー（深紅）
    chatApiUrl: "/api/chat",
    chatBotName: "龍虎AIアシスタント",
    welcomeMessage: "業務でわからないことがあればここで確認できます。",
};
