# Google Sheets 統合セットアップガイド

## 概要
workout-app を Google Sheets でリアルタイムシングルソースオブトゥルースとして運用します。

## セットアップ手順

### 1. Google Cloud プロジェクト作成

> 既存の Sumifriend Google Cloud プロジェクトを使う場合はスキップしてください

```bash
# Google Cloud Console で新規プロジェクト作成
# https://console.cloud.google.com/
```

### 2. Google Sheets API 有効化

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. **APIs & Services** → **Library** で検索
3. "Google Sheets API" をクリック → **ENABLE** をクリック
4. "Google Drive API" も同様に有効化

### 3. OAuth 2.0 認証情報設定

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **OAuth 2.0 Client ID**
3. **Application type**: Web application
4. **Authorized redirect URIs**:
   ```
   http://localhost:8000
   https://yourdomain.com  (本番環境)
   ```
5. クライアント ID をコピー → `index.html` の `GOOGLE_CLIENT_ID` に設定

### 4. Google Sheets 作成

1. [Google Sheets](https://sheets.google.com) で新規シート作成
2. **Workouts** シート作成（デフォルト）
3. ヘッダー行を追加：
   ```
   id | date | exercise | setIndex | weight | reps | memo | createdAt | updatedAt
   ```
4. **BodyLogs** シート作成：
   ```
   id | date | weight | createdAt | updatedAt
   ```
5. **Users** シート作成：
   ```
   userId | nick | goal | createdAt | updatedAt
   ```

### 5. Spreadsheet ID 取得

シートの URL から取得：
```
https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
```

`index.html` に設定：
```javascript
const SHEETS_SPREADSHEET_ID = 'your-spreadsheet-id-here';
```

### 6. Google Drive API スコープ確認

`index.html` の以下の定数を確認：
```javascript
const SHEETS_API_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
```

## 使用方法

### FitNotes データインポート

1. アプリを開く
2. **取込** タブ → JSON ファイル選択
3. 自動で Sheets にも一括インポート（ログイン済みの場合）

### リアルタイム同期

> TODO: 以下の機能は次フェーズで実装予定

- 新規ワークアウト追加時 → 自動 Sheets append
- ワークアウト編集時 → 自動 Sheets update
- 手動同期ボタン追加

## API 関数リファレンス

```javascript
// Sheets からデータ読み込み
await getSheetData('Workouts', 'A1:I100')
// returns: [[header], [row1], [row2], ...]

// 複数シート一括読み込み
await getMultipleSheetsData(['Workouts', 'BodyLogs', 'Users'])
// returns: { Workouts: [...], BodyLogs: [...], Users: [...] }

// 行追加
await appendSheetData('Workouts', [id, date, exercise, ...])
// returns: boolean

// 行更新
await updateSheetRow('Workouts', 2, [id, date, exercise, ...])
// returns: boolean

// メタデータ取得
await getSheetsMetadata()
// returns: spreadsheet metadata object
```

## トラブルシューティング

### 認証エラー
- ブラウザの開発者ツール（F12）で Console を確認
- `Sheets API loaded` ログが出ていることを確認
- SHEETS_SPREADSHEET_ID が正しく設定されているか確認

### 403 Permission Denied
- Sheets が公開されていないか確認
- Google Drive の権限設定を確認
- ログイン状態を確認（ページをリロード）

### バッチ読み込み失敗
- Sheet 名が正確か確認（大文字小文字区別あり）
- インターネット接続を確認

## 複数ユーザー対応（将来）

複数ユーザー対応時は以下の変更を予定：

1. **Users** シートに userId を追加
2. Workouts / BodyLogs に userId カラムを追加
3. クエリで userId でフィルタリング

```javascript
// 複数ユーザー対応のフィルタ関数（将来）
async function getUserWorkouts(userId) {
  var allWorkouts = await getSheetData('Workouts', 'A:I');
  return allWorkouts.filter(row => row[1] === userId);
}
```

## セキュリティ

- **本番環境では HTTPS 使用が必須**
- Google Drive スコープは読み書き必要な分だけ
- OAuth 認証画面は Google のセキュアなサーバーで実行される

## 参考資料

- [Google Sheets API v4](https://developers.google.com/sheets/api)
- [OAuth 2.0 フロー](https://developers.google.com/identity/protocols/oauth2)
- [gapi.client リファレンス](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
