// テスト用 FitNotes データ
// これを fitnotes_embed.js に代わりに使用してテストする

var FITNOTES_DATA = {
  "workouts": [
    {
      "date": "2024-03-20",
      "exercise": "ベンチプレス",
      "sets": [
        {"w": "100", "r": "10", "dist": "", "distUnit": "", "time": "", "comment": "調子良好"},
        {"w": "100", "r": "8", "dist": "", "distUnit": "", "time": "", "comment": ""}
      ],
      "memo": "胸のトレーニング"
    },
    {
      "date": "2024-03-20",
      "exercise": "スクワット",
      "sets": [
        {"w": "150", "r": "12", "dist": "", "distUnit": "", "time": "", "comment": ""},
        {"w": "150", "r": "10", "dist": "", "distUnit": "", "time": "", "comment": ""},
        {"w": "150", "r": "8", "dist": "", "distUnit": "", "time": "", "comment": ""}
      ],
      "memo": "脚のトレーニング"
    },
    {
      "date": "2024-03-21",
      "exercise": "トレッドミル",
      "sets": [
        {"w": "", "r": "", "dist": "5", "distUnit": "km", "time": "30:00", "comment": "有酸素"}
      ],
      "memo": "カーディオ"
    }
  ],
  "exCategories": {
    "ベンチプレス": "Chest",
    "スクワット": "Legs",
    "トレッドミル": "Cardio"
  },
  "dailyNotes": {
    "2024-03-20": "今日は調子良好",
    "2024-03-21": "疲れが取れた"
  },
  "favorites": {
    "ベンチプレス": true
  }
};
